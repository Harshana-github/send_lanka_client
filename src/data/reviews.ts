/**
 * Customer reviews.
 *
 * Every review is saved as "pending" and only "approved" reviews are shown publicly.
 * Until the admin panel exists, the approved list below is sample data; new reviews are kept
 * in the browser (see `store/reviewsSlice`). With the backend, these become:
 *   POST /api/reviews                         -> create (always pending)
 *   GET  /api/products/{slug}/reviews         -> approved reviews only
 *   PATCH /api/admin/reviews/{id}             -> approve / reject (admin panel)
 */

export const reviewStatuses = ["pending", "approved", "rejected"] as const;

export type ReviewStatus = (typeof reviewStatuses)[number];

export type Review = {
  id: string;
  productSlug: string;
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  comment: string;
  /** Calendar date in Sri Lanka, "YYYY-MM-DD". */
  createdAt: string;
  status: ReviewStatus;
  /** True when the reviewer's order was found — set by the backend. */
  verified?: boolean;
};

export const REVIEW_LIMITS = { name: 40, comment: 500 } as const;

type Sample = [slug: string, rating: Review["rating"], name: string, comment: string, createdAt: string];

const samples: Sample[] = [
  ["chocolate-fudge-cake", 5, "Dilani R.", "Sent this for Amma’s birthday from Melbourne. Delivered right on time and she said it was the best chocolate cake she’s had!", "2026-10-26"],
  ["chocolate-fudge-cake", 5, "කසුන් පී.", "අම්මාගේ උපන්දිනයට යැව්වා. කේක් එක හරිම රසයි, හරියටම නියමිත වේලාවට ලැබුණා. ස්තූතියි!", "2026-10-18"],
  ["chocolate-fudge-cake", 4, "Ruwan S.", "Very rich and fresh. The name on the cake was spelled perfectly.", "2026-10-02"],
  ["red-rose-bouquet", 5, "Sachini & Ravi", "Beautiful roses for our anniversary — fresh, and the delivery photo was a lovely touch.", "2026-10-29"],
  ["red-rose-bouquet", 5, "නදීෂා ජී.", "මල් හරිම ලස්සනයි, නැවුම්. මගේ බිරිඳ ගොඩක් සතුටු වුණා.", "2026-10-21"],
  ["midnight-surprise", 5, "Tharindu W.", "They arrived exactly at midnight with the cake and balloons. My sister was so surprised. Worth every rupee.", "2026-10-30"],
  ["midnight-surprise", 5, "හසිනි එම්.", "මධ්‍යම රාත්‍රියේ හරියටම 12ට ආවා. වීඩියෝ එකත් එව්වා. හරිම විශ්වාසවන්ත සේවාවක්!", "2026-10-15"],
  ["cuddly-teddy-bear", 5, "Amaya F.", "So soft and bigger than I expected. My niece hasn’t let go of it since.", "2026-10-24"],
  ["cuddly-teddy-bear", 4, "Isuru K.", "Lovely teddy, nicely wrapped. Arrived a day early, which was fine.", "2026-09-30"],
  ["family-grocery-pack", 5, "Kasun P.", "I order this every month for my parents. Good brands, everything well packed, and the WhatsApp updates give me peace of mind.", "2026-10-28"],
  ["family-grocery-pack", 5, "චමිලා ඩී.", "දෙමාපියන්ට මාසෙටම ඕන දේවල් එකපාර ලැබෙනවා. ගොඩක් පහසුයි.", "2026-10-11"],
  ["luxury-chocolate-box", 5, "Nirosha L.", "Elegant box and delicious chocolates. A perfect thank-you gift.", "2026-10-19"],
  ["garden-bliss-bouquet", 5, "Shehan A.", "The bouquet looked even better than the photo. Mum loved the colours.", "2026-10-22"],
  ["rainbow-celebration-cake", 5, "Piumi H.", "The kids went crazy for the rainbow layers! Fresh and not too sweet.", "2026-10-25"],
  ["white-chocolate-drip-cake", 4, "Dinesh J.", "Looked stunning and tasted great. Would order again.", "2026-10-20"],
  ["signature-gift-box", 5, "Malsha N.", "Thoughtful mix of gifts, beautifully presented. My grandmother loved the tea.", "2026-10-17"],
  ["celebration-gift-hamper", 5, "Lahiru B.", "Huge hamper, everything was fresh. Made my brother’s graduation day special.", "2026-10-27"],
  ["mobile-recharge", 5, "රවීන් එස්.", "විනාඩි දෙකෙන් රීලෝඩ් එක ලැබුණා. ඉතා පහසුයි.", "2026-10-31"],
  ["mobile-recharge", 5, "Anjali T.", "Instant top-up for my dad’s phone. Super easy.", "2026-10-23"],
  ["pastel-blush-bouquet", 5, "Hiruni W.", "Soft, pretty colours — exactly what I wanted for my mother.", "2026-10-14"],
  ["artisan-truffle-collection", 5, "Kavinda R.", "Rich, smooth truffles. You can taste the quality.", "2026-10-09"],
  ["sunflower-sunshine-bouquet", 5, "Ishara M.", "Sent these to a friend in hospital. They really brightened her room.", "2026-10-16"],
  ["fresh-fruit-basket", 4, "Pradeep G.", "Good variety and fresh fruit. The mangoes were perfect.", "2026-10-12"],
  ["classic-smart-watch", 5, "Nuwan E.", "Genuine product, well wrapped, and it arrived with the card. My father uses it every day.", "2026-10-08"],
  ["birthday-balloon-combo", 5, "Sanduni P.", "The balloons made the whole room festive. Cake was delicious too.", "2026-10-21"],
  ["pink-tulip-vase", 5, "Gayani K.", "Gorgeous tulips that lasted more than a week.", "2026-10-13"],
  ["cupcake-celebration-box", 5, "Yasas D.", "Cute and tasty cupcakes, perfect for sharing at the office.", "2026-10-10"],
  ["dark-chocolate-gift-pack", 4, "Thilini A.", "The cinnamon bar is amazing. Nice packaging.", "2026-10-07"],
  ["baby-first-birthday-box", 5, "Chathura & Imesha", "We were in Doha for our son’s first birthday. The cake, balloons and name board made the day perfect at home. Thank you!", "2026-10-30"],
  ["baby-video-surprise-box", 5, "සුමුදු ඩී.", "මම ඉතාලියේ. මගේ දුවට මගේ වීඩියෝ එක පෙන්නුවාම එයා හිනා වුණා කියලා බිරිඳ කිව්වා. හරිම වටිනා සේවාවක්.", "2026-10-28"],
  ["baby-family-photo-album", 5, "Nadeesha P.", "Sent our photos on WhatsApp and the album came out beautifully. My mother cried when she saw it.", "2026-10-22"],
  ["baby-hand-foot-print-kit", 5, "Hasara L.", "Easy to use even with a wriggly baby. The frame looks lovely on the wall.", "2026-10-19"],
  ["baby-naming-ceremony-box", 5, "රුවන් සහ දිල්හානි", "නම් තැබීමේ දවසට හරියටම ලැබුණා. සුදු ඇඳුම සහ මල් හරිම ලස්සනයි.", "2026-10-16"],
  ["twin-baby-combo", 5, "Shanika M.", "Finally a gift made for twins! Both of them got their own teddy and cake — no fighting.", "2026-10-25"],
  ["baby-monthly-care-pack", 5, "Kasun J.", "I order this every month for my wife and baby. Always the right size diapers and on time.", "2026-10-29"],
  ["school-first-day-surprise", 5, "අමිල එස්.", "පුතාගේ පාසල් පළමු දවසට බෑග් එක ලැබුණාම එයා හරිම සතුටු වුණා.", "2026-10-12"],
  ["baby-milestone-cards", 5, "Tharushi K.", "Cute designs and having them in Sinhala too is a lovely touch.", "2026-10-21"],
  ["baby-horoscope-name-booklet", 5, "Prasad W.", "Sent the birth details on WhatsApp and received a neat booklet with good name suggestions.", "2026-10-18"],
  ["floral-anniversary-cake", 5, "Ashan & Nethmi", "A showstopper for our parents’ 40th anniversary. Everyone asked where it was from.", "2026-10-05"],
];

export const approvedReviews: Review[] = samples.map(([productSlug, rating, name, comment, createdAt], index) => ({
  id: `RV-S${String(index + 1).padStart(3, "0")}`,
  productSlug,
  rating,
  name,
  comment,
  createdAt,
  status: "approved",
  verified: true,
}));

export function getApprovedReviews(slug: string): Review[] {
  return approvedReviews
    .filter((review) => review.productSlug === slug && review.status === "approved")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
