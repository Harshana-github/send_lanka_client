import type { Localized } from "@/i18n/config";

export const categoryIds = [
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
      ja: "チョコレートファッジ・バースデーケーキ",
      zh: "巧克力软糖生日蛋糕",
    },
    description: {
      en: "Rich, moist chocolate sponge layered with fudge ganache and finished with a glossy chocolate drip. Baked fresh on the day of delivery.",
      si: "ෆජ් ගනාෂ් තට්ටු සහිත, තෙත් සහ පොහොසත් චොකලට් ස්පොන්ජ් කේක් එකක්, දිලිසෙන චොකලට් ඩ්‍රිප් එකකින් අවසන් කර ඇත. බෙදාහරින දිනයේම නැවුම්ව පුළුස්සනවා.",
      ja: "しっとり濃厚なチョコレートスポンジにファッジガナッシュを重ね、艶やかなチョコレートドリップで仕上げました。お届け当日に焼き上げます。",
      zh: "浓郁湿润的巧克力海绵蛋糕，夹层软糖甘纳许，表面淋上亮泽巧克力酱。送达当天新鲜烘焙。",
    },
    includes: {
      en: ["1 kg chocolate fudge cake", "Personalised name on the cake", "Candles & greeting card"],
      si: ["චොකලට් ෆජ් කේක් කිලෝ 1", "කේක් එකේ නම ලියා දීම", "ඉටිපන්දම් සහ සුබපැතුම් කාඩ්පත"],
      ja: ["チョコレートファッジケーキ 1kg", "ケーキにお名前入れ", "キャンドル & メッセージカード"],
      zh: ["1 公斤巧克力软糖蛋糕", "蛋糕上定制姓名", "蜡烛与贺卡"],
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
      ja: "赤いバラ24本の花束",
      zh: "24 朵红玫瑰花束",
    },
    description: {
      en: "Two dozen velvety red roses, hand-tied with seasonal greens and wrapped in premium paper — the timeless way to say “I love you”.",
      si: "සෘතුමය කොළ සමඟ අතින් බැඳ, උසස් කඩදාසියෙන් ඔතා ඇති වෙල්වට් වැනි රතු රෝස 24ක් — “මම ඔයාට ආදරෙයි” කියන්න හැමදාම ලස්සනම ක්‍රමය.",
      ja: "ビロードのような赤いバラ24本を季節のグリーンと束ね、上質なペーパーでラッピング。「愛してる」を伝える永遠の定番です。",
      zh: "两打天鹅绒般的红玫瑰，搭配时令绿叶手工扎束，以高级包装纸包裹——表达“我爱你”的永恒方式。",
    },
    includes: {
      en: ["24 fresh red roses", "Premium wrapping & ribbon", "Handwritten message card"],
      si: ["නැවුම් රතු රෝස 24ක්", "උසස් ඔතන කඩදාසි සහ රිබන්", "අතින් ලියූ පණිවිඩ කාඩ්පත"],
      ja: ["新鮮な赤いバラ 24本", "高級ラッピング & リボン", "手書きメッセージカード"],
      zh: ["24 朵新鲜红玫瑰", "高级包装与丝带", "手写留言卡"],
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
      ja: "深夜サプライズパッケージ",
      zh: "午夜惊喜套餐",
    },
    description: {
      en: "Be the first to wish them. We arrive at the stroke of midnight with a cake, balloons and flowers — and send you the video of their reaction.",
      si: "මුලින්ම සුබ පතන්නේ ඔබ වෙන්න. හරියටම මධ්‍යම රාත්‍රියේ කේක්, බැලූන් සහ මල් රැගෙන අපි එනවා — ඔවුන්ගේ ප්‍රතිචාරයේ වීඩියෝවක් ඔබට එවනවා.",
      ja: "誰よりも先にお祝いを。午前0時ちょうどにケーキ、風船、花束をお届けし、喜ぶ様子の動画をお送りします。",
      zh: "第一个送上祝福。我们在午夜零点准时带着蛋糕、气球和鲜花到达——并把 TA 惊喜的视频发给您。",
    },
    includes: {
      en: ["1 kg celebration cake", "6 helium balloons & 6 roses", "Delivered 11:30 PM – 12:30 AM"],
      si: ["සැමරුම් කේක් කිලෝ 1", "හීලියම් බැලූන් 6ක් සහ රෝස 6ක්", "ප.ව. 11:30 – පෙ.ව. 12:30 අතර භාර දීම"],
      ja: ["お祝いケーキ 1kg", "ヘリウム風船 6個 & バラ 6本", "23:30〜0:30にお届け"],
      zh: ["1 公斤庆祝蛋糕", "6 个氦气球和 6 朵玫瑰", "23:30–00:30 送达"],
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
      ja: "ふわふわハニーテディベア",
      zh: "软萌蜂蜜泰迪熊",
    },
    description: {
      en: "An extra-soft, huggable 45 cm teddy in honey beige — the perfect companion for someone you miss.",
      si: "ඔබට මතක් වෙන කෙනෙකුට හොඳම සගයා — ඉතා මෘදු, බදාගන්න පුළුවන් සෙ.මී. 45ක මී පැණි පැහැති ටෙඩි බෙයාර් කෙනෙක්.",
      ja: "ハニーベージュのとびきり柔らかい45cmのテディベア。会いたい人へのぴったりのパートナーです。",
      zh: "超柔软、可拥抱的 45 厘米蜂蜜米色泰迪熊——送给思念之人的完美陪伴。",
    },
    includes: {
      en: ["45 cm premium plush teddy", "Satin bow & gift bag", "Message card"],
      si: ["සෙ.මී. 45 උසස් ටෙඩි බෙයාර්", "සැටින් රිබන් සහ තෑගි බෑගය", "පණිවිඩ කාඩ්පත"],
      ja: ["45cm 高級ぬいぐるみ", "サテンリボン & ギフトバッグ", "メッセージカード"],
      zh: ["45 厘米优质毛绒泰迪熊", "缎带蝴蝶结与礼品袋", "留言卡"],
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
      ja: "ファミリー食料品セット",
      zh: "家庭生活用品礼包",
    },
    description: {
      en: "A month’s essentials for the family — rice, dhal, sugar, tea, milk powder, oil and more, delivered straight to their kitchen.",
      si: "පවුලට මාසයකට අවශ්‍ය දෑ — සහල්, පරිප්පු, සීනි, තේ, කිරිපිටි, තෙල් සහ තවත් බොහෝ දේ, කුස්සියටම ගෙනැවිත් දෙනවා.",
      ja: "米、豆、砂糖、紅茶、粉ミルク、油など、家族の1か月分の必需品をキッチンまで直接お届けします。",
      zh: "全家一个月的必需品——大米、扁豆、白糖、茶叶、奶粉、食用油等，直接送到厨房。",
    },
    includes: {
      en: ["10 kg rice, 2 kg dhal, 2 kg sugar", "Milk powder, tea & cooking oil", "Spices, biscuits & soap"],
      si: ["සහල් කි.ග්‍රෑ. 10, පරිප්පු 2, සීනි 2", "කිරිපිටි, තේ සහ පිසීමේ තෙල්", "කුළුබඩු, බිස්කට් සහ සබන්"],
      ja: ["米10kg、豆2kg、砂糖2kg", "粉ミルク、紅茶、食用油", "スパイス、ビスケット、石けん"],
      zh: ["大米 10 公斤、扁豆 2 公斤、白糖 2 公斤", "奶粉、茶叶和食用油", "香料、饼干和香皂"],
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
      ja: "ラグジュアリーチョコレートボックス",
      zh: "奢华巧克力礼盒",
    },
    description: {
      en: "Sixteen hand-finished chocolates — pralines, caramels and truffles — presented in an elegant keepsake box.",
      si: "අලංකාර පෙට්ටියක අසුරා ඇති, අතින් නිම කළ චොකලට් 16ක් — ප්‍රැලීන්, කැරමල් සහ ට්‍රෆල්.",
      ja: "プラリネ、キャラメル、トリュフなど手仕上げのチョコレート16粒を、上品なボックスに詰め合わせました。",
      zh: "16 颗手工精制巧克力——果仁糖、焦糖和松露巧克力，装在典雅的纪念礼盒中。",
    },
    includes: {
      en: ["16 assorted chocolates", "Keepsake gift box", "Message card"],
      si: ["මිශ්‍ර චොකලට් 16ක්", "සිහිවටන තෑගි පෙට්ටිය", "පණිවිඩ කාඩ්පත"],
      ja: ["アソートチョコレート 16粒", "記念ギフトボックス", "メッセージカード"],
      zh: ["16 颗什锦巧克力", "纪念礼盒", "留言卡"],
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
      ja: "ガーデンブリス・ブーケ",
      zh: "花园幸福花束",
    },
    description: {
      en: "A florist’s mix of garden roses, spray roses, thistles and eucalyptus in soft peach and cream tones.",
      si: "මෘදු පීච් සහ ක්‍රීම් පැහැයෙන් යුත් ගාර්ඩන් රෝස, ස්ප්‍රේ රෝස, තිස්ල් සහ යුකැලිප්ටස් මිශ්‍ර කළ මල් කළඹක්.",
      ja: "ガーデンローズ、スプレーローズ、アザミ、ユーカリを柔らかなピーチとクリームの色合いでまとめたフローリストのミックスブーケ。",
      zh: "花艺师精选花园玫瑰、多头玫瑰、蓟花和尤加利，呈现柔和的蜜桃色与奶油色。",
    },
    includes: {
      en: ["20+ premium seasonal stems", "Florist wrapping", "Flower food & care card"],
      si: ["උසස් සෘතුමය මල් 20+", "මල් ශිල්පියාගේ ඔතා දීම", "මල් පෝෂක සහ රැකවරණ කාඩ්පත"],
      ja: ["季節の高級花材 20本以上", "フローリストによるラッピング", "切り花栄養剤 & お手入れカード"],
      zh: ["20 枝以上精选时令花材", "花艺包装", "鲜花营养剂与养护卡"],
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
      ja: "レインボー・セレブレーションケーキ",
      zh: "彩虹庆祝蛋糕",
    },
    description: {
      en: "Six colourful vanilla layers with whipped buttercream and a shower of sprinkles — pure joy in every slice.",
      si: "විප්ඩ් බටර්ක්‍රීම් සහ වර්ණවත් ස්ප්‍රින්කල්ස් සහිත, වැනිලා තට්ටු හයක කේක් එකක් — හැම පෙත්තකම සතුට.",
      ja: "ふんわりバタークリームを挟んだ6層のカラフルなバニラスポンジに、スプリンクルをたっぷり。どこを切っても笑顔になれます。",
      zh: "六层缤纷香草蛋糕，夹打发奶油霜，撒满彩色糖粒——每一口都是快乐。",
    },
    includes: {
      en: ["1 kg six-layer rainbow cake", "Name on the cake", "Candles & card"],
      si: ["තට්ටු හයේ රේන්බෝ කේක් කිලෝ 1", "කේක් එකේ නම", "ඉටිපන්දම් සහ කාඩ්පත"],
      ja: ["6層レインボーケーキ 1kg", "お名前入れ", "キャンドル & カード"],
      zh: ["1 公斤六层彩虹蛋糕", "蛋糕上定制姓名", "蜡烛与贺卡"],
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
      ja: "バニラビーンズ・ドリップケーキ",
      zh: "香草荚淋面蛋糕",
    },
    description: {
      en: "Light vanilla bean sponge with silky Swiss meringue buttercream, crowned with a dark chocolate drip and shavings.",
      si: "සිනිඳු ස්විස් මෙරින්ග් බටර්ක්‍රීම් සහිත සැහැල්ලු වැනිලා ස්පොන්ජ්, ඩාක් චොකලට් ඩ්‍රිප් සහ චොකලට් කෑලිවලින් සරසා ඇත.",
      ja: "軽やかなバニラビーンズスポンジになめらかなスイスメレンゲバタークリーム。ダークチョコのドリップと削りチョコで仕上げました。",
      zh: "轻盈香草荚海绵蛋糕，配丝滑瑞士蛋白霜奶油，顶部淋上黑巧克力酱并撒上巧克力碎。",
    },
    includes: {
      en: ["1.2 kg drip cake", "Gold topper of your choice", "Candles & card"],
      si: ["ඩ්‍රිප් කේක් කි.ග්‍රෑ. 1.2", "ඔබ කැමති රන්වන් ටොපර් එකක්", "ඉටිපන්දම් සහ කාඩ්පත"],
      ja: ["ドリップケーキ 1.2kg", "お好きなゴールドトッパー", "キャンドル & カード"],
      zh: ["1.2 公斤淋面蛋糕", "可选金色蛋糕插牌", "蜡烛与贺卡"],
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
      ja: "SENDLANKA シグネチャーギフトボックス",
      zh: "SENDLANKA 招牌礼盒",
    },
    description: {
      en: "Our most-loved curated box: Ceylon tea, chocolates, a scented candle and a mini bouquet, finished with a satin bow.",
      si: "අපේ වඩාත්ම ජනප්‍රිය තෑගි පෙට්ටිය: ලංකා තේ, චොකලට්, සුවඳැති ඉටිපන්දමක් සහ කුඩා මල් කළඹක්, සැටින් රිබනයකින් අවසන් කර ඇත.",
      ja: "一番人気の詰め合わせ：セイロンティー、チョコレート、アロマキャンドル、ミニブーケをサテンリボンで仕上げました。",
      zh: "最受欢迎的精选礼盒：锡兰红茶、巧克力、香薰蜡烛和迷你花束，以缎带蝴蝶结点缀。",
    },
    includes: {
      en: ["Premium Ceylon tea & chocolates", "Scented soy candle", "Mini bouquet & card"],
      si: ["උසස් ලංකා තේ සහ චොකලට්", "සුවඳැති සෝයා ඉටිපන්දම", "කුඩා මල් කළඹ සහ කාඩ්පත"],
      ja: ["高級セイロンティー & チョコレート", "アロマソイキャンドル", "ミニブーケ & カード"],
      zh: ["优质锡兰红茶与巧克力", "香薰大豆蜡烛", "迷你花束与贺卡"],
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
      ja: "セレブレーション・ギフトハンパー",
      zh: "庆典礼品篮",
    },
    description: {
      en: "A generous hamper of wrapped surprises — cake, chocolates, roses and a teddy — for the moments that deserve more.",
      si: "ඊට වඩා දෙයක් ලැබිය යුතු අවස්ථා සඳහා — කේක්, චොකලට්, රෝස මල් සහ ටෙඩි කෙනෙක් ඇතුළු ඔතා ඇති පුදුම දේවල් රැසක්.",
      ja: "ケーキ、チョコレート、バラ、テディベアなど、ラッピングしたサプライズを詰め込んだ贅沢なハンパー。特別な瞬間に。",
      zh: "满满一篮精心包装的惊喜——蛋糕、巧克力、玫瑰和泰迪熊，献给值得更多的时刻。",
    },
    includes: {
      en: ["500 g cake & chocolate box", "12 roses & 30 cm teddy", "Decorated hamper basket"],
      si: ["ග්‍රෑම් 500 කේක් සහ චොකලට් පෙට්ටිය", "රෝස 12ක් සහ සෙ.මී. 30 ටෙඩි", "සරසන ලද හැම්පර් කූඩය"],
      ja: ["ケーキ 500g & チョコレートボックス", "バラ12本 & 30cmテディベア", "デコレーションバスケット"],
      zh: ["500 克蛋糕与巧克力礼盒", "12 朵玫瑰与 30 厘米泰迪熊", "装饰礼品篮"],
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
      ja: "携帯電話チャージ",
      zh: "手机话费充值",
    },
    description: {
      en: "Top up any Dialog, Mobitel, Hutch or Airtel number in Sri Lanka instantly — so they can always call you back.",
      si: "ලංකාවේ ඕනෑම Dialog, Mobitel, Hutch හෝ Airtel අංකයකට ක්ෂණිකව රීලෝඩ් කරන්න — එවිට ඔවුන්ට ඔබට ඕනෑම වේලාවක කතා කරන්න පුළුවන්.",
      ja: "スリランカのDialog、Mobitel、Hutch、Airtelの番号に即時チャージ。いつでも折り返し電話ができます。",
      zh: "即时为斯里兰卡任意 Dialog、Mobitel、Hutch 或 Airtel 号码充值——让 TA 随时都能给您回电。",
    },
    includes: {
      en: ["LKR 3,000 credit", "All Sri Lankan networks", "Delivered within minutes"],
      si: ["රු. 3,000ක රීලෝඩ් එකක්", "ලංකාවේ සියලුම ජාල", "විනාඩි කිහිපයකින් ලැබේ"],
      ja: ["3,000ルピー分のチャージ", "スリランカ全キャリア対応", "数分でチャージ完了"],
      zh: ["3,000 卢比话费", "支持斯里兰卡所有运营商", "几分钟内到账"],
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
      ja: "パステルブラッシュ・ブーケ",
      zh: "粉彩腮红花束",
    },
    description: {
      en: "Soft pink peonies, roses and baby’s breath tied with a linen ribbon — gentle, graceful and perfect for Amma.",
      si: "ලිනන් රිබනයකින් බැඳි මෘදු රෝස පැහැති පියෝනි, රෝස සහ බේබීස් බ්‍රෙත් — මෘදු, අලංකාර, අම්මාට ගැලපෙනම තෑග්ග.",
      ja: "やさしいピンクのシャクヤク、バラ、かすみ草をリネンのリボンで束ねました。上品で、お母さんにぴったりです。",
      zh: "柔粉色芍药、玫瑰和满天星，以亚麻丝带束起——温柔优雅，最适合送给妈妈。",
    },
    includes: {
      en: ["15 pastel stems", "Linen ribbon wrap", "Message card"],
      si: ["පැස්ටල් මල් 15ක්", "ලිනන් රිබන් ඔතා දීම", "පණිවිඩ කාඩ්පත"],
      ja: ["パステル花材 15本", "リネンリボンラッピング", "メッセージカード"],
      zh: ["15 枝粉彩花材", "亚麻丝带包装", "留言卡"],
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
      ja: "アルチザン・トリュフコレクション",
      zh: "手工松露巧克力精选",
    },
    description: {
      en: "Twenty-four cocoa-dusted dark chocolate truffles made in small batches with Sri Lankan cocoa.",
      si: "ලාංකීය කොකෝවා යොදා කුඩා ප්‍රමාණවලින් සාදන, කොකෝවා කුඩු ඉසින ලද ඩාක් චොකලට් ට්‍රෆල් 24ක්.",
      ja: "スリランカ産カカオを使い少量ずつ手作りした、ココアパウダーをまぶしたダークチョコレートトリュフ24粒。",
      zh: "采用斯里兰卡可可小批量手工制作的 24 颗可可粉黑巧克力松露。",
    },
    includes: {
      en: ["24 dark chocolate truffles", "Kraft gift box", "Message card"],
      si: ["ඩාක් චොකලට් ට්‍රෆල් 24ක්", "ක්‍රාෆ්ට් තෑගි පෙට්ටිය", "පණිවිඩ කාඩ්පත"],
      ja: ["ダークチョコトリュフ 24粒", "クラフトギフトボックス", "メッセージカード"],
      zh: ["24 颗黑巧克力松露", "牛皮纸礼盒", "留言卡"],
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
      ja: "ひまわりサンシャイン・ブーケ",
      zh: "向日葵阳光花束",
    },
    description: {
      en: "Bright sunflowers with yellow accents to lift spirits and bring a little sunshine to someone’s day.",
      si: "කෙනෙකුගේ සිත සනසන්නට සහ දවසට හිරු එළියක් ගෙන එන්නට කහ පැහැති මල් සමඟ දීප්තිමත් සූරියකාන්ත මල්.",
      ja: "明るいひまわりに黄色の花を添えて。元気づけたい人の一日に、小さな陽だまりを届けます。",
      zh: "明亮的向日葵搭配黄色花材，为 TA 的一天带来一抹阳光与好心情。",
    },
    includes: {
      en: ["7 sunflowers with fillers", "Eco kraft wrapping", "Message card"],
      si: ["පිරවුම් මල් සහිත සූරියකාන්ත 7ක්", "පරිසර හිතකාමී ඔතා දීම", "පණිවිඩ කාඩ්පත"],
      ja: ["ひまわり7本 & 添え花", "エコクラフトラッピング", "メッセージカード"],
      zh: ["7 朵向日葵及配花", "环保牛皮纸包装", "留言卡"],
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
      ja: "トロピカルフルーツバスケット",
      zh: "热带水果篮",
    },
    description: {
      en: "Hand-picked seasonal fruit — papaya, pineapple, mango, oranges and grapes — arranged in a reusable basket.",
      si: "අතින් තෝරාගත් සෘතුමය පලතුරු — පැපොල්, අන්නාසි, අඹ, දොඩම් සහ මිදි — නැවත භාවිතා කළ හැකි කූඩයක.",
      ja: "パパイヤ、パイナップル、マンゴー、オレンジ、ぶどうなど、厳選した旬のフルーツを再利用できるバスケットに。",
      zh: "精选时令水果——木瓜、菠萝、芒果、橙子和葡萄，装在可重复使用的果篮中。",
    },
    includes: {
      en: ["4–5 kg seasonal fruit", "Reusable woven basket", "Get-well card"],
      si: ["සෘතුමය පලතුරු කි.ග්‍රෑ. 4–5", "නැවත භාවිතා කළ හැකි කූඩය", "සුවපත් වේවා කාඩ්පත"],
      ja: ["旬のフルーツ 4〜5kg", "再利用できる編みかご", "お見舞いカード"],
      zh: ["4–5 公斤时令水果", "可重复使用的编织篮", "慰问卡"],
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
      ja: "クラシック・スマートウォッチ",
      zh: "经典智能手表",
    },
    description: {
      en: "A minimalist smart watch with heart-rate, step tracking and notifications — gift-wrapped with a card.",
      si: "හෘද ස්පන්දනය, පියවර ගණන සහ දැනුම්දීම් සහිත සරල, අලංකාර ස්මාර්ට් ඔරලෝසුවක් — කාඩ්පතක් සමඟ තෑගි ලෙස ඔතා දෙනවා.",
      ja: "心拍数、歩数計測、通知機能を備えたミニマルなスマートウォッチ。ギフトラッピングとカード付き。",
      zh: "极简智能手表，支持心率、步数追踪和消息提醒——附礼品包装和贺卡。",
    },
    includes: {
      en: ["Smart watch with 1-year warranty", "Charger & strap", "Gift wrap & card"],
      si: ["වසරක වගකීම සහිත ස්මාර්ට් ඔරලෝසුව", "චාජරය සහ පටිය", "තෑගි ඔතා දීම සහ කාඩ්පත"],
      ja: ["1年保証付きスマートウォッチ", "充電器 & ストラップ", "ギフトラッピング & カード"],
      zh: ["一年保修智能手表", "充电器与表带", "礼品包装与贺卡"],
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
      ja: "バースデーバルーンセット",
      zh: "生日气球组合",
    },
    description: {
      en: "Fill the room with colour: 20 helium balloons, a 500 g cake and a box of chocolates for an instant party.",
      si: "කාමරය වර්ණවලින් පුරවන්න: හීලියම් බැලූන් 20ක්, ග්‍රෑම් 500 කේක් එකක් සහ චොකලට් පෙට්ටියක් — ක්ෂණික සාදයක්.",
      ja: "ヘリウム風船20個、ケーキ500g、チョコレートボックスで、部屋中をカラフルに。すぐにパーティーが始まります。",
      zh: "用色彩填满房间：20 个氦气球、500 克蛋糕和一盒巧克力，瞬间开启派对。",
    },
    includes: {
      en: ["20 helium balloons", "500 g celebration cake", "Chocolate box & card"],
      si: ["හීලියම් බැලූන් 20ක්", "ග්‍රෑම් 500 සැමරුම් කේක්", "චොකලට් පෙට්ටිය සහ කාඩ්පත"],
      ja: ["ヘリウム風船 20個", "お祝いケーキ 500g", "チョコレートボックス & カード"],
      zh: ["20 个氦气球", "500 克庆祝蛋糕", "巧克力礼盒与贺卡"],
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
      ja: "ピンクチューリップのガラスベース",
      zh: "玻璃花瓶粉色郁金香",
    },
    description: {
      en: "Imported pink tulips arranged in a clear glass vase — a fresh, modern gift that lasts all week.",
      si: "පැහැදිලි වීදුරු බඳුනක සකස් කළ ආනයනික රෝස පැහැති ටියුලිප් — සතියක් පුරා පවතින නැවුම්, නවීන තෑග්ගක්.",
      ja: "輸入ピンクチューリップを透明なガラスベースにアレンジ。1週間楽しめる、フレッシュでモダンなギフトです。",
      zh: "进口粉色郁金香插于透明玻璃花瓶中——清新现代，可观赏一整周。",
    },
    includes: {
      en: ["10 imported tulips", "Glass vase", "Message card"],
      si: ["ආනයනික ටියුලිප් 10ක්", "වීදුරු බඳුන", "පණිවිඩ කාඩ්පත"],
      ja: ["輸入チューリップ 10本", "ガラスベース", "メッセージカード"],
      zh: ["10 枝进口郁金香", "玻璃花瓶", "留言卡"],
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
      ja: "カップケーキ・セレブレーションボックス",
      zh: "纸杯蛋糕庆祝礼盒",
    },
    description: {
      en: "Six vanilla cupcakes swirled with mint buttercream and rainbow sprinkles — easy to share with the whole family.",
      si: "මින්ට් බටර්ක්‍රීම් සහ වර්ණවත් ස්ප්‍රින්කල්ස් සහිත වැනිලා කප්කේක් හයක් — මුළු පවුලටම බෙදාගන්න ලේසියි.",
      ja: "ミントのバタークリームとレインボースプリンクルで飾ったバニラカップケーキ6個。家族みんなで分けやすいサイズです。",
      zh: "六个香草纸杯蛋糕，配薄荷奶油霜和彩虹糖粒——方便全家一起分享。",
    },
    includes: {
      en: ["6 vanilla cupcakes", "Window gift box", "Candles & card"],
      si: ["වැනිලා කප්කේක් 6ක්", "කවුළු සහිත තෑගි පෙට්ටිය", "ඉටිපන්දම් සහ කාඩ්පත"],
      ja: ["バニラカップケーキ 6個", "窓付きギフトボックス", "キャンドル & カード"],
      zh: ["6 个香草纸杯蛋糕", "开窗礼盒", "蜡烛与贺卡"],
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
      ja: "ダークチョコレートギフトパック",
      zh: "黑巧克力礼包",
    },
    description: {
      en: "Four bars of single-origin Sri Lankan dark chocolate with cinnamon, sea salt, orange and pure 70% cocoa.",
      si: "කුරුඳු, මුහුදු ලුණු, දොඩම් සහ පිරිසිදු 70% කොකෝවා සහිත ලාංකීය ඩාක් චොකලට් බාර් හතරක්.",
      ja: "シナモン、シーソルト、オレンジ、カカオ70%の4種。スリランカ産シングルオリジンのダークチョコレートバーです。",
      zh: "四块斯里兰卡单一产地黑巧克力：肉桂、海盐、香橙和 70% 纯可可。",
    },
    includes: {
      en: ["4 × 80 g chocolate bars", "Gift sleeve", "Message card"],
      si: ["ග්‍රෑම් 80 චොකලට් බාර් 4ක්", "තෑගි කවරය", "පණිවිඩ කාඩ්පත"],
      ja: ["チョコレートバー 80g × 4", "ギフトスリーブ", "メッセージカード"],
      zh: ["4 块 80 克巧克力", "礼品封套", "留言卡"],
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
      ja: "3段フラワー・アニバーサリーケーキ",
      zh: "三层花艺纪念日蛋糕",
    },
    description: {
      en: "An elegant three-tier cake decorated with fresh blush roses — made to order for milestone anniversaries.",
      si: "නැවුම් රෝස මල්වලින් සරසන ලද අලංකාර තට්ටු තුනේ කේක් එකක් — විශේෂ සංවත්සර සඳහා ඇණවුම මත සාදනවා.",
      ja: "生のバラで飾ったエレガントな3段ケーキ。節目の記念日のために、ご注文ごとにお作りします。",
      zh: "以新鲜玫瑰装饰的典雅三层蛋糕——为重要纪念日按订单定制。",
    },
    includes: {
      en: ["2.5 kg three-tier cake", "Fresh rose decoration", "Order 48 hours ahead"],
      si: ["තට්ටු තුනේ කේක් කි.ග්‍රෑ. 2.5", "නැවුම් රෝස මල් සැරසිලි", "පැය 48කට පෙර ඇණවුම් කරන්න"],
      ja: ["3段ケーキ 2.5kg", "生バラのデコレーション", "48時間前までにご注文ください"],
      zh: ["2.5 公斤三层蛋糕", "新鲜玫瑰装饰", "需提前 48 小时预订"],
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
