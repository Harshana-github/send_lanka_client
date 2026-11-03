import type { Localized } from "@/i18n/config";
import { LKR_PER_USD } from "@/lib/currency";

export const categoryIds = [
  "baby",
  "cakes",
  "flowers",
  "chocolates",
  "giftBoxes",
  "teddy",
  "combos",
  "essentials",
] as const;

export type CategoryId = (typeof categoryIds)[number];

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
  badge?: Badge;
  name: Localized;
  description: Localized;
  includes: Localized<string[]>;
};

export const categoryImages: Record<CategoryId, string> = {
  baby: "/images/products/baby-milestone-cards.jpg",
  cakes: "/images/products/chocolate-fudge-cake.jpg",
  flowers: "/images/products/red-rose-bouquet.jpg",
  chocolates: "/images/products/luxury-chocolate-box.jpg",
  giftBoxes: "/images/products/signature-gift-box.jpg",
  teddy: "/images/products/cuddly-teddy-bear.jpg",
  combos: "/images/products/celebration-gift-hamper.jpg",
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
    category: "combos",
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
    category: "combos",
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
    category: "combos",
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
