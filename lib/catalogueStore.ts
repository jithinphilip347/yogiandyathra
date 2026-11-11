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
const productMediaUrl = (process.env.YOGIYATRA_MEDIA_URL || "https://api.yogiandyathra.com/public/storage").replace(/\/+$/, "");
const workshopMediaUrl = (process.env.YOGIFY_WORKSHOP_MEDIA_URL || "https://admin.varixialabs.com/workshopapi/public").replace(/\/+$/, "");

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
  const price = product.discount_price ?? product.sale_price ?? product.price;
  const original = product.original_price ?? product.mrp ?? product.regular_price;
  const imagePath = product.image ?? product.image_url ?? product.product_image ?? product.thumbnail;
  const productUrl = text(product.slug ?? id);
  const rating = Number(product.rating ?? product.average_rating ?? 0);
  return {
    id,
    title: name,
    category: text(product.category_name ?? product.category, "Sacred Collection"),
    price: money(price) ?? "Price unavailable",
    originalPrice: original && Number(original) > Number(price) ? money(original) : undefined,
    discountBadge: original && Number(original) > Number(price) && Number(original) > 0
      ? `${Math.round((1 - Number(price) / Number(original)) * 100)}% OFF`
      : undefined,
    rating: Math.max(0, Math.min(5, Number.isFinite(rating) ? Math.round(rating) : 0)),
    reviewsCount: Number(product.reviews_count ?? product.total_reviews ?? 0) || 0,
    image: absoluteMedia(imagePath, productMediaUrl),
    badge: product.badge ? text(product.badge) : undefined,
    href: `${storeUrl}/products/${encodeURIComponent(productUrl)}`,
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
    const { data } = await yogiYatraApi.get<ApiList<ApiRecord> | ApiRecord>("/products", {
      params: { per_page: 4, page: 1 },
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

