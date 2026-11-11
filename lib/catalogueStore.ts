import { yogiYatraApi, yogifyWorkshopApi } from "./apiClients";

type ApiRecord = Record<string, unknown>;
type ApiList<T> = T[] | { data?: T[] };

export interface FeaturedProduct {
  id: string;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  href: string;
}

export interface FeaturedCourse {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  instructor: { name: string; avatar: string; role: string };
  type: string;
  time: string;
  level: string;
  price?: string;
  badge?: string;
  href: string;
}

const storeUrl = (process.env.YOGIYATRA_STORE_URL || "https://www.yogiandyathra.com").replace(/\/+$/, "");
const workshopUrl = (process.env.YOGIFY_WORKSHOP_URL || "https://yogify.com").replace(/\/+$/, "");
const productMediaUrl = (
  process.env.YOGIYATRA_IMAGE_BASE_URL ||
  process.env.YOGIYATRA_MEDIA_URL ||
  "https://api.yogiandyathra.com/public/storage"
).replace(/\/+$/, "");
const workshopMediaUrl = (
  process.env.YOGIFY_WORKSHOP_IMAGE_BASE_URL ||
  process.env.YOGIFY_WORKSHOP_MEDIA_URL ||
  "https://admin.varixialabs.com/workshopapi/public"
).replace(/\/+$/, "");

function text(value: unknown, fallback = ""): string {
  return value == null || value === "" ? fallback : String(value);
}

function records<T extends ApiRecord>(payload: ApiList<T> | ApiRecord): T[] {
  if (Array.isArray(payload)) return payload;
  const data = (payload as ApiRecord).data;
  return Array.isArray(data) ? data as T[] : [];
}

function money(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;
  const amount = Number(value);
  return Number.isFinite(amount)
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)
    : text(value);
}

function objectValue(value: unknown): ApiRecord | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as ApiRecord
    : undefined;
}

function firstMediaPath(value: unknown): unknown {
  if (!Array.isArray(value)) return undefined;
  return objectValue(value[0])?.file_path;
}

function productSlug(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function absoluteMedia(value: unknown, base: string): string {
  const path = text(value);
  if (!path) return "/images/products/rudraksha-bracelet.jpg";
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalizedPath = path.replace(/^\/+/, "");
  const normalizedBase = base.replace(/\/+$/, "");
  const relativePath = normalizedBase.endsWith("/storage")
    ? normalizedPath.replace(/^storage\//, "")
    : normalizedPath;
  return `${normalizedBase}/${relativePath}`;
}

function featuredProduct(product: ApiRecord): FeaturedProduct {
  const id = text(product.id ?? product.product_id, "product");
  const name = text(product.product_name ?? product.name ?? product.title, "Sacred product");
  const price = product.discount_price ?? product.sale_price ?? product.combo_price ?? product.price;
  const original = product.original_price ?? product.mrp ?? product.regular_price ?? product.price;
  const firstComboProduct = Array.isArray(product.products) ? objectValue(product.products[0]) : undefined;
  const imagePath = product.image ?? product.image_url ?? product.product_image ?? product.thumbnail ??
    firstMediaPath(product.media) ?? product.image_path ?? product.varient_image_path ??
    firstMediaPath(firstComboProduct?.media);
  const productUrl = text(product.slug, productSlug(name));
  const rating = Number(product.rating ?? product.average_rating ?? 0);
  const category = objectValue(product.category);
  const comboCategory = objectValue(firstComboProduct?.category);
  const categoryName = text(
    product.category_name ?? category?.category_name ?? category?.name ??
      comboCategory?.category_name ?? comboCategory?.name,
  );
  const currentPrice = Number(price);
  const originalPrice = Number(original);
  return {
    id,
    title: name,
    category: categoryName,
    price: money(price) ?? "Price unavailable",
    originalPrice: Number.isFinite(originalPrice) && originalPrice > currentPrice ? money(original) : undefined,
    discountBadge: Number.isFinite(originalPrice) && originalPrice > currentPrice && originalPrice > 0
      ? `${Math.round((1 - currentPrice / originalPrice) * 100)}% OFF`
      : undefined,
    rating: Math.max(0, Math.min(5, Number.isFinite(rating) ? Math.round(rating) : 0)),
    reviewsCount: Number(product.reviews_count ?? product.total_reviews ?? 0) || 0,
    image: absoluteMedia(imagePath, productMediaUrl),
    badge: "Bestseller",
    href: product.is_combo
      ? `${storeUrl}/combo/${encodeURIComponent(productUrl)}/${encodeURIComponent(id)}`
      : `${storeUrl}/products/${encodeURIComponent(productUrl)}/${encodeURIComponent(id)}`,
  };
}

function featuredCourse(course: ApiRecord): FeaturedCourse {
  const instructor = (course.instructor && typeof course.instructor === "object" ? course.instructor : {}) as ApiRecord;
  const id = text(course.id, "course");
  const slug = text(course.slug ?? id);
  const duration = course.duration;
  return {
    id,
    title: text(course.title ?? course.name, "Yoga course"),
    image: absoluteMedia(course.thumbnail ?? course.image, workshopMediaUrl),
    imageAlt: text(course.title ?? course.name, "Yoga course"),
    instructor: {
      name: text(instructor.name, "Yogify Instructor"),
      avatar: absoluteMedia(instructor.avatar_url ?? instructor.avatar, workshopMediaUrl),
      role: text(instructor.role, "Instructor"),
    },
    type: text(course.category_name ?? course.category, "Yoga"),
    time: typeof duration === "number" ? `${duration} ${duration <= 90 ? "Mins" : "Hours"}` : text(duration, "Self-paced"),
    level: text(course.level, "All Levels"),
    price: money(course.discount_price ?? course.price),
    badge: course.featured ? "Featured" : undefined,
    href: `${workshopUrl}/courses/${encodeURIComponent(slug)}`,
  };
}

/** Server-side catalogue store. Results are cached by Next.js ISR at the page boundary. */
export const catalogueStore = {
  async featuredProducts(): Promise<FeaturedProduct[]> {
    const { data } = await yogiYatraApi.get<ApiList<ApiRecord> | ApiRecord>("/products-list", {
      // ProductController ranks its default catalogue by historical units sold.
      // is_combo=1 includes both regular products and combo products in that ranking.
      params: { per_page: 4, page: 1, is_combo: 1 },
    });
    return records(data).slice(0, 4).map(featuredProduct);
  },

  async featuredCourses(): Promise<FeaturedCourse[]> {
    const { data } = await yogifyWorkshopApi.get<ApiList<ApiRecord> | ApiRecord>("/home/courses", {
      params: { per_page: 4, page: 1, sort: "created_at", order_by: "desc" },
    });
    return records(data).slice(0, 4).map(featuredCourse);
  },
};

