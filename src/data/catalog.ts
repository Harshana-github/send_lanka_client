import type { Localized } from "@/i18n/config";
import { LKR_PER_USD } from "@/lib/currency";

export const categoryIds = [
  "giftBoxes",
  "baby",
  "beauty",
  "women",
  "student",
  "men",
  "cakes",
  "flowers",
  "chocolates",
  "teddy",
  "essentials",
] as const;

export type CategoryId = (typeof categoryIds)[number];

/** The main categories: shown on the home page, each with its own product section. */
export const featuredCategoryIds = [
  "giftBoxes",
  "baby",
  "beauty",
  "women",
  "student",
  "men",
] as const satisfies readonly CategoryId[];

export function isFeaturedCategory(id: CategoryId): boolean {
  return (featuredCategoryIds as readonly CategoryId[]).includes(id);
}

export const occasionIds = [
  "birthday",
  "anniversary",
  "love",
  "mothersDay",
  "congratulations",
  "getWell",
  "thankYou",
] as const;

export type OccasionId = (typeof occasionIds)[number];

export type Badge = "bestseller" | "new" | "premium";

export type Product = {
  slug: string;
  image: string;
  category: CategoryId;
  occasions: OccasionId[];
  /** Base price in US dollars. Rupee prices are derived in `lib/currency`. */
  priceUsd: number;
  compareAtUsd?: number;
  rating: number;
  reviewCount: number;
  sameDay: boolean;
  /** Something done for the customer, like a recharge. It has no stock. */
  isService?: boolean;
  badge?: Badge;
  name: Localized;
  description: Localized;
  includes: Localized<string[]>;
};

export const categoryImages: Record<CategoryId, string> = {
  giftBoxes: "/images/products/mystery-box-v2.jpg",
  baby: "/images/products/baby-gift-box-v2.jpg",
  beauty: "/images/products/makeup-kit-v2.jpg",
  women: "/images/products/silk-saree-v2.jpg",
  student: "/images/products/study-pack-v2.jpg",
  men: "/images/products/mens-watch-v2.jpg",
  cakes: "/images/products/chocolate-fudge-cake.jpg",
  flowers: "/images/products/red-rose-bouquet.jpg",
  chocolates: "/images/products/luxury-chocolate-box.jpg",
  teddy: "/images/products/cuddly-teddy-bear.jpg",
  essentials: "/images/products/family-grocery-pack.jpg",
};

export const occasionImages: Record<OccasionId, string> = {
  birthday: "/images/occasions/birthday.jpg",
  anniversary: "/images/occasions/anniversary.jpg",
  love: "/images/occasions/love.jpg",
  mothersDay: "/images/occasions/mothers-day.jpg",
  congratulations: "/images/occasions/congratulations.jpg",
  getWell: "/images/occasions/get-well.jpg",
  thankYou: "/images/occasions/thank-you.jpg",
};

/** For items the client prices in rupees: stores the USD equivalent so LKR shows the exact price. */
const fromLkr = (lkr: number) => lkr / LKR_PER_USD;

export const products: Product[] = [
  {
    slug: "chocolate-fudge-cake",
    image: "/images/products/chocolate-fudge-cake.jpg",
    category: "cakes",
    occasions: ["birthday", "congratulations"],
    priceUsd: 35,
    rating: 4.9,
    reviewCount: 412,
    sameDay: true,
    badge: "bestseller",
    name: {
      en: "Chocolate Fudge Birthday Cake",
      si: "චොකලට් ෆජ් උපන්දින කේක්",
    },
    description: {
      en: "Rich, moist chocolate sponge layered with fudge ganache and finished with a glossy chocolate drip. Baked fresh on the day of delivery.",
      si: "ෆජ් ගනාෂ් තට්ටු සහිත, තෙත් සහ පොහොසත් චොකලට් ස්පොන්ජ් කේක් එකක්, දිලිසෙන චොකලට් ඩ්‍රිප් එකකින් අවසන් කර ඇත. බෙදාහරින දිනයේම නැවුම්ව පුළුස්සනවා.",
    },
    includes: {
      en: ["1 kg chocolate fudge cake", "Personalised name on the cake", "Candles & greeting card"],
      si: ["චොකලට් ෆජ් කේක් කිලෝ 1", "කේක් එකේ නම ලියා දීම", "ඉටිපන්දම් සහ සුබපැතුම් කාඩ්පත"],
    },
  },
  {
    slug: "red-rose-bouquet",
    image: "/images/products/red-rose-bouquet.jpg",
    category: "flowers",
    occasions: ["love", "anniversary"],
    priceUsd: 45,
    compareAtUsd: 55,
    rating: 4.9,
    reviewCount: 356,
    sameDay: true,
    badge: "bestseller",
    name: {
      en: "24 Red Roses Bouquet",
      si: "රතු රෝස 24ක මල් කළඹ",
    },
    description: {
      en: "Two dozen velvety red roses, hand-tied with seasonal greens and wrapped in premium paper — the timeless way to say “I love you”.",
      si: "සෘතුමය කොළ සමඟ අතින් බැඳ, උසස් කඩදාසියෙන් ඔතා ඇති වෙල්වට් වැනි රතු රෝස 24ක් — “මම ඔයාට ආදරෙයි” කියන්න හැමදාම ලස්සනම ක්‍රමය.",
    },
    includes: {
      en: ["24 fresh red roses", "Premium wrapping & ribbon", "Handwritten message card"],
      si: ["නැවුම් රතු රෝස 24ක්", "උසස් ඔතන කඩදාසි සහ රිබන්", "අතින් ලියූ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "midnight-surprise",
    image: "/images/products/midnight-surprise.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "love", "anniversary"],
    priceUsd: 80,
    compareAtUsd: 95,
    rating: 5,
    reviewCount: 198,
    sameDay: false,
    badge: "bestseller",
    name: {
      en: "Midnight Surprise Package",
      si: "මධ්‍යම රාත්‍රී පුදුම පැකේජය",
    },
    description: {
      en: "Be the first to wish them. We arrive at the stroke of midnight with a cake, balloons and flowers — and send you the video of their reaction.",
      si: "මුලින්ම සුබ පතන්නේ ඔබ වෙන්න. හරියටම මධ්‍යම රාත්‍රියේ කේක්, බැලූන් සහ මල් රැගෙන අපි එනවා — ඔවුන්ගේ ප්‍රතිචාරයේ වීඩියෝවක් ඔබට එවනවා.",
    },
    includes: {
      en: ["1 kg celebration cake", "6 helium balloons & 6 roses", "Delivered 11:30 PM – 12:30 AM"],
      si: ["සැමරුම් කේක් කිලෝ 1", "හීලියම් බැලූන් 6ක් සහ රෝස 6ක්", "ප.ව. 11:30 – පෙ.ව. 12:30 අතර භාර දීම"],
    },
  },
  {
    slug: "cuddly-teddy-bear",
    image: "/images/products/cuddly-teddy-bear.jpg",
    category: "teddy",
    occasions: ["love", "birthday"],
    priceUsd: 30,
    rating: 4.8,
    reviewCount: 221,
    sameDay: true,
    badge: "bestseller",
    name: {
      en: "Cuddly Honey Teddy Bear",
      si: "මෘදු හනී ටෙඩි බෙයාර්",
    },
    description: {
      en: "An extra-soft, huggable 45 cm teddy in honey beige — the perfect companion for someone you miss.",
      si: "ඔබට මතක් වෙන කෙනෙකුට හොඳම සගයා — ඉතා මෘදු, බදාගන්න පුළුවන් සෙ.මී. 45ක මී පැණි පැහැති ටෙඩි බෙයාර් කෙනෙක්.",
    },
    includes: {
      en: ["45 cm premium plush teddy", "Satin bow & gift bag", "Message card"],
      si: ["සෙ.මී. 45 උසස් ටෙඩි බෙයාර්", "සැටින් රිබන් සහ තෑගි බෑගය", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "family-grocery-pack",
    image: "/images/products/family-grocery-pack.jpg",
    category: "essentials",
    occasions: ["mothersDay", "thankYou"],
    priceUsd: 60,
    rating: 4.9,
    reviewCount: 534,
    sameDay: true,
    badge: "bestseller",
    name: {
      en: "Family Grocery Pack",
      si: "පවුලේ ග්‍රොසරි පැකේජය",
    },
    description: {
      en: "A month’s essentials for the family — rice, dhal, sugar, tea, milk powder, oil and more, delivered straight to their kitchen.",
      si: "පවුලට මාසයකට අවශ්‍ය දෑ — සහල්, පරිප්පු, සීනි, තේ, කිරිපිටි, තෙල් සහ තවත් බොහෝ දේ, කුස්සියටම ගෙනැවිත් දෙනවා.",
    },
    includes: {
      en: ["10 kg rice, 2 kg dhal, 2 kg sugar", "Milk powder, tea & cooking oil", "Spices, biscuits & soap"],
      si: ["සහල් කි.ග්‍රෑ. 10, පරිප්පු 2, සීනි 2", "කිරිපිටි, තේ සහ පිසීමේ තෙල්", "කුළුබඩු, බිස්කට් සහ සබන්"],
    },
  },
  {
    slug: "luxury-chocolate-box",
    image: "/images/products/luxury-chocolate-box.jpg",
    category: "chocolates",
    occasions: ["love", "thankYou", "birthday"],
    priceUsd: 30,
    rating: 4.8,
    reviewCount: 187,
    sameDay: true,
    name: {
      en: "Luxury Chocolate Box",
      si: "සුඛෝපභෝගී චොකලට් පෙට්ටිය",
    },
    description: {
      en: "Sixteen hand-finished chocolates — pralines, caramels and truffles — presented in an elegant keepsake box.",
      si: "අලංකාර පෙට්ටියක අසුරා ඇති, අතින් නිම කළ චොකලට් 16ක් — ප්‍රැලීන්, කැරමල් සහ ට්‍රෆල්.",
    },
    includes: {
      en: ["16 assorted chocolates", "Keepsake gift box", "Message card"],
      si: ["මිශ්‍ර චොකලට් 16ක්", "සිහිවටන තෑගි පෙට්ටිය", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "garden-bliss-bouquet",
    image: "/images/products/garden-bliss-bouquet.jpg",
    category: "flowers",
    occasions: ["anniversary", "mothersDay", "thankYou"],
    priceUsd: 55,
    rating: 4.9,
    reviewCount: 143,
    sameDay: true,
    badge: "premium",
    name: {
      en: "Garden Bliss Bouquet",
      si: "ගාර්ඩන් බ්ලිස් මල් කළඹ",
    },
    description: {
      en: "A florist’s mix of garden roses, spray roses, thistles and eucalyptus in soft peach and cream tones.",
      si: "මෘදු පීච් සහ ක්‍රීම් පැහැයෙන් යුත් ගාර්ඩන් රෝස, ස්ප්‍රේ රෝස, තිස්ල් සහ යුකැලිප්ටස් මිශ්‍ර කළ මල් කළඹක්.",
    },
    includes: {
      en: ["20+ premium seasonal stems", "Florist wrapping", "Flower food & care card"],
      si: ["උසස් සෘතුමය මල් 20+", "මල් ශිල්පියාගේ ඔතා දීම", "මල් පෝෂක සහ රැකවරණ කාඩ්පත"],
    },
  },
  {
    slug: "rainbow-celebration-cake",
    image: "/images/products/rainbow-celebration-cake.jpg",
    category: "cakes",
    occasions: ["birthday"],
    priceUsd: 38,
    rating: 4.8,
    reviewCount: 96,
    sameDay: true,
    name: {
      en: "Rainbow Celebration Cake",
      si: "රේන්බෝ සැමරුම් කේක්",
    },
    description: {
      en: "Six colourful vanilla layers with whipped buttercream and a shower of sprinkles — pure joy in every slice.",
      si: "විප්ඩ් බටර්ක්‍රීම් සහ වර්ණවත් ස්ප්‍රින්කල්ස් සහිත, වැනිලා තට්ටු හයක කේක් එකක් — හැම පෙත්තකම සතුට.",
    },
    includes: {
      en: ["1 kg six-layer rainbow cake", "Name on the cake", "Candles & card"],
      si: ["තට්ටු හයේ රේන්බෝ කේක් කිලෝ 1", "කේක් එකේ නම", "ඉටිපන්දම් සහ කාඩ්පත"],
    },
  },
  {
    slug: "white-chocolate-drip-cake",
    image: "/images/products/white-chocolate-drip-cake.jpg",
    category: "cakes",
    occasions: ["birthday", "anniversary", "congratulations"],
    priceUsd: 42,
    rating: 4.7,
    reviewCount: 64,
    sameDay: true,
    badge: "new",
    name: {
      en: "Vanilla Bean Drip Cake",
      si: "වැනිලා බීන් ඩ්‍රිප් කේක්",
    },
    description: {
      en: "Light vanilla bean sponge with silky Swiss meringue buttercream, crowned with a dark chocolate drip and shavings.",
      si: "සිනිඳු ස්විස් මෙරින්ග් බටර්ක්‍රීම් සහිත සැහැල්ලු වැනිලා ස්පොන්ජ්, ඩාක් චොකලට් ඩ්‍රිප් සහ චොකලට් කෑලිවලින් සරසා ඇත.",
    },
    includes: {
      en: ["1.2 kg drip cake", "Gold topper of your choice", "Candles & card"],
      si: ["ඩ්‍රිප් කේක් කි.ග්‍රෑ. 1.2", "ඔබ කැමති රන්වන් ටොපර් එකක්", "ඉටිපන්දම් සහ කාඩ්පත"],
    },
  },
  {
    slug: "signature-gift-box",
    image: "/images/products/signature-gift-box.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "love", "thankYou"],
    priceUsd: 50,
    rating: 4.8,
    reviewCount: 88,
    sameDay: true,
    name: {
      en: "SENDLANKA Signature Gift Box",
      si: "SENDLANKA විශේෂ තෑගි පෙට්ටිය",
    },
    description: {
      en: "Our most-loved curated box: Ceylon tea, chocolates, a scented candle and a mini bouquet, finished with a satin bow.",
      si: "අපේ වඩාත්ම ජනප්‍රිය තෑගි පෙට්ටිය: ලංකා තේ, චොකලට්, සුවඳැති ඉටිපන්දමක් සහ කුඩා මල් කළඹක්, සැටින් රිබනයකින් අවසන් කර ඇත.",
    },
    includes: {
      en: ["Premium Ceylon tea & chocolates", "Scented soy candle", "Mini bouquet & card"],
      si: ["උසස් ලංකා තේ සහ චොකලට්", "සුවඳැති සෝයා ඉටිපන්දම", "කුඩා මල් කළඹ සහ කාඩ්පත"],
    },
  },
  {
    slug: "celebration-gift-hamper",
    image: "/images/products/celebration-gift-hamper.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "congratulations", "anniversary"],
    priceUsd: 75,
    compareAtUsd: 89,
    rating: 4.9,
    reviewCount: 112,
    sameDay: true,
    badge: "premium",
    name: {
      en: "Celebration Gift Hamper",
      si: "සැමරුම් තෑගි හැම්පරය",
    },
    description: {
      en: "A generous hamper of wrapped surprises — cake, chocolates, roses and a teddy — for the moments that deserve more.",
      si: "ඊට වඩා දෙයක් ලැබිය යුතු අවස්ථා සඳහා — කේක්, චොකලට්, රෝස මල් සහ ටෙඩි කෙනෙක් ඇතුළු ඔතා ඇති පුදුම දේවල් රැසක්.",
    },
    includes: {
      en: ["500 g cake & chocolate box", "12 roses & 30 cm teddy", "Decorated hamper basket"],
      si: ["ග්‍රෑම් 500 කේක් සහ චොකලට් පෙට්ටිය", "රෝස 12ක් සහ සෙ.මී. 30 ටෙඩි", "සරසන ලද හැම්පර් කූඩය"],
    },
  },
  {
    slug: "mobile-recharge",
    image: "/images/products/mobile-recharge.jpg",
    category: "essentials",
    occasions: ["birthday", "thankYou"],
    priceUsd: 10,
    rating: 4.9,
    reviewCount: 640,
    sameDay: true,
    isService: true,
    name: {
      en: "Mobile Phone Recharge",
      si: "ජංගම දුරකථන රීලෝඩ්",
    },
    description: {
      en: "Top up any Dialog, Mobitel, Hutch or Airtel number in Sri Lanka instantly — so they can always call you back.",
      si: "ලංකාවේ ඕනෑම Dialog, Mobitel, Hutch හෝ Airtel අංකයකට ක්ෂණිකව රීලෝඩ් කරන්න — එවිට ඔවුන්ට ඔබට ඕනෑම වේලාවක කතා කරන්න පුළුවන්.",
    },
    includes: {
      en: ["LKR 3,000 credit", "All Sri Lankan networks", "Delivered within minutes"],
      si: ["රු. 3,000ක රීලෝඩ් එකක්", "ලංකාවේ සියලුම ජාල", "විනාඩි කිහිපයකින් ලැබේ"],
    },
  },
  {
    slug: "pastel-blush-bouquet",
    image: "/images/products/pastel-blush-bouquet.jpg",
    category: "flowers",
    occasions: ["mothersDay", "getWell", "thankYou"],
    priceUsd: 40,
    rating: 4.8,
    reviewCount: 77,
    sameDay: true,
    name: {
      en: "Pastel Blush Bouquet",
      si: "පැස්ටල් බ්ලෂ් මල් කළඹ",
    },
    description: {
      en: "Soft pink peonies, roses and baby’s breath tied with a linen ribbon — gentle, graceful and perfect for Amma.",
      si: "ලිනන් රිබනයකින් බැඳි මෘදු රෝස පැහැති පියෝනි, රෝස සහ බේබීස් බ්‍රෙත් — මෘදු, අලංකාර, අම්මාට ගැලපෙනම තෑග්ග.",
    },
    includes: {
      en: ["15 pastel stems", "Linen ribbon wrap", "Message card"],
      si: ["පැස්ටල් මල් 15ක්", "ලිනන් රිබන් ඔතා දීම", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "artisan-truffle-collection",
    image: "/images/products/artisan-truffle-collection.jpg",
    category: "chocolates",
    occasions: ["love", "anniversary"],
    priceUsd: 34,
    rating: 4.7,
    reviewCount: 59,
    sameDay: true,
    name: {
      en: "Artisan Truffle Collection",
      si: "ආර්ටිසන් ට්‍රෆල් එකතුව",
    },
    description: {
      en: "Twenty-four cocoa-dusted dark chocolate truffles made in small batches with Sri Lankan cocoa.",
      si: "ලාංකීය කොකෝවා යොදා කුඩා ප්‍රමාණවලින් සාදන, කොකෝවා කුඩු ඉසින ලද ඩාක් චොකලට් ට්‍රෆල් 24ක්.",
    },
    includes: {
      en: ["24 dark chocolate truffles", "Kraft gift box", "Message card"],
      si: ["ඩාක් චොකලට් ට්‍රෆල් 24ක්", "ක්‍රාෆ්ට් තෑගි පෙට්ටිය", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "sunflower-sunshine-bouquet",
    image: "/images/products/sunflower-sunshine-bouquet.jpg",
    category: "flowers",
    occasions: ["getWell", "congratulations", "thankYou"],
    priceUsd: 36,
    rating: 4.8,
    reviewCount: 52,
    sameDay: true,
    name: {
      en: "Sunflower Sunshine Bouquet",
      si: "සූරියකාන්ත මල් කළඹ",
    },
    description: {
      en: "Bright sunflowers with yellow accents to lift spirits and bring a little sunshine to someone’s day.",
      si: "කෙනෙකුගේ සිත සනසන්නට සහ දවසට හිරු එළියක් ගෙන එන්නට කහ පැහැති මල් සමඟ දීප්තිමත් සූරියකාන්ත මල්.",
    },
    includes: {
      en: ["7 sunflowers with fillers", "Eco kraft wrapping", "Message card"],
      si: ["පිරවුම් මල් සහිත සූරියකාන්ත 7ක්", "පරිසර හිතකාමී ඔතා දීම", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "fresh-fruit-basket",
    image: "/images/products/fresh-fruit-basket.jpg",
    category: "essentials",
    occasions: ["getWell", "thankYou", "mothersDay"],
    priceUsd: 40,
    rating: 4.7,
    reviewCount: 68,
    sameDay: true,
    name: {
      en: "Tropical Fruit Basket",
      si: "නිවර්තන පලතුරු කූඩය",
    },
    description: {
      en: "Hand-picked seasonal fruit — papaya, pineapple, mango, oranges and grapes — arranged in a reusable basket.",
      si: "අතින් තෝරාගත් සෘතුමය පලතුරු — පැපොල්, අන්නාසි, අඹ, දොඩම් සහ මිදි — නැවත භාවිතා කළ හැකි කූඩයක.",
    },
    includes: {
      en: ["4–5 kg seasonal fruit", "Reusable woven basket", "Get-well card"],
      si: ["සෘතුමය පලතුරු කි.ග්‍රෑ. 4–5", "නැවත භාවිතා කළ හැකි කූඩය", "සුවපත් වේවා කාඩ්පත"],
    },
  },
  {
    slug: "classic-smart-watch",
    image: "/images/products/classic-smart-watch.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "anniversary", "congratulations"],
    priceUsd: 95,
    rating: 4.6,
    reviewCount: 41,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Classic Smart Watch",
      si: "ක්ලැසික් ස්මාර්ට් ඔරලෝසුව",
    },
    description: {
      en: "A minimalist smart watch with heart-rate, step tracking and notifications — gift-wrapped with a card.",
      si: "හෘද ස්පන්දනය, පියවර ගණන සහ දැනුම්දීම් සහිත සරල, අලංකාර ස්මාර්ට් ඔරලෝසුවක් — කාඩ්පතක් සමඟ තෑගි ලෙස ඔතා දෙනවා.",
    },
    includes: {
      en: ["Smart watch with 1-year warranty", "Charger & strap", "Gift wrap & card"],
      si: ["වසරක වගකීම සහිත ස්මාර්ට් ඔරලෝසුව", "චාජරය සහ පටිය", "තෑගි ඔතා දීම සහ කාඩ්පත"],
    },
  },
  {
    slug: "birthday-balloon-combo",
    image: "/images/products/birthday-balloon-combo.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "congratulations"],
    priceUsd: 65,
    rating: 4.8,
    reviewCount: 73,
    sameDay: true,
    badge: "new",
    name: {
      en: "Birthday Balloon Combo",
      si: "උපන්දින බැලූන් කොම්බෝ",
    },
    description: {
      en: "Fill the room with colour: 20 helium balloons, a 500 g cake and a box of chocolates for an instant party.",
      si: "කාමරය වර්ණවලින් පුරවන්න: හීලියම් බැලූන් 20ක්, ග්‍රෑම් 500 කේක් එකක් සහ චොකලට් පෙට්ටියක් — ක්ෂණික සාදයක්.",
    },
    includes: {
      en: ["20 helium balloons", "500 g celebration cake", "Chocolate box & card"],
      si: ["හීලියම් බැලූන් 20ක්", "ග්‍රෑම් 500 සැමරුම් කේක්", "චොකලට් පෙට්ටිය සහ කාඩ්පත"],
    },
  },
  {
    slug: "pink-tulip-vase",
    image: "/images/products/pink-tulip-vase.jpg",
    category: "flowers",
    occasions: ["love", "mothersDay"],
    priceUsd: 48,
    rating: 4.7,
    reviewCount: 38,
    sameDay: false,
    badge: "new",
    name: {
      en: "Pink Tulips in Glass Vase",
      si: "වීදුරු බඳුනක රෝස පැහැති ටියුලිප්",
    },
    description: {
      en: "Imported pink tulips arranged in a clear glass vase — a fresh, modern gift that lasts all week.",
      si: "පැහැදිලි වීදුරු බඳුනක සකස් කළ ආනයනික රෝස පැහැති ටියුලිප් — සතියක් පුරා පවතින නැවුම්, නවීන තෑග්ගක්.",
    },
    includes: {
      en: ["10 imported tulips", "Glass vase", "Message card"],
      si: ["ආනයනික ටියුලිප් 10ක්", "වීදුරු බඳුන", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "cupcake-celebration-box",
    image: "/images/products/cupcake-celebration-box.jpg",
    category: "cakes",
    occasions: ["birthday", "thankYou", "congratulations"],
    priceUsd: 22,
    rating: 4.8,
    reviewCount: 90,
    sameDay: true,
    name: {
      en: "Cupcake Celebration Box",
      si: "කප්කේක් සැමරුම් පෙට්ටිය",
    },
    description: {
      en: "Six vanilla cupcakes swirled with mint buttercream and rainbow sprinkles — easy to share with the whole family.",
      si: "මින්ට් බටර්ක්‍රීම් සහ වර්ණවත් ස්ප්‍රින්කල්ස් සහිත වැනිලා කප්කේක් හයක් — මුළු පවුලටම බෙදාගන්න ලේසියි.",
    },
    includes: {
      en: ["6 vanilla cupcakes", "Window gift box", "Candles & card"],
      si: ["වැනිලා කප්කේක් 6ක්", "කවුළු සහිත තෑගි පෙට්ටිය", "ඉටිපන්දම් සහ කාඩ්පත"],
    },
  },
  {
    slug: "dark-chocolate-gift-pack",
    image: "/images/products/dark-chocolate-gift-pack.jpg",
    category: "chocolates",
    occasions: ["thankYou", "congratulations"],
    priceUsd: 26,
    rating: 4.6,
    reviewCount: 34,
    sameDay: true,
    name: {
      en: "Dark Chocolate Gift Pack",
      si: "ඩාක් චොකලට් තෑගි පැකේජය",
    },
    description: {
      en: "Four bars of single-origin Sri Lankan dark chocolate with cinnamon, sea salt, orange and pure 70% cocoa.",
      si: "කුරුඳු, මුහුදු ලුණු, දොඩම් සහ පිරිසිදු 70% කොකෝවා සහිත ලාංකීය ඩාක් චොකලට් බාර් හතරක්.",
    },
    includes: {
      en: ["4 × 80 g chocolate bars", "Gift sleeve", "Message card"],
      si: ["ග්‍රෑම් 80 චොකලට් බාර් 4ක්", "තෑගි කවරය", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "floral-anniversary-cake",
    image: "/images/products/floral-anniversary-cake.jpg",
    category: "cakes",
    occasions: ["anniversary"],
    priceUsd: 85,
    rating: 5,
    reviewCount: 27,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Three-Tier Floral Anniversary Cake",
      si: "තට්ටු තුනේ මල් සැරසිලි සංවත්සර කේක්",
    },
    description: {
      en: "An elegant three-tier cake decorated with fresh blush roses — made to order for milestone anniversaries.",
      si: "නැවුම් රෝස මල්වලින් සරසන ලද අලංකාර තට්ටු තුනේ කේක් එකක් — විශේෂ සංවත්සර සඳහා ඇණවුම මත සාදනවා.",
    },
    includes: {
      en: ["2.5 kg three-tier cake", "Fresh rose decoration", "Order 48 hours ahead"],
      si: ["තට්ටු තුනේ කේක් කි.ග්‍රෑ. 2.5", "නැවුම් රෝස මල් සැරසිලි", "පැය 48කට පෙර ඇණවුම් කරන්න"],
    },
  },
  // ---- Baby Special (prices set by the client in rupees) ----
  {
    slug: "baby-first-birthday-box",
    image: "/images/products/baby-first-birthday-box.jpg",
    category: "baby",
    occasions: ["birthday"],
    priceUsd: fromLkr(18500),
    rating: 5,
    reviewCount: 24,
    sameDay: false,
    badge: "new",
    name: {
      en: "Baby’s First Birthday Mega Box",
      si: "බබාගේ පළමු උපන්දින මෙගා පෙට්ටිය",
    },
    description: {
      en: "Everything for an unforgettable first birthday in one box — a themed cake, balloons, a personalised name board and a soft teddy to keep.",
      si: "අමතක නොවන පළමු උපන්දිනයකට ඕන හැමදේම එක පෙට්ටියක — තේමා කේක් එකක්, බැලූන්, බබාගේ නම සහිත නාම පුවරුවක් සහ සදාකාලිකව තියාගන්න මෘදු ටෙඩි කෙනෙක්.",
    },
    includes: {
      en: ["1 kg first-birthday theme cake", "Balloon set & personalised name board", "Soft teddy bear & greeting card"],
      si: ["පළමු උපන්දින තේමා කේක් කිලෝ 1", "බැලූන් කට්ටලය සහ නම සහිත පුවරුව", "මෘදු ටෙඩි බෙයාර් සහ සුබපැතුම් කාඩ්පත"],
    },
  },
  {
    slug: "baby-video-surprise-box",
    image: "/images/products/baby-video-surprise-box.jpg",
    category: "baby",
    occasions: ["love", "birthday"],
    priceUsd: fromLkr(7500),
    rating: 5,
    reviewCount: 31,
    sameDay: false,
    badge: "bestseller",
    name: {
      en: "Baby Surprise Box with Your Video Message",
      si: "ඔබේ වීඩියෝ පණිවිඩය සමඟ බබාට පුදුම පෙට්ටිය",
    },
    description: {
      en: "For Amma or Thaththa working abroad: record a video message for your little one and we deliver it with a box of baby goodies — so they can see and hear you, any time.",
      si: "පිටරට ඉන්න අම්මාට හෝ තාත්තාට: ඔබේ පුංචි දරුවාට වීඩියෝ පණිවිඩයක් record කරන්න. බබාට ඕන දේවල් පිරුණු පෙට්ටියක් සමඟ අපි එය ගෙදරටම ගෙනැවිත් දෙනවා — ඕනෑම වේලාවක ඔබව දකින්න, ඔබේ කටහඬ අහන්න.",
    },
    includes: {
      en: ["Your video on a USB pen drive + QR card to watch on a phone", "Soft toy & baby treats", "Gift box with your card"],
      si: ["ඔබේ වීඩියෝව USB pen drive එකක + phone එකෙන් බලන්න QR කාඩ්පතක්", "මෘදු සෙල්ලම් බඩුවක් සහ බබාට කෑම", "ඔබේ කාඩ්පත සහිත තෑගි පෙට්ටිය"],
    },
  },
  {
    slug: "baby-family-photo-album",
    image: "/images/products/baby-family-photo-album.jpg",
    category: "baby",
    occasions: ["birthday", "mothersDay", "love"],
    priceUsd: fromLkr(5500),
    rating: 4.9,
    reviewCount: 18,
    sameDay: false,
    name: {
      en: "Custom Family Photo Album",
      si: "අම්මා තාත්තාගේ ඡායාරූපවලින් හදන ඇල්බමය",
    },
    description: {
      en: "A keepsake album designed from Amma and Thaththa’s own photos. Send us your pictures on WhatsApp and we design, print and deliver it.",
      si: "අම්මාගේ සහ තාත්තාගේ ඡායාරූපවලින්ම නිර්මාණය කරන සිහිවටන ඇල්බමයක්. ඔබේ ඡායාරූප WhatsApp හරහා එවන්න — අපි නිර්මාණය කර, මුද්‍රණය කර ගෙනැවිත් දෙනවා.",
    },
    includes: {
      en: ["30-page premium hardcover album", "Designed from photos you send on WhatsApp", "Gift-wrapped with a card"],
      si: ["පිටු 30ක උසස් hardcover ඇල්බමය", "ඔබ WhatsApp හරහා එවන ඡායාරූපවලින් නිර්මාණය", "කාඩ්පතක් සමඟ තෑගි ලෙස ඔතා දීම"],
    },
  },
  {
    slug: "baby-hand-foot-print-kit",
    image: "/images/products/baby-hand-foot-print-kit.jpg",
    category: "baby",
    occasions: ["mothersDay", "congratulations"],
    priceUsd: fromLkr(4200),
    rating: 4.8,
    reviewCount: 15,
    sameDay: true,
    name: {
      en: "Baby Hand & Foot Print Kit",
      si: "බබාගේ අත් පා සලකුණු කට්ටලය",
    },
    description: {
      en: "Let Amma capture those tiny hands and feet forever. A safe, mess-free kit with a keepsake frame — a memory the family will treasure.",
      si: "ඒ පුංචි අත් සහ පා සලකුණු අම්මාට සදාකාලිකව තියාගන්න. බබාට ආරක්ෂිත, පහසු කට්ටලයක් සහ සිහිවටන රාමුවක් — පවුලම ආදරයෙන් තියාගන්න මතකයක්.",
    },
    includes: {
      en: ["Baby-safe print kit", "Wooden keepsake frame", "Easy step-by-step guide"],
      si: ["බබාට ආරක්ෂිත සලකුණු කට්ටලය", "ලී සිහිවටන රාමුව", "පහසු පියවරෙන් පියවර උපදෙස්"],
    },
  },
  {
    slug: "baby-naming-ceremony-box",
    image: "/images/products/baby-naming-ceremony-box.jpg",
    category: "baby",
    occasions: ["congratulations"],
    priceUsd: fromLkr(12000),
    rating: 5,
    reviewCount: 12,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Baby Naming Ceremony Box",
      si: "නම් තැබීමේ මංගල්‍ය පෙට්ටිය",
    },
    description: {
      en: "Be part of your baby’s naming day from anywhere — a pure white outfit, fresh white flowers and a celebration cake for the family.",
      si: "ඔබ කොහේ හිටියත් බබාගේ නම් තැබීමේ දිනයට එකතු වෙන්න — පිරිසිදු සුදු ඇඳුමක්, නැවුම් සුදු මල් සහ පවුලට සැමරුම් කේක් එකක්.",
    },
    includes: {
      en: ["White baby outfit (choose the size)", "Fresh white flower arrangement", "500 g celebration cake"],
      si: ["සුදු බබා ඇඳුම (ප්‍රමාණය තෝරන්න)", "නැවුම් සුදු මල් සැරසිල්ල", "ග්‍රෑම් 500 සැමරුම් කේක්"],
    },
  },
  {
    slug: "twin-baby-combo",
    image: "/images/products/twin-baby-combo.jpg",
    category: "baby",
    occasions: ["birthday", "congratulations"],
    priceUsd: fromLkr(16000),
    rating: 4.9,
    reviewCount: 9,
    sameDay: false,
    name: {
      en: "Twin Baby Combo",
      si: "නිවුන් දරුවන්ට කොම්බෝ",
    },
    description: {
      en: "Double the joy, double the love: two teddies and two little cakes, so each twin gets their very own surprise.",
      si: "දෙගුණයක් සතුට, දෙගුණයක් ආදරය: ටෙඩි දෙන්නෙක් සහ පුංචි කේක් දෙකක් — නිවුන් දෙන්නාටම තමන්ගේම පුදුමයක්.",
    },
    includes: {
      en: ["2 soft teddy bears", "2 mini celebration cakes", "A card for the twins"],
      si: ["මෘදු ටෙඩි බෙයාර් 2ක්", "පුංචි සැමරුම් කේක් 2ක්", "නිවුන් දෙන්නාට කාඩ්පතක්"],
    },
  },
  {
    slug: "baby-monthly-care-pack",
    image: "/images/products/baby-monthly-care-pack.jpg",
    category: "baby",
    occasions: ["mothersDay", "thankYou"],
    priceUsd: fromLkr(9800),
    rating: 4.9,
    reviewCount: 27,
    sameDay: true,
    name: {
      en: "Baby Milk Powder & Diaper Monthly Pack",
      si: "බබාට මාසික කිරිපිටි සහ ඩයපර් පැකේජය",
    },
    description: {
      en: "The essentials every month, without the worry: milk powder and diapers delivered to the family, ready to order again each month.",
      si: "කිසිම කරදරයක් නැතිව හැම මාසෙම අත්‍යවශ්‍ය දේවල්: කිරිපිටි සහ ඩයපර් පවුලට ගෙනැවිත් දෙනවා — හැම මාසෙම නැවත ඇණවුම් කරන්න පුළුවන්.",
    },
    includes: {
      en: ["Milk powder (tell us the brand)", "Diaper pack (choose the size)", "Delivered every month you order"],
      si: ["කිරිපිටි (සන්නාමය අපට කියන්න)", "ඩයපර් පැකේජය (ප්‍රමාණය තෝරන්න)", "ඔබ ඇණවුම් කරන හැම මාසෙම බෙදාහැරීම"],
    },
  },
  {
    slug: "school-first-day-surprise",
    image: "/images/products/school-first-day-surprise.jpg",
    category: "baby",
    occasions: ["congratulations"],
    priceUsd: fromLkr(8200),
    rating: 4.8,
    reviewCount: 14,
    sameDay: true,
    name: {
      en: "First Day at School Surprise",
      si: "පාසලේ පළමු දිනයට පුදුම තෑග්ග",
    },
    description: {
      en: "Cheer them on for their big first day — a new school bag, a lunch box and a good-luck card from you.",
      si: "පාසල් යන පළමු දිනයට ධෛර්යය දෙන්න — අලුත් පාසල් බෑගයක්, කෑම පෙට්ටියක් සහ ඔබෙන් සුබ පැතුම් කාඩ්පතක්.",
    },
    includes: {
      en: ["School bag & lunch box", "Stationery set", "Good-luck card from you"],
      si: ["පාසල් බෑගය සහ කෑම පෙට්ටිය", "ලිපි ද්‍රව්‍ය කට්ටලය", "ඔබෙන් සුබ පැතුම් කාඩ්පතක්"],
    },
  },
  {
    slug: "baby-milestone-cards",
    image: "/images/products/baby-milestone-cards.jpg",
    category: "baby",
    occasions: ["mothersDay", "congratulations"],
    priceUsd: fromLkr(2800),
    rating: 4.8,
    reviewCount: 21,
    sameDay: true,
    name: {
      en: "Monthly Baby Milestone Card Set",
      si: "බබාගේ මාසික සංධිස්ථාන කාඩ්පත් කට්ටලය",
    },
    description: {
      en: "Photograph your baby with a card each month and watch them grow — beautiful designs for every milestone of the first year.",
      si: "හැම මාසෙම කාඩ්පතක් එක්ක බබාගේ ඡායාරූපයක් ගන්න, ලොකු වෙන හැටි බලන්න — පළමු වසරේ හැම සංධිස්ථානයකටම ලස්සන නිර්මාණ.",
    },
    includes: {
      en: ["12 monthly cards (1–12 months)", "Bonus ‘first smile’, ‘first step’ cards", "English & Sinhala designs"],
      si: ["මාසික කාඩ්පත් 12ක් (මාස 1–12)", "‘පළමු සිනහව’, ‘පළමු පියවර’ අමතර කාඩ්පත්", "ඉංග්‍රීසි සහ සිංහල නිර්මාණ"],
    },
  },
  {
    slug: "baby-horoscope-name-booklet",
    image: "/images/products/baby-horoscope-name-booklet.jpg",
    category: "baby",
    occasions: ["congratulations"],
    priceUsd: fromLkr(3500),
    rating: 4.9,
    reviewCount: 19,
    sameDay: false,
    name: {
      en: "Baby Horoscope & Lucky Name Booklet",
      si: "බබාගේ ජන්ම පත්‍රය සහ සුබ නම් පොත",
    },
    description: {
      en: "Your baby’s horoscope (janma patraya) prepared by an experienced astrologer, with lucky first letters and name suggestions — printed and delivered to the family.",
      si: "පළපුරුදු ජ්‍යෝතිෂවේදියෙකු විසින් සකස් කරන බබාගේ ජන්ම පත්‍රය, සුබ මුල් අකුරු සහ නම් යෝජනා සමඟ — මුද්‍රණය කර පවුලට ගෙනැවිත් දෙනවා.",
    },
    includes: {
      en: ["Horoscope by a qualified astrologer", "Lucky letters & name suggestions", "Send birth date, time & place on WhatsApp"],
      si: ["සුදුසුකම් ලත් ජ්‍යෝතිෂවේදියෙකුගේ ජන්ම පත්‍රය", "සුබ අකුරු සහ නම් යෝජනා", "උපන් දිනය, වේලාව සහ ස්ථානය WhatsApp හරහා එවන්න"],
    },
  },
  {
    slug: "mini-gift-box",
    image: "/images/products/mini-gift-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "thankYou", "love"],
    priceUsd: fromLkr(3500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Mini Gift Box",
      si: "මිනි තෑගි පෙට්ටිය",
    },
    description: {
      en: "A small, sweet surprise — chocolate, a greeting card and a little teddy, packed in a neat gift box.",
      si: "පුංචි, මිහිරි පුදුමයක් — චොකලට්, සුබපැතුම් කාඩ්පතක් සහ පුංචි ටෙඩි කෙනෙක්, ලස්සන තෑගි පෙට්ටියක.",
    },
    includes: {
      en: ["Chocolate", "Greeting card", "Small teddy"],
      si: ["චොකලට්", "සුබපැතුම් කාඩ්පත", "පුංචි ටෙඩි බෙයාර්"],
    },
  },
  {
    slug: "classic-gift-box",
    image: "/images/products/classic-gift-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "love", "anniversary"],
    priceUsd: fromLkr(6800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "bestseller",
    name: {
      en: "Classic Gift Box",
      si: "ක්ලැසික් තෑගි පෙට්ටිය",
    },
    description: {
      en: "Our everyday favourite: chocolate, a soft teddy, a fresh rose and a mug they’ll use every morning.",
      si: "හැමෝම කැමතිම එක: චොකලට්, මෘදු ටෙඩි කෙනෙක්, නැවුම් රෝසයක් සහ හැම උදේම පාවිච්චි කරන මග් එකක්.",
    },
    includes: {
      en: ["Chocolate", "Teddy bear", "Fresh rose", "Mug"],
      si: ["චොකලට්", "ටෙඩි බෙයාර්", "නැවුම් රෝසයක්", "මග් එකක්"],
    },
  },
  {
    slug: "premium-gift-box",
    image: "/images/products/premium-gift-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["anniversary", "love", "birthday"],
    priceUsd: fromLkr(12500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Premium Gift Box",
      si: "ප්‍රීමියම් තෑගි පෙට්ටිය",
    },
    description: {
      en: "A perfume, chocolate, a fresh rose and a photo frame — a thoughtful box for someone special.",
      si: "සුවඳ විලවුන්, චොකලට්, නැවුම් රෝසයක් සහ ඡායාරූප රාමුවක් — විශේෂ කෙනෙකුට සැලකිලිමත් තෑග්ගක්.",
    },
    includes: {
      en: ["Perfume", "Chocolate", "Fresh rose", "Photo frame"],
      si: ["සුවඳ විලවුන්", "චොකලට්", "නැවුම් රෝසයක්", "ඡායාරූප රාමුවක්"],
    },
  },
  {
    slug: "luxury-black-box",
    image: "/images/products/luxury-black-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["anniversary", "love", "birthday"],
    priceUsd: fromLkr(22000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Luxury Black Box",
      si: "ලක්සරි කළු පෙට්ටිය",
    },
    description: {
      en: "Our most luxurious box — a watch, perfume, chocolate and a rose, presented in an elegant black box.",
      si: "අපේ සුඛෝපභෝගීම පෙට්ටිය — ඔරලෝසුවක්, සුවඳ විලවුන්, චොකලට් සහ රෝසයක්, අලංකාර කළු පෙට්ටියක.",
    },
    includes: {
      en: ["Watch", "Perfume", "Chocolate", "Rose"],
      si: ["ඔරලෝසුවක්", "සුවඳ විලවුන්", "චොකලට්", "රෝසයක්"],
    },
  },
  {
    slug: "mystery-box",
    image: "/images/products/mystery-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "love", "thankYou"],
    priceUsd: fromLkr(5500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Mystery Box",
      si: "මිස්ට්‍රි බොක්ස්",
    },
    description: {
      en: "You don’t tell us what to put in — we choose a surprise for you. Fun for both the sender and the receiver!",
      si: "ඇතුළට දාන්න ඕන මොනවද කියලා ඔබ කියන්න එපා — අපි පුදුමයක් තෝරලා දානවා. යවන කෙනාටත් ලැබෙන කෙනාටත් විනෝදයක්!",
    },
    includes: {
      en: ["A surprise selection chosen by our team", "Gift wrapping & message card"],
      si: ["අපේ කණ්ඩායම තෝරන පුදුම තෑගි", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "birthday-gift-box",
    image: "/images/products/birthday-gift-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["birthday"],
    priceUsd: fromLkr(9500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Birthday Gift Box",
      si: "උපන්දින තෑගි පෙට්ටිය",
    },
    description: {
      en: "Everything for a birthday in one box — a cake, balloons, a card and a teddy.",
      si: "උපන්දිනයකට ඕන හැමදේම එක පෙට්ටියක — කේක් එකක්, බැලූන්, කාඩ්පතක් සහ ටෙඩි කෙනෙක්.",
    },
    includes: {
      en: ["Cake", "Balloons", "Birthday card", "Teddy bear"],
      si: ["කේක් එකක්", "බැලූන්", "උපන්දින කාඩ්පත", "ටෙඩි බෙයාර්"],
    },
  },
  {
    slug: "self-care-box",
    image: "/images/products/self-care-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["mothersDay", "getWell", "thankYou"],
    priceUsd: fromLkr(7200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Self Care Box",
      si: "සෙල්ෆ් කෙයාර් පෙට්ටිය",
    },
    description: {
      en: "A little time to relax — a face mask, a scented candle, chocolate and tea.",
      si: "ටිකක් විවේක ගන්න — ෆේස් මාස්ක් එකක්, සුවඳ ඉටිපන්දමක්, චොකලට් සහ තේ.",
    },
    includes: {
      en: ["Face mask", "Scented candle", "Chocolate", "Tea"],
      si: ["ෆේස් මාස්ක්", "සුවඳ ඉටිපන්දම", "චොකලට්", "තේ"],
    },
  },
  {
    slug: "snack-box",
    image: "/images/products/snack-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["birthday", "thankYou"],
    priceUsd: fromLkr(4200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Snack Box",
      si: "ස්නැක් පෙට්ටිය",
    },
    description: {
      en: "A box full of treats — chips, chocolate, juice and cookies to share.",
      si: "කෑම රසකැවිලි පිරුණු පෙට්ටියක් — චිප්ස්, චොකලට්, ජූස් සහ කුකීස්.",
    },
    includes: {
      en: ["Chips", "Chocolate", "Juice", "Cookies"],
      si: ["චිප්ස්", "චොකලට්", "ජූස්", "කුකීස්"],
    },
  },
  {
    slug: "love-box",
    image: "/images/products/love-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["love", "anniversary"],
    priceUsd: fromLkr(8800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Love Box",
      si: "ආදර පෙට්ටිය",
    },
    description: {
      en: "Ten love letters, a rose, chocolate and a teddy — say everything you feel, one letter at a time.",
      si: "ආදර ලියුම් 10ක්, රෝසයක්, චොකලට් සහ ටෙඩි කෙනෙක් — දැනෙන හැමදේම එක ලියුමෙන් එක කියන්න.",
    },
    includes: {
      en: ["10 love letters", "Rose", "Chocolate", "Teddy bear"],
      si: ["ආදර ලියුම් 10ක්", "රෝසයක්", "චොකලට්", "ටෙඩි බෙයාර්"],
    },
  },
  {
    slug: "apology-box",
    image: "/images/products/apology-box-v2.jpg",
    category: "giftBoxes",
    occasions: ["love"],
    priceUsd: fromLkr(6500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Apology Box",
      si: "සමාව ඉල්ලීමේ පෙට්ටිය",
    },
    description: {
      en: "The sweetest way to say sorry — a sorry card, chocolate, a teddy and a rose.",
      si: "සමාව ඉල්ලන්න මිහිරිම ක්‍රමය — සමාව ඉල්ලීමේ කාඩ්පතක්, චොකලට්, ටෙඩි කෙනෙක් සහ රෝසයක්.",
    },
    includes: {
      en: ["Sorry card", "Chocolate", "Teddy bear", "Rose"],
      si: ["සමාව ඉල්ලීමේ කාඩ්පත", "චොකලට්", "ටෙඩි බෙයාර්", "රෝසයක්"],
    },
  },
  {
    slug: "baby-gift-box",
    image: "/images/products/baby-gift-box-v2.jpg",
    category: "baby",
    occasions: ["congratulations"],
    priceUsd: fromLkr(7500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Baby Gift Box",
      si: "බබාට තෑගි පෙට්ටිය",
    },
    description: {
      en: "Welcome the new baby with a dress, a toy, a milk bottle and a soft teddy.",
      si: "අලුත් බබාව පිළිගන්න — ඇඳුමක්, සෙල්ලම් බඩුවක්, කිරි බෝතලයක් සහ මෘදු ටෙඩි කෙනෙක්.",
    },
    includes: {
      en: ["Baby dress", "Toy", "Milk bottle", "Teddy bear"],
      si: ["බබාගේ ඇඳුමක්", "සෙල්ලම් බඩුවක්", "කිරි බෝතලයක්", "ටෙඩි බෙයාර්"],
    },
  },
  {
    slug: "kids-birthday-box",
    image: "/images/products/kids-birthday-box-v2.jpg",
    category: "baby",
    occasions: ["birthday"],
    priceUsd: fromLkr(10500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Kids Birthday Box",
      si: "ළමා උපන්දින පෙට්ටිය",
    },
    description: {
      en: "A party in a box for the little one — cake, balloons, toys and chocolate.",
      si: "පුංචි අයට පෙට්ටියක් පුරා සාදයක් — කේක්, බැලූන්, සෙල්ලම් බඩු සහ චොකලට්.",
    },
    includes: {
      en: ["Cake", "Balloons", "Toys", "Chocolate"],
      si: ["කේක් එකක්", "බැලූන්", "සෙල්ලම් බඩු", "චොකලට්"],
    },
  },
  {
    slug: "school-kids-box",
    image: "/images/products/school-kids-box-v2.jpg",
    category: "baby",
    occasions: ["congratulations", "birthday"],
    priceUsd: fromLkr(9200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "School Kids Box",
      si: "පාසල් ළමා පෙට්ටිය",
    },
    description: {
      en: "Ready for school — a bag, water bottle, lunch box and pencil box.",
      si: "පාසල් යන්න සූදානම් — බෑග් එකක්, වතුර බෝතලයක්, කෑම පෙට්ටියක් සහ පැන්සල් පෙට්ටියක්.",
    },
    includes: {
      en: ["School bag", "Water bottle", "Lunch box", "Pencil box"],
      si: ["පාසල් බෑගය", "වතුර බෝතලය", "කෑම පෙට්ටිය", "පැන්සල් පෙට්ටිය"],
    },
  },
  {
    slug: "baby-diaper-cake",
    image: "/images/products/baby-diaper-cake-v2.jpg",
    category: "baby",
    occasions: ["congratulations"],
    priceUsd: fromLkr(6500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "new",
    name: {
      en: "Baby Diaper Cake",
      si: "බබාගේ ඩයපර් කේක්",
    },
    description: {
      en: "A unique “cake” made entirely of diapers — a beautiful and useful gift for new parents.",
      si: "සම්පූර්ණයෙන්ම ඩයපර්වලින් හදපු වෙනස්ම “කේක්” එකක් — අලුත් දෙමාපියන්ට ලස්සන සහ ප්‍රයෝජනවත් තෑග්ගක්.",
    },
    includes: {
      en: ["Cake made from baby diapers", "Ribbon decoration", "Message card"],
      si: ["බබාගේ ඩයපර්වලින් හදපු කේක්", "රිබන් සැරසිලි", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "baby-care-hamper",
    image: "/images/products/baby-care-hamper.jpg",
    category: "baby",
    occasions: ["congratulations"],
    priceUsd: fromLkr(5800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Baby Care Hamper",
      si: "බබාගේ රැකවරණ හැම්පරය",
    },
    description: {
      en: "Daily essentials for the baby — soap, powder, oil and diapers.",
      si: "බබාට දිනපතා අවශ්‍ය දෑ — සබන්, පවුඩර්, තෙල් සහ ඩයපර්.",
    },
    includes: {
      en: ["Baby soap", "Baby powder", "Baby oil", "Diapers"],
      si: ["බබා සබන්", "බබා පවුඩර්", "බබා තෙල්", "ඩයපර්"],
    },
  },
  {
    slug: "kids-toy-set",
    image: "/images/products/kids-toy-set-v2.jpg",
    category: "baby",
    occasions: ["birthday"],
    priceUsd: fromLkr(4500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Kids Toy Set",
      si: "ළමා සෙල්ලම් බඩු කට්ටලය",
    },
    description: {
      en: "Pick a toy car, a doll or a Lego set — tell us which one on WhatsApp.",
      si: "සෙල්ලම් කාර් එකක්, බෝනික්කෙක් හෝ ලෙගෝ කට්ටලයක් තෝරන්න — WhatsApp එකෙන් අපිට කියන්න.",
    },
    includes: {
      en: ["Toy car, doll or Lego set (your choice)", "Gift wrapping & message card"],
      si: ["සෙල්ලම් කාර්, බෝනික්කා හෝ ලෙගෝ (ඔබේ කැමැත්තට)", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "kids-drawing-kit",
    image: "/images/products/kids-drawing-kit-v2.jpg",
    category: "baby",
    occasions: ["birthday", "congratulations"],
    priceUsd: fromLkr(3800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Kids Drawing Kit",
      si: "ළමා චිත්‍ර ඇඳීමේ කට්ටලය",
    },
    description: {
      en: "For little artists — colours, a drawing book and a bag to carry it all.",
      si: "පුංචි චිත්‍ර ශිල්පීන්ට — පාට, චිත්‍ර පොතක් සහ ඒ හැමදේම දාගන්න බෑග් එකක්.",
    },
    includes: {
      en: ["Colours", "Drawing book", "Bag"],
      si: ["පාට", "චිත්‍ර පොත", "බෑග් එකක්"],
    },
  },
  {
    slug: "baby-first-toy",
    image: "/images/products/baby-first-toy-v2.jpg",
    category: "baby",
    occasions: ["congratulations"],
    priceUsd: fromLkr(2500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Baby’s First Toy",
      si: "බබාගේ පළමු සෙල්ලම් බඩුව",
    },
    description: {
      en: "A soft, safe toy to be your baby’s very first friend.",
      si: "බබාගේ පළමු යාළුවා වෙන්න මෘදු, ආරක්ෂිත සෙල්ලම් බඩුවක්.",
    },
    includes: {
      en: ["Soft toy", "Gift wrapping & message card"],
      si: ["මෘදු සෙල්ලම් බඩුවක්", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "kids-cycle",
    image: "/images/products/kids-cycle-v2.jpg",
    category: "baby",
    occasions: ["birthday", "congratulations"],
    priceUsd: fromLkr(18000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Kids Cycle Gift",
      si: "ළමා බයිසිකල් තෑග්ග",
    },
    description: {
      en: "A bicycle delivered to their door — the gift every child remembers.",
      si: "නිවසටම ගෙනත් දෙන බයිසිකලයක් — හැම දරුවෙක්ම මතක තියාගන්න තෑග්ග.",
    },
    includes: {
      en: ["Kids bicycle", "Message card"],
      si: ["ළමා බයිසිකලයක්", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "kids-study-table",
    image: "/images/products/kids-study-table.jpg",
    category: "baby",
    occasions: ["congratulations", "birthday"],
    priceUsd: fromLkr(12000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Kids Study Table Gift",
      si: "ළමා පාඩම් මේසය",
    },
    description: {
      en: "A study table of their own — a great start for school work at home.",
      si: "තමන්ගේම පාඩම් මේසයක් — ගෙදර පාඩම් කරන්න හොඳ ආරම්භයක්.",
    },
    includes: {
      en: ["Kids study table", "Message card"],
      si: ["ළමා පාඩම් මේසය", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "beauty-gift-box",
    image: "/images/products/beauty-gift-box-v2.jpg",
    category: "beauty",
    occasions: ["birthday", "mothersDay", "love"],
    priceUsd: fromLkr(8500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Beauty Gift Box",
      si: "රූපලාවණ්‍ය තෑගි පෙට්ටිය",
    },
    description: {
      en: "Lipstick, a face mask, perfume and lotion — a pampering box she’ll love.",
      si: "ලිප්ස්ටික්, ෆේස් මාස්ක්, සුවඳ විලවුන් සහ ලෝෂන් — ඇය කැමති වෙන පෙට්ටියක්.",
    },
    includes: {
      en: ["Lipstick", "Face mask", "Perfume", "Lotion"],
      si: ["ලිප්ස්ටික්", "ෆේස් මාස්ක්", "සුවඳ විලවුන්", "ලෝෂන්"],
    },
  },
  {
    slug: "korean-beauty-box",
    image: "/images/products/korean-beauty-box-v2.jpg",
    category: "beauty",
    occasions: ["birthday", "love"],
    priceUsd: fromLkr(9800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "new",
    name: {
      en: "Korean Beauty Box",
      si: "කොරියානු රූපලාවණ්‍ය පෙට්ටිය",
    },
    description: {
      en: "The K-beauty routine in one box — 10 Korean face masks, a serum and a cream.",
      si: "කොරියානු සම රැකවරණය එක පෙට්ටියක — කොරියානු ෆේස් මාස්ක් 10ක්, සීරම් සහ ක්‍රීම්.",
    },
    includes: {
      en: ["10 Korean face masks", "Serum", "Cream"],
      si: ["කොරියානු ෆේස් මාස්ක් 10ක්", "සීරම්", "ක්‍රීම්"],
    },
  },
  {
    slug: "skin-care-set",
    image: "/images/products/skin-care-set-v2.jpg",
    category: "beauty",
    occasions: ["birthday", "mothersDay"],
    priceUsd: fromLkr(7500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Skin Care Set",
      si: "සම රැකවරණ කට්ටලය",
    },
    description: {
      en: "A simple daily routine — cleanser, toner and moisturiser.",
      si: "සරල දිනපතා සම රැකවරණයක් — ක්ලෙන්සර්, ටෝනර් සහ මොයිස්චරයිසර්.",
    },
    includes: {
      en: ["Cleanser", "Toner", "Moisturiser"],
      si: ["ක්ලෙන්සර්", "ටෝනර්", "මොයිස්චරයිසර්"],
    },
  },
  {
    slug: "makeup-kit",
    image: "/images/products/makeup-kit-v2.jpg",
    category: "beauty",
    occasions: ["birthday", "congratulations"],
    priceUsd: fromLkr(12500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Makeup Kit — Full Set",
      si: "මේකප් කට්ටලය — සම්පූර්ණ",
    },
    description: {
      en: "A complete makeup kit with everything she needs for any occasion.",
      si: "ඕනෑම අවස්ථාවකට ඇයට අවශ්‍ය හැමදේම තියෙන සම්පූර්ණ මේකප් කට්ටලයක්.",
    },
    includes: {
      en: ["Full makeup set", "Gift wrapping & message card"],
      si: ["සම්පූර්ණ මේකප් කට්ටලය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "hair-care-box",
    image: "/images/products/hair-care-box-v2.jpg",
    category: "beauty",
    occasions: ["mothersDay", "thankYou"],
    priceUsd: fromLkr(5200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Hair Care Box",
      si: "කෙස් රැකවරණ පෙට්ටිය",
    },
    description: {
      en: "Shampoo, conditioner and hair oil for healthy, shiny hair.",
      si: "නිරෝගී, දිලිසෙන කෙස් සඳහා ෂැම්පූ, කන්ඩිෂනර් සහ කොණ්ඩ තෙල්.",
    },
    includes: {
      en: ["Shampoo", "Conditioner", "Hair oil"],
      si: ["ෂැම්පූ", "කන්ඩිෂනර්", "කොණ්ඩ තෙල්"],
    },
  },
  {
    slug: "mini-perfume-set",
    image: "/images/products/mini-perfume-set-v2.jpg",
    category: "beauty",
    occasions: ["birthday", "love", "anniversary"],
    priceUsd: fromLkr(6800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Perfume Set — 3 Minis",
      si: "සුවඳ විලවුන් කට්ටලය — මිනි 3",
    },
    description: {
      en: "Three mini perfumes — a different fragrance for every mood.",
      si: "මිනි සුවඳ විලවුන් තුනක් — හැම මනෝභාවයකටම වෙනස් සුවඳක්.",
    },
    includes: {
      en: ["3 mini perfumes", "Gift wrapping & message card"],
      si: ["මිනි සුවඳ විලවුන් 3ක්", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "nail-art-kit",
    image: "/images/products/nail-art-kit-v2.jpg",
    category: "beauty",
    occasions: ["birthday"],
    priceUsd: fromLkr(3500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Nail Art Kit",
      si: "නියපොතු සැරසීමේ කට්ටලය",
    },
    description: {
      en: "Everything for beautiful nails at home — colours, tools and decorations.",
      si: "ගෙදරදීම ලස්සන නියපොතු — පාට, උපකරණ සහ සැරසිලි.",
    },
    includes: {
      en: ["Nail art kit", "Gift wrapping & message card"],
      si: ["නියපොතු සැරසීමේ කට්ටලය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "face-mask-combo",
    image: "/images/products/face-mask-combo-v2.jpg",
    category: "beauty",
    occasions: ["thankYou", "getWell"],
    priceUsd: fromLkr(3200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Face Mask Combo — 10 pcs",
      si: "ෆේස් මාස්ක් කොම්බෝ — 10",
    },
    description: {
      en: "Ten sheet masks for ten relaxing evenings.",
      si: "විවේකී සවස් දහයකට ෂීට් මාස්ක් දහයක්.",
    },
    includes: {
      en: ["10 face masks", "Gift wrapping & message card"],
      si: ["ෆේස් මාස්ක් 10ක්", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "bath-body-box",
    image: "/images/products/bath-body-box-v2.jpg",
    category: "beauty",
    occasions: ["mothersDay", "thankYou", "getWell"],
    priceUsd: fromLkr(5500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Bath & Body Box",
      si: "නාන සහ ශරීර රැකවරණ පෙට්ටිය",
    },
    description: {
      en: "Soap, body wash, lotion and a soft towel — a spa day at home.",
      si: "සබන්, බොඩි වොෂ්, ලෝෂන් සහ මෘදු තුවායක් — ගෙදරදීම ස්පා දවසක්.",
    },
    includes: {
      en: ["Soap", "Body wash", "Lotion", "Towel"],
      si: ["සබන්", "බොඩි වොෂ්", "ලෝෂන්", "තුවායක්"],
    },
  },
  {
    slug: "bridal-beauty-box",
    image: "/images/products/bridal-beauty-box-v2.jpg",
    category: "beauty",
    occasions: ["congratulations", "love"],
    priceUsd: fromLkr(18000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Bridal Beauty Box — Full Set",
      si: "මනාලියගේ රූපලාවණ්‍ය පෙට්ටිය — සම්පූර්ණ",
    },
    description: {
      en: "A complete beauty set for the bride-to-be — for the big day and the days before it.",
      si: "අනාගත මනාලියට සම්පූර්ණ රූපලාවණ්‍ය කට්ටලයක් — මඟුල් දවසටත් ඊට කලින් දවස්වලටත්.",
    },
    includes: {
      en: ["Full bridal beauty set", "Gift wrapping & message card"],
      si: ["සම්පූර්ණ මනාලී රූපලාවණ්‍ය කට්ටලය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "for-her-box",
    image: "/images/products/for-her-box-v2.jpg",
    category: "women",
    occasions: ["birthday", "anniversary", "mothersDay", "love"],
    priceUsd: fromLkr(16500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "premium",
    name: {
      en: "For Her Box",
      si: "ඇයට තෑගි පෙට්ටිය",
    },
    description: {
      en: "A saree, perfume, chocolate and a rose — a complete gift for the special woman in your life.",
      si: "සාරියක්, සුවඳ විලවුන්, චොකලට් සහ රෝසයක් — ඔබේ ජීවිතයේ විශේෂ කාන්තාවට සම්පූර්ණ තෑග්ගක්.",
    },
    includes: {
      en: ["Saree", "Perfume", "Chocolate", "Rose"],
      si: ["සාරියක්", "සුවඳ විලවුන්", "චොකලට්", "රෝසයක්"],
    },
  },
  {
    slug: "ladies-handbag",
    image: "/images/products/ladies-handbag-v2.jpg",
    category: "women",
    occasions: ["birthday", "mothersDay"],
    priceUsd: fromLkr(7500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Ladies Handbag",
      si: "කාන්තා අත් බෑගය",
    },
    description: {
      en: "A stylish handbag for everyday use.",
      si: "දිනපතා පාවිච්චියට ලස්සන අත් බෑගයක්.",
    },
    includes: {
      en: ["Ladies handbag", "Gift wrapping & message card"],
      si: ["කාන්තා අත් බෑගය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "cotton-saree",
    image: "/images/products/cotton-saree-v2.jpg",
    category: "women",
    occasions: ["mothersDay", "birthday"],
    priceUsd: fromLkr(8500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Cotton Saree + Blouse",
      si: "කපු සාරිය + හැට්ටය",
    },
    description: {
      en: "A comfortable cotton saree with a matching blouse piece.",
      si: "ගැළපෙන හැට්ට රෙද්දක් සමඟ සුවපහසු කපු සාරියක්.",
    },
    includes: {
      en: ["Cotton saree", "Blouse piece", "Gift wrapping & message card"],
      si: ["කපු සාරිය", "හැට්ට රෙද්ද", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "silk-saree",
    image: "/images/products/silk-saree-v2.jpg",
    category: "women",
    occasions: ["anniversary", "mothersDay"],
    priceUsd: fromLkr(18000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "premium",
    name: {
      en: "Silk Saree + Blouse",
      si: "සිල්ක් සාරිය + හැට්ටය",
    },
    description: {
      en: "An elegant silk saree with a matching blouse piece — perfect for weddings and functions.",
      si: "ගැළපෙන හැට්ට රෙද්දක් සමඟ අලංකාර සිල්ක් සාරියක් — මඟුල් ගෙවල් සහ උත්සවවලට හොඳම එක.",
    },
    includes: {
      en: ["Silk saree", "Blouse piece", "Gift wrapping & message card"],
      si: ["සිල්ක් සාරිය", "හැට්ට රෙද්ද", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "kurthi-set",
    image: "/images/products/kurthi-set-v2.jpg",
    category: "women",
    occasions: ["birthday"],
    priceUsd: fromLkr(6200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Kurthi Set",
      si: "කුර්තා කට්ටලය",
    },
    description: {
      en: "A comfortable, stylish kurthi set for everyday wear.",
      si: "දිනපතා අඳින්න සුවපහසු, ලස්සන කුර්තා කට්ටලයක්.",
    },
    includes: {
      en: ["Kurthi set", "Gift wrapping & message card"],
      si: ["කුර්තා කට්ටලය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "jewellery-set",
    image: "/images/products/jewellery-set-v2.jpg",
    category: "women",
    occasions: ["anniversary", "birthday", "love"],
    priceUsd: fromLkr(9500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Jewellery Set",
      si: "ආභරණ කට්ටලය",
    },
    description: {
      en: "A matching necklace and earrings set.",
      si: "ගැළපෙන මාලයක් සහ කරාබු කට්ටලයක්.",
    },
    includes: {
      en: ["Necklace", "Earrings", "Gift box"],
      si: ["මාලය", "කරාබු", "තෑගි පෙට්ටිය"],
    },
  },
  {
    slug: "gold-plated-chain",
    image: "/images/products/gold-plated-chain-v2.jpg",
    category: "women",
    occasions: ["anniversary", "birthday"],
    priceUsd: fromLkr(12000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Gold Plated Chain",
      si: "රන් ආලේපිත දාමය",
    },
    description: {
      en: "A delicate gold-plated chain, presented in a gift box.",
      si: "තෑගි පෙට්ටියක දමා දෙන සියුම් රන් ආලේපිත දාමයක්.",
    },
    includes: {
      en: ["Gold-plated chain", "Gift box & message card"],
      si: ["රන් ආලේපිත දාමය", "තෑගි පෙට්ටිය සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "ladies-watch",
    image: "/images/products/ladies-watch-v2.jpg",
    category: "women",
    occasions: ["birthday", "anniversary"],
    priceUsd: fromLkr(8500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Ladies Watch",
      si: "කාන්තා ඔරලෝසුව",
    },
    description: {
      en: "An elegant ladies’ watch for everyday wear.",
      si: "දිනපතා පළඳින්න අලංකාර කාන්තා ඔරලෝසුවක්.",
    },
    includes: {
      en: ["Ladies watch", "Gift box & message card"],
      si: ["කාන්තා ඔරලෝසුව", "තෑගි පෙට්ටිය සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "ladies-slippers",
    image: "/images/products/ladies-slippers-v2.jpg",
    category: "women",
    occasions: ["birthday", "mothersDay"],
    priceUsd: fromLkr(4200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Ladies Branded Slippers",
      si: "කාන්තා බ්‍රෑන්ඩඩ් සෙරෙප්පු",
    },
    description: {
      en: "Comfortable branded slippers — tell us the size on WhatsApp.",
      si: "සුවපහසු බ්‍රෑන්ඩඩ් සෙරෙප්පු — ප්‍රමාණය WhatsApp එකෙන් කියන්න.",
    },
    includes: {
      en: ["Branded slippers (your size)", "Gift wrapping & message card"],
      si: ["බ්‍රෑන්ඩඩ් සෙරෙප්පු (ඔබේ ප්‍රමාණයට)", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "night-dress-set",
    image: "/images/products/night-dress-set.jpg",
    category: "women",
    occasions: ["birthday", "love"],
    priceUsd: fromLkr(3800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Night Dress Set",
      si: "රාත්‍රී ඇඳුම් කට්ටලය",
    },
    description: {
      en: "A soft, comfortable night dress set.",
      si: "මෘදු, සුවපහසු රාත්‍රී ඇඳුම් කට්ටලයක්.",
    },
    includes: {
      en: ["Night dress set", "Gift wrapping & message card"],
      si: ["රාත්‍රී ඇඳුම් කට්ටලය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "scarf-gloves-set",
    image: "/images/products/scarf-gloves-set-v2.jpg",
    category: "women",
    occasions: ["birthday", "thankYou"],
    priceUsd: fromLkr(3200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Scarf + Gloves Set",
      si: "ස්කාෆ් + අත්වැසුම් කට්ටලය",
    },
    description: {
      en: "A matching scarf and gloves — warm and stylish.",
      si: "ගැළපෙන ස්කාෆ් එකක් සහ අත්වැසුම් — උණුසුම් සහ ලස්සන.",
    },
    includes: {
      en: ["Scarf", "Gloves", "Gift wrapping & message card"],
      si: ["ස්කාෆ්", "අත්වැසුම්", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "led-makeup-mirror",
    image: "/images/products/led-makeup-mirror.jpg",
    category: "women",
    occasions: ["birthday"],
    priceUsd: fromLkr(5800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Makeup Mirror with Light",
      si: "ලයිට් සහිත මේකප් කණ්ණාඩිය",
    },
    description: {
      en: "A makeup mirror with built-in lights for a perfect look every time.",
      si: "හැම වෙලාවකම පරිපූර්ණ පෙනුමකට ලයිට් සවි කළ මේකප් කණ්ණාඩියක්.",
    },
    includes: {
      en: ["LED makeup mirror", "Gift wrapping & message card"],
      si: ["LED මේකප් කණ්ණාඩිය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "student-survival-box",
    image: "/images/products/student-survival-box-v2.jpg",
    category: "student",
    occasions: ["thankYou", "getWell"],
    priceUsd: fromLkr(4500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "bestseller",
    name: {
      en: "Student Survival Box",
      si: "ශිෂ්‍ය සර්වයිවල් පෙට්ටිය",
    },
    description: {
      en: "For the one living in a hostel — noodles, biscuits, tea and chocolate to get through the week.",
      si: "හොස්ටල් එකේ ඉන්න කෙනාට — සතිය ගෙවාගන්න නූඩ්ල්ස්, බිස්කට්, තේ සහ චොකලට්.",
    },
    includes: {
      en: ["Noodles", "Biscuits", "Tea", "Chocolate"],
      si: ["නූඩ්ල්ස්", "බිස්කට්", "තේ", "චොකලට්"],
    },
  },
  {
    slug: "study-pack",
    image: "/images/products/study-pack-v2.jpg",
    category: "student",
    occasions: ["congratulations"],
    priceUsd: fromLkr(5500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Study Pack",
      si: "පාඩම් පැකේජය",
    },
    description: {
      en: "Books, pens, a file and a calculator — everything for the study table.",
      si: "පොත්, පෑන්, ෆයිල් එකක් සහ කැල්කියුලේටරයක් — පාඩම් මේසයට ඕන හැමදේම.",
    },
    includes: {
      en: ["Books", "Pens", "File", "Calculator"],
      si: ["පොත්", "පෑන්", "ෆයිල් එකක්", "කැල්කියුලේටරය"],
    },
  },
  {
    slug: "laptop-table",
    image: "/images/products/laptop-table-v2.jpg",
    category: "student",
    occasions: ["congratulations", "birthday"],
    priceUsd: fromLkr(4800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Laptop Table",
      si: "ලැප්ටොප් මේසය",
    },
    description: {
      en: "A handy laptop table for studying in bed or on the sofa.",
      si: "ඇඳේ හෝ සෝෆාවේ ඉඳන් පාඩම් කරන්න පහසු ලැප්ටොප් මේසයක්.",
    },
    includes: {
      en: ["Laptop table", "Message card"],
      si: ["ලැප්ටොප් මේසය", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "headphones-gift",
    image: "/images/products/headphones-gift-v2.jpg",
    category: "student",
    occasions: ["birthday", "congratulations"],
    priceUsd: fromLkr(6500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Headphones Gift",
      si: "හෙඩ්ෆෝන් තෑග්ග",
    },
    description: {
      en: "Headphones for music, lectures and calls home.",
      si: "සංගීතයට, දේශනවලට සහ ගෙදරට කෝල් කරන්න හෙඩ්ෆෝන්.",
    },
    includes: {
      en: ["Headphones", "Gift wrapping & message card"],
      si: ["හෙඩ්ෆෝන්", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "bottle-lunch-box-set",
    image: "/images/products/bottle-lunch-box-set-v2.jpg",
    category: "student",
    occasions: ["congratulations"],
    priceUsd: fromLkr(3200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Water Bottle + Lunch Box Set",
      si: "වතුර බෝතලය + කෑම පෙට්ටිය",
    },
    description: {
      en: "A matching water bottle and lunch box for school or campus.",
      si: "පාසලට හෝ කැම්පස් එකට ගැළපෙන වතුර බෝතලයක් සහ කෑම පෙට්ටියක්.",
    },
    includes: {
      en: ["Water bottle", "Lunch box"],
      si: ["වතුර බෝතලය", "කෑම පෙට්ටිය"],
    },
  },
  {
    slug: "exam-success-box",
    image: "/images/products/exam-success-box-v2.jpg",
    category: "student",
    occasions: ["congratulations"],
    priceUsd: fromLkr(3800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Exam Success Box",
      si: "විභාග ජය පෙට්ටිය",
    },
    description: {
      en: "Wish them luck before the exam — a pen set, a card, chocolate and a flower.",
      si: "විභාගයට කලින් ජය පතන්න — පෑන් කට්ටලයක්, කාඩ්පතක්, චොකලට් සහ මලක්.",
    },
    includes: {
      en: ["Pen set", "Good-luck card", "Chocolate", "Flower"],
      si: ["පෑන් කට්ටලය", "ජය පැතුම් කාඩ්පත", "චොකලට්", "මලක්"],
    },
  },
  {
    slug: "university-gift-box",
    image: "/images/products/university-gift-box-v2.jpg",
    category: "student",
    occasions: ["congratulations"],
    priceUsd: fromLkr(8200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "University Gift Box",
      si: "විශ්වවිද්‍යාල තෑගි පෙට්ටිය",
    },
    description: {
      en: "For the new university student — a bag, bottle, notebook and pen.",
      si: "අලුත් විශ්වවිද්‍යාල ශිෂ්‍යයාට — බෑග් එකක්, බෝතලයක්, සටහන් පොතක් සහ පෑනක්.",
    },
    includes: {
      en: ["Bag", "Bottle", "Notebook", "Pen"],
      si: ["බෑග් එකක්", "බෝතලයක්", "සටහන් පොතක්", "පෑනක්"],
    },
  },
  {
    slug: "book-gift",
    image: "/images/products/book-gift-v2.jpg",
    category: "student",
    occasions: ["birthday", "congratulations"],
    priceUsd: fromLkr(3000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Book Gift",
      si: "පොත් තෑග්ග",
    },
    description: {
      en: "A novel or a motivational book with a card — tell us your pick on WhatsApp.",
      si: "කාඩ්පතක් සමඟ නවකතාවක් හෝ අභිප්‍රේරණ පොතක් — ඔබේ තේරීම WhatsApp එකෙන් කියන්න.",
    },
    includes: {
      en: ["Novel or motivational book", "Card"],
      si: ["නවකතාවක් හෝ අභිප්‍රේරණ පොතක්", "කාඩ්පත"],
    },
  },
  {
    slug: "phone-stand-light",
    image: "/images/products/phone-stand-light-v2.jpg",
    category: "student",
    occasions: ["birthday"],
    priceUsd: fromLkr(2800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Phone Stand + Light",
      si: "ෆෝන් ස්ටෑන්ඩ් + ලයිට්",
    },
    description: {
      en: "A phone stand with a light — great for video calls and online classes.",
      si: "ලයිට් එකක් සහිත ෆෝන් ස්ටෑන්ඩ් එකක් — වීඩියෝ කෝල් සහ ඔන්ලයින් පන්තිවලට හොඳයි.",
    },
    includes: {
      en: ["Phone stand", "Light"],
      si: ["ෆෝන් ස්ටෑන්ඩ්", "ලයිට්"],
    },
  },
  {
    slug: "hostel-food-hamper",
    image: "/images/products/hostel-food-hamper-v2.jpg",
    category: "student",
    occasions: ["thankYou"],
    priceUsd: fromLkr(7500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Hostel Food Hamper",
      si: "හොස්ටල් කෑම හැම්පරය",
    },
    description: {
      en: "Rice, dhal, noodles and milk powder — real food for the hostel kitchen.",
      si: "සහල්, පරිප්පු, නූඩ්ල්ස් සහ කිරිපිටි — හොස්ටල් කුස්සියට ඇත්ත කෑම.",
    },
    includes: {
      en: ["Rice", "Dhal", "Noodles", "Milk powder"],
      si: ["සහල්", "පරිප්පු", "නූඩ්ල්ස්", "කිරිපිටි"],
    },
  },
  {
    slug: "for-him-box",
    image: "/images/products/for-him-box-v2.jpg",
    category: "men",
    occasions: ["birthday", "anniversary", "love"],
    priceUsd: fromLkr(15500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    badge: "premium",
    name: {
      en: "For Him Box",
      si: "ඔහුට තෑගි පෙට්ටිය",
    },
    description: {
      en: "A shirt, perfume, a watch and chocolate — a complete gift for the special man in your life.",
      si: "කමිසයක්, සුවඳ විලවුන්, ඔරලෝසුවක් සහ චොකලට් — ඔබේ ජීවිතයේ විශේෂ පිරිමියාට සම්පූර්ණ තෑග්ගක්.",
    },
    includes: {
      en: ["Shirt", "Perfume", "Watch", "Chocolate"],
      si: ["කමිසයක්", "සුවඳ විලවුන්", "ඔරලෝසුවක්", "චොකලට්"],
    },
  },
  {
    slug: "branded-shirt",
    image: "/images/products/branded-shirt-v2.jpg",
    category: "men",
    occasions: ["birthday"],
    priceUsd: fromLkr(5500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Branded Shirt",
      si: "බ්‍රෑන්ඩඩ් කමිසය",
    },
    description: {
      en: "A branded shirt — tell us the size on WhatsApp.",
      si: "බ්‍රෑන්ඩඩ් කමිසයක් — ප්‍රමාණය WhatsApp එකෙන් කියන්න.",
    },
    includes: {
      en: ["Branded shirt (your size)", "Gift wrapping & message card"],
      si: ["බ්‍රෑන්ඩඩ් කමිසය (ඔබේ ප්‍රමාණයට)", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "tshirt-cap-set",
    image: "/images/products/tshirt-cap-set-v2.jpg",
    category: "men",
    occasions: ["birthday"],
    priceUsd: fromLkr(4200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "T-Shirt + Cap Set",
      si: "ටී-ෂර්ට් + කැප් කට්ටලය",
    },
    description: {
      en: "A casual T-shirt and a matching cap.",
      si: "කැෂුවල් ටී-ෂර්ට් එකක් සහ ගැළපෙන කැප් එකක්.",
    },
    includes: {
      en: ["T-shirt (your size)", "Cap"],
      si: ["ටී-ෂර්ට් (ඔබේ ප්‍රමාණයට)", "කැප් එකක්"],
    },
  },
  {
    slug: "leather-wallet",
    image: "/images/products/leather-wallet-v2.jpg",
    category: "men",
    occasions: ["birthday", "thankYou"],
    priceUsd: fromLkr(4800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Leather Wallet",
      si: "සම් පසුම්බිය",
    },
    description: {
      en: "A genuine leather wallet he’ll carry every day.",
      si: "ඔහු හැමදාම පාවිච්චි කරන සැබෑ සම් පසුම්බියක්.",
    },
    includes: {
      en: ["Leather wallet", "Gift wrapping & message card"],
      si: ["සම් පසුම්බිය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "belt-wallet-combo",
    image: "/images/products/belt-wallet-combo-v2.jpg",
    category: "men",
    occasions: ["birthday", "anniversary"],
    priceUsd: fromLkr(6500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Belt + Wallet Combo",
      si: "බෙල්ට් + පසුම්බි කොම්බෝ",
    },
    description: {
      en: "A matching belt and wallet set.",
      si: "ගැළපෙන බෙල්ට් එකක් සහ පසුම්බියක්.",
    },
    includes: {
      en: ["Belt", "Wallet", "Gift wrapping & message card"],
      si: ["බෙල්ට් එක", "පසුම්බිය", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "mens-perfume",
    image: "/images/products/mens-perfume-v2.jpg",
    category: "men",
    occasions: ["birthday", "anniversary", "love"],
    priceUsd: fromLkr(8500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Men’s Branded Perfume",
      si: "පිරිමි බ්‍රෑන්ඩඩ් සුවඳ විලවුන්",
    },
    description: {
      en: "A branded men’s fragrance.",
      si: "බ්‍රෑන්ඩඩ් පිරිමි සුවඳ විලවුනක්.",
    },
    includes: {
      en: ["Men’s perfume", "Gift wrapping & message card"],
      si: ["පිරිමි සුවඳ විලවුන්", "තෑගි ඔතා දීම සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "mens-watch",
    image: "/images/products/mens-watch-v2.jpg",
    category: "men",
    occasions: ["birthday", "anniversary"],
    priceUsd: fromLkr(12000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Men’s Watch",
      si: "පිරිමි ඔරලෝසුව",
    },
    description: {
      en: "A classic men’s watch, presented in a gift box.",
      si: "තෑගි පෙට්ටියක දමා දෙන ක්ලැසික් පිරිමි ඔරලෝසුවක්.",
    },
    includes: {
      en: ["Men’s watch", "Gift box & message card"],
      si: ["පිරිමි ඔරලෝසුව", "තෑගි පෙට්ටිය සහ පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "sunglasses",
    image: "/images/products/sunglasses-v2.jpg",
    category: "men",
    occasions: ["birthday"],
    priceUsd: fromLkr(5200),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Sunglasses",
      si: "අව් කණ්ණාඩි",
    },
    description: {
      en: "Stylish sunglasses with a case.",
      si: "කවරයක් සමඟ ලස්සන අව් කණ්ණාඩි.",
    },
    includes: {
      en: ["Sunglasses", "Case"],
      si: ["අව් කණ්ණාඩි", "කවරය"],
    },
  },
  {
    slug: "sneakers-gift",
    image: "/images/products/sneakers-gift-v2.jpg",
    category: "men",
    occasions: ["birthday"],
    priceUsd: fromLkr(9500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Sneakers Gift",
      si: "ස්නීකර්ස් තෑග්ග",
    },
    description: {
      en: "A pair of sneakers — tell us the size on WhatsApp.",
      si: "ස්නීකර්ස් සපත්තු ජෝඩුවක් — ප්‍රමාණය WhatsApp එකෙන් කියන්න.",
    },
    includes: {
      en: ["Sneakers (your size)", "Message card"],
      si: ["ස්නීකර්ස් (ඔබේ ප්‍රමාණයට)", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "grooming-kit",
    image: "/images/products/grooming-kit-v2.jpg",
    category: "men",
    occasions: ["birthday", "thankYou"],
    priceUsd: fromLkr(7800),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Grooming Kit",
      si: "ග්‍රූමිං කට්ටලය",
    },
    description: {
      en: "A trimmer, face wash and perfume — everything to look sharp.",
      si: "ට්‍රිමර් එකක්, ෆේස් වොෂ් සහ සුවඳ විලවුන් — පිළිවෙළට ඉන්න ඕන හැමදේම.",
    },
    includes: {
      en: ["Trimmer", "Face wash", "Perfume"],
      si: ["ට්‍රිමර්", "ෆේස් වොෂ්", "සුවඳ විලවුන්"],
    },
  },
  {
    slug: "gym-box",
    image: "/images/products/gym-box.jpg",
    category: "men",
    occasions: ["birthday"],
    priceUsd: fromLkr(11000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Gym Box",
      si: "ජිම් පෙට්ටිය",
    },
    description: {
      en: "For the fitness fan — protein, a shaker and a gym towel.",
      si: "ව්‍යායාමයට කැමති කෙනාට — ප්‍රෝටීන්, ෂේකර් එකක් සහ ජිම් තුවායක්.",
    },
    includes: {
      en: ["Protein", "Shaker", "Towel"],
      si: ["ප්‍රෝටීන්", "ෂේකර්", "තුවාය"],
    },
  },
  {
    slug: "beer-wine-hamper",
    image: "/images/products/beer-wine-hamper-v2.jpg",
    category: "men",
    occasions: ["birthday", "congratulations"],
    priceUsd: fromLkr(6500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Beer / Wine Hamper",
      si: "බියර් / වයින් හැම්පරය",
    },
    description: {
      en: "A hamper of beer or wine to celebrate. Delivered only to recipients aged 21 or over.",
      si: "සමරන්න බියර් හෝ වයින් හැම්පරයක්. භාර දෙන්නේ වයස අවුරුදු 21ට වැඩි අයට පමණයි.",
    },
    includes: {
      en: ["Beer or wine (your choice)", "Recipient must be 21+"],
      si: ["බියර් හෝ වයින් (ඔබේ කැමැත්තට)", "ලබන්නාට වයස 21+ විය යුතුයි"],
    },
  },
  {
    slug: "tool-kit-gift",
    image: "/images/products/tool-kit-gift-v2.jpg",
    category: "men",
    occasions: ["birthday", "thankYou"],
    priceUsd: fromLkr(5000),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Tool Kit Gift",
      si: "ටූල් කිට් තෑග්ග",
    },
    description: {
      en: "A handy tool kit for jobs around the house.",
      si: "ගෙදර වැඩවලට පහසු ටූල් කට්ටලයක්.",
    },
    includes: {
      en: ["Tool kit", "Message card"],
      si: ["ටූල් කට්ටලය", "පණිවිඩ කාඩ්පත"],
    },
  },
  {
    slug: "car-freshener-key-tag",
    image: "/images/products/car-freshener-key-tag-v2.jpg",
    category: "men",
    occasions: ["thankYou"],
    priceUsd: fromLkr(2500),
    rating: 0,
    reviewCount: 0,
    sameDay: false,
    name: {
      en: "Car Air Freshener + Key Tag",
      si: "කාර් එයාර් ෆ්‍රෙෂ්නර් + යතුරු ටැග්",
    },
    description: {
      en: "A car air freshener and a key tag — a small gift for the driver.",
      si: "කාර් එයාර් ෆ්‍රෙෂ්නර් එකක් සහ යතුරු ටැග් එකක් — රියදුරාට පුංචි තෑග්ගක්.",
    },
    includes: {
      en: ["Car air freshener", "Key tag"],
      si: ["කාර් එයාර් ෆ්‍රෙෂ්නර්", "යතුරු ටැග්"],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const sharedOccasion = products.filter(
    (item) =>
      item.slug !== product.slug &&
      item.category !== product.category &&
      item.occasions.some((occasion) => product.occasions.includes(occasion)),
  );
  return [...sameCategory, ...sharedOccasion].slice(0, limit);
}

export function countByOccasion(occasion: OccasionId): number {
  return products.filter((product) => product.occasions.includes(occasion)).length;
}

export function isCategoryId(value: string | null): value is CategoryId {
  return value !== null && (categoryIds as readonly string[]).includes(value);
}

export function isOccasionId(value: string | null): value is OccasionId {
  return value !== null && (occasionIds as readonly string[]).includes(value);
}
