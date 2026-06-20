// ============================================================
// מאגר הנתונים של הטיול — מקור האמת לכל המסכים
// (Asaf + Bat (12) • תאילנד • 3–17.7.2026)
// ============================================================

export type LatLng = { lat: number; lng: number };

export type ItemType =
  | "flight"
  | "ferry"
  | "hotel"
  | "activity"
  | "transfer"
  | "free";

export type ItineraryItem = {
  id: string;
  time?: string;
  title: string;
  type: ItemType;
  place?: string;
  coords?: LatLng;
  note?: string;
  priceILS?: number;
  priceUSD?: number;
};

export type TripDay = {
  date: string; // YYYY-MM-DD
  weekday: string; // עברית
  cityId: DestId;
  label: string;
  items: ItineraryItem[];
};

export type DestId = "bangkok" | "kohtao" | "kohsamui";

export type Destination = {
  id: DestId;
  name: string;
  nameEn: string;
  emoji: string;
  coords: LatLng;
  tagline: string;
  history: string;
  funFacts: string[];
  tips: string[];
  thingsToDo: string[];
};

export type Hotel = {
  id: string;
  name: string;
  region: string;
  cityId: DestId;
  checkIn: string;
  checkOut: string;
  nights: number;
  coords: LatLng;
  status: "booked" | "upcoming";
  note?: string;
};

export type Flight = {
  id: string;
  number: string;
  airline: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  date: string;
  depart: string;
  arrive: string;
  status: "booked" | "tobook";
  note?: string;
};

export type Attraction = {
  id: string;
  title: string;
  cityId: DestId;
  emoji: string;
  note?: string;
};

export type EmergencyContact = {
  id: string;
  label: string;
  phone: string;
  group: "thai" | "embassy" | "hotel" | "diving" | "family";
  note?: string;
};

export type DocItem = {
  id: string;
  title: string;
  category: "passport" | "visa" | "insurance" | "booking" | "health" | "other";
  ref?: string;
  hint: string;
};

// ------------------------------------------------------------
// מטא של הטיול
// ------------------------------------------------------------
export const TRIP = {
  title: "תאילנד 2026",
  travelers: "אסף + הבת (12)",
  startDate: "2026-07-03",
  endDate: "2026-07-17",
  totalDays: 15,
};

// ------------------------------------------------------------
// יעדים (מדריכים)
// ------------------------------------------------------------
export const DESTINATIONS: Destination[] = [
  {
    id: "bangkok",
    name: "בַּנְגְקוֹק",
    nameEn: "Bangkok",
    emoji: "🛕",
    coords: { lat: 13.7563, lng: 100.5018 },
    tagline: "עיר הבירה הסואנת — מקדשים, שווקים ואוכל רחוב",
    history:
      "בנגקוק הוקמה כבירת סיאם בשנת 1782 על ידי המלך ראמה הראשון. השם המקומי שלה, קְרוּנְג תֵפ, הוא קיצור של אחד משמות הערים הארוכים בעולם. העיר נבנתה סביב נהר הצַ'או פְרָאיָה, שעדיין מפלח אותה ומלא בסירות, מעבורות ומקדשים זוהבים על גדותיו.",
    funFacts: [
      "השם הרשמי המלא של בנגקוק מורכב מ-169 אותיות — שיא גינס.",
      "יש בעיר יותר מ-400 מקדשים בודהיסטיים (וואט).",
      "טוּק-טוּק הם המוניות בעלות שלושת הגלגלים — מהירות, רועשות וכיף.",
    ],
    tips: [
      "במקדשים צריך כתפיים וברכיים מכוסות — קחו בגד קל לכיסוי.",
      "מתמקחים בשווקים בנימוס ובחיוך — זה חלק מהכיף.",
      "שתו רק מים מבקבוק סגור, וקחו ז'קט דק לקניונים הממוזגים.",
    ],
    thingsToDo: [
      "הארמון המלכותי הגדול ומקדש הבודהה הירוק",
      "וואט אָרוּן — מקדש השחר על הנהר",
      "שוק הסופ\"ש צָ'אטוּצַ'אק",
      "שוק הלילה Jodd Fairs",
      "שייט על נהר הצ'או פראיה",
    ],
  },
  {
    id: "kohtao",
    name: "קוֹ טָאוֹ",
    nameEn: "Koh Tao",
    emoji: "🐢",
    coords: { lat: 10.0956, lng: 99.8404 },
    tagline: "אי הצבים — בירת הצלילה של תאילנד",
    history:
      "קו טאו פירושו 'אי הצב' בתאית, על שם צבי הים שמטילים ביצים על חופיו. עד שנות ה-80 היה האי כמעט ריק מאדם; היום הוא אחד המקומות הזולים והפופולריים בעולם ללימודי צלילה, עם שוניות אלמוגים צבעוניות ממש ליד החוף.",
    funFacts: [
      "קו טאו הוא מהמקומות בהם מַסמיכים הכי הרבה צוללנים בעולם בכל שנה.",
      "השונית כאן מלאה בדגי ליצן (נמו), צבי ים ולוטרים.",
      "האי הסמוך קוֹ נָאנְג יוּאן מחבר שלושה איים קטנים בלשון חול לבן.",
    ],
    tips: [
      "מורחים קרם הגנה ידידותי לשונית כדי לא לפגוע באלמוגים.",
      "שותים הרבה מים ונחים בין צלילות — האוזניים צריכות זמן.",
      "נעלי ים מגנות מהאלמוגים והקיפודים בכניסה לים.",
    ],
    thingsToDo: [
      "קורס צלילה Open Water SSI ב-Onyx Divers",
      "שנורקלינג בקו נאנג יואן",
      "תצפית השקיעה מ-John-Suwan Viewpoint",
      "סירת 5 איים מסביב לקו טאו",
    ],
  },
  {
    id: "kohsamui",
    name: "קוֹ סָמוּי",
    nameEn: "Koh Samui",
    emoji: "🥥",
    coords: { lat: 9.512, lng: 100.0136 },
    tagline: "אי הקוקוס — חופים, פילים ובודהה ענק",
    history:
      "קו סמוי הוא האי השני בגודלו בתאילנד. במשך מאות שנים התפרנסו תושביו ממטעי קוקוס, ועד שנות ה-70 הגיעו אליו רק בסירות דייגים. היום הוא יעד נופש מפורסם עם חופים לבנים, מפלים בג'ונגל ופסל בודהה זהוב בגובה 12 מטר ששומר על האי.",
    funFacts: [
      "באי מיליוני עצי קוקוס — ויש שיירות קופים שמאומנים לקטוף אותם!",
      "פסל ה-Big Buddha נראה כבר מהמטוס בנחיתה.",
      "כפר הדייגים בּוֹפוּט שומר על בתי עץ סיניים עתיקים.",
    ],
    tips: [
      "במקדשים מורידים נעליים ומתלבשים בצניעות.",
      "הים יכול להיות סוער בעונה — שומעים להוראות מפעילי הסירות.",
      "מתמקחים על מחיר הטוק-טוק לפני שעולים.",
    ],
    thingsToDo: [
      "מקדש ה-Big Buddha",
      "מפל Na Muang",
      "מקלט הפילים Elephant Jungle Sanctuary",
      "סיור לאי החזירים (Pig Island)",
      "כפר הדייגים Fisherman's Village",
    ],
  },
];

// ------------------------------------------------------------
// טיסות
// ------------------------------------------------------------
export const FLIGHTS: Flight[] = [
  {
    id: "ey600",
    number: "EY 600",
    airline: "Etihad Airways",
    fromCode: "TLV",
    fromCity: "תל אביב",
    toCode: "BKK",
    toCity: "בנגקוק",
    date: "2026-07-03",
    depart: "01:20",
    arrive: "18:10",
    status: "booked",
    note: "דרך אבו דאבי",
  },
  {
    id: "bkk-usm",
    number: "טיסה פנימית",
    airline: "לבחירה (Bangkok Airways / AirAsia)",
    fromCode: "BKK",
    fromCity: "בנגקוק",
    toCode: "USM",
    toCity: "קו סמוי",
    date: "2026-07-04",
    depart: "—",
    arrive: "—",
    status: "tobook",
    note: "המשך במעבורת לקו טאו",
  },
  {
    id: "usm-bkk",
    number: "טיסה פנימית",
    airline: "לבחירה (Bangkok Airways / AirAsia)",
    fromCode: "USM",
    fromCity: "קו סמוי",
    toCode: "BKK",
    toCity: "בנגקוק",
    date: "2026-07-14",
    depart: "—",
    arrive: "—",
    status: "tobook",
  },
  {
    id: "ey403",
    number: "EY 403",
    airline: "Etihad Airways",
    fromCode: "BKK",
    fromCity: "בנגקוק",
    toCode: "TLV",
    toCity: "תל אביב",
    date: "2026-07-17",
    depart: "09:15",
    arrive: "16:50",
    status: "booked",
    note: "דרך אבו דאבי",
  },
];

// ------------------------------------------------------------
// מלונות
// ------------------------------------------------------------
export const HOTELS: Hotel[] = [
  {
    id: "park-nine",
    name: "The Park Nine Hotel",
    region: "בנגקוק (ליד שדה התעופה סוּוואנאבּוּמי)",
    cityId: "bangkok",
    checkIn: "2026-07-03",
    checkOut: "2026-07-04",
    nights: 1,
    coords: { lat: 13.696, lng: 100.747 },
    status: "booked",
    note: "לילה ראשון אחרי הנחיתה, קרוב לשדה התעופה",
  },
  {
    id: "sairee",
    name: "Sairee Cottage Resort",
    region: "קו טאו — חוף סָאריי",
    cityId: "kohtao",
    checkIn: "2026-07-04",
    checkOut: "2026-07-09",
    nights: 5,
    coords: { lat: 10.099, lng: 99.838 },
    status: "booked",
    note: "ליד מועדון הצלילה Onyx Divers",
  },
  {
    id: "peace-garden",
    name: "Peace Garden Resort",
    region: "קו סמוי",
    cityId: "kohsamui",
    checkIn: "2026-07-09",
    checkOut: "2026-07-14",
    nights: 5,
    coords: { lat: 9.512, lng: 100.04 },
    status: "booked",
  },
  {
    id: "radisson",
    name: "Radisson Blu Plaza Bangkok",
    region: "בנגקוק — סוּקוּמוויט",
    cityId: "bangkok",
    checkIn: "2026-07-14",
    checkOut: "2026-07-17",
    nights: 3,
    coords: { lat: 13.722, lng: 100.564 },
    status: "booked",
  },
];

// ------------------------------------------------------------
// מסלול יום-יום
// ------------------------------------------------------------
export const ITINERARY: TripDay[] = [
  {
    date: "2026-07-03",
    weekday: "שישי",
    cityId: "bangkok",
    label: "טיסה ונחיתה בבנגקוק",
    items: [
      { id: "d1-1", time: "01:20", title: "טיסה EY 600 · תל אביב → בנגקוק", type: "flight", place: "נתב\"ג", note: "דרך אבו דאבי · נחיתה 18:10" },
      { id: "d1-2", time: "18:10", title: "נחיתה בשדה התעופה סוּוואנאבּוּמי", type: "flight", place: "BKK", coords: { lat: 13.69, lng: 100.75 } },
      { id: "d1-3", title: "צ'ק-אין · The Park Nine Hotel", type: "hotel", place: "בנגקוק", coords: { lat: 13.696, lng: 100.747 } },
    ],
  },
  {
    date: "2026-07-04",
    weekday: "שבת",
    cityId: "kohtao",
    label: "מעבר לקו טאו",
    items: [
      { id: "d2-1", title: "טיסה פנימית בנגקוק → קו סמוי", type: "flight", place: "BKK → USM", note: "לסגור כרטיס" },
      { id: "d2-2", title: "מעבורת לקו טאו", type: "ferry", place: "קו סמוי → קו טאו" },
      { id: "d2-3", title: "צ'ק-אין · Sairee Cottage Resort", type: "hotel", place: "קו טאו", coords: { lat: 10.099, lng: 99.838 } },
    ],
  },
  {
    date: "2026-07-05",
    weekday: "ראשון",
    cityId: "kohtao",
    label: "קורס צלילה — יום 1",
    items: [
      { id: "d3-1", title: "קורס Open Water SSI · יום 1 (תיאוריה + מים רדודים)", type: "activity", place: "Onyx Divers, קו טאו", coords: { lat: 10.099, lng: 99.84 } },
    ],
  },
  {
    date: "2026-07-06",
    weekday: "שני",
    cityId: "kohtao",
    label: "קורס צלילה — יום 2",
    items: [
      { id: "d4-1", title: "קורס Open Water SSI · יום 2 (צלילות פתוחות)", type: "activity", place: "Onyx Divers, קו טאו", coords: { lat: 10.099, lng: 99.84 } },
    ],
  },
  {
    date: "2026-07-07",
    weekday: "שלישי",
    cityId: "kohtao",
    label: "קורס צלילה — יום 3",
    items: [
      { id: "d5-1", title: "קורס Open Water SSI · יום 3 (צלילות הסמכה)", type: "activity", place: "Onyx Divers, קו טאו", coords: { lat: 10.099, lng: 99.84 } },
    ],
  },
  {
    date: "2026-07-08",
    weekday: "רביעי",
    cityId: "kohtao",
    label: "סיור 5 איים",
    items: [
      { id: "d6-1", time: "10:00", title: "5 Islands Day Trip · קו נאנג יואן", type: "activity", place: "סירה מקו טאו", coords: { lat: 10.1175, lng: 99.8128 }, note: "2 מבוגרים · שנורקלינג + תצפית" },
    ],
  },
  {
    date: "2026-07-09",
    weekday: "חמישי",
    cityId: "kohsamui",
    label: "מעבר לקו סמוי",
    items: [
      { id: "d7-1", time: "15:30", title: "מעבורת Lomprayah · מאה האד → מאנם", type: "ferry", place: "קו טאו → קו סמוי", note: "Express · הגעה 17:30 · הזמנה 30790642", priceILS: 126 },
      { id: "d7-2", title: "צ'ק-אין · Peace Garden Resort", type: "hotel", place: "קו סמוי", coords: { lat: 9.512, lng: 100.04 } },
    ],
  },
  {
    date: "2026-07-10",
    weekday: "שישי",
    cityId: "kohsamui",
    label: "מקלט הפילים",
    items: [
      { id: "d8-1", time: "08:00", title: "Elephant Jungle Sanctuary + איסוף מהמלון", type: "activity", place: "קו סמוי", coords: { lat: 9.49, lng: 99.98 }, note: "חצי יום · 2 מבוגרים", priceUSD: 149.34 },
    ],
  },
  {
    date: "2026-07-11",
    weekday: "שבת",
    cityId: "kohsamui",
    label: "אי החזירים",
    items: [
      { id: "d9-1", time: "10:00", title: "Pig Island · סיור סירת לונגטייל פרטית (4 שעות)", type: "activity", place: "קו סמוי", coords: { lat: 9.42, lng: 100.02 }, note: "שנורקלינג + חזירי האי" },
    ],
  },
  {
    date: "2026-07-12",
    weekday: "ראשון",
    cityId: "kohsamui",
    label: "סיור ג'יפים",
    items: [
      { id: "d10-1", time: "10:30", title: "Mummified Monk · סיור ג'יפ (חצי יום)", type: "activity", place: "קו סמוי", coords: { lat: 9.46, lng: 100.06 }, note: "Big Buddha, מפל ועוד" },
    ],
  },
  {
    date: "2026-07-13",
    weekday: "שני",
    cityId: "kohsamui",
    label: "סדנת בישול תאי",
    items: [
      { id: "d11-1", time: "13:30", title: "Thai Cooking Masterclass (אחה\"צ)", type: "activity", place: "סוראט ת'אני / קו סמוי", coords: { lat: 9.5, lng: 100.0 }, note: "מבוגר 1 + ילד/ה (8–12)" },
    ],
  },
  {
    date: "2026-07-14",
    weekday: "שלישי",
    cityId: "bangkok",
    label: "חזרה לבנגקוק",
    items: [
      { id: "d12-1", title: "טיסה פנימית קו סמוי → בנגקוק", type: "flight", place: "USM → BKK", note: "לסגור כרטיס" },
      { id: "d12-2", title: "צ'ק-אין · Radisson Blu Plaza Bangkok", type: "hotel", place: "בנגקוק", coords: { lat: 13.722, lng: 100.564 } },
    ],
  },
  {
    date: "2026-07-15",
    weekday: "רביעי",
    cityId: "bangkok",
    label: "בנגקוק — יום חופשי",
    items: [
      { id: "d13-1", title: "הארמון המלכותי + וואט אָרוּן", type: "free", place: "בנגקוק", coords: { lat: 13.75, lng: 100.4914 } },
      { id: "d13-2", title: "שוק לילה Jodd Fairs", type: "free", place: "בנגקוק", coords: { lat: 13.7696, lng: 100.5398 } },
    ],
  },
  {
    date: "2026-07-16",
    weekday: "חמישי",
    cityId: "bangkok",
    label: "בנגקוק — יום חופשי",
    items: [
      { id: "d14-1", title: "שוק הסופ\"ש צָ'אטוּצַ'אק / קניות", type: "free", place: "בנגקוק", coords: { lat: 13.7998, lng: 100.5501 } },
      { id: "d14-2", title: "אריזה לקראת הטיסה", type: "free", place: "המלון" },
    ],
  },
  {
    date: "2026-07-17",
    weekday: "שישי",
    cityId: "bangkok",
    label: "טיסה הביתה",
    items: [
      { id: "d15-1", time: "09:15", title: "טיסה EY 403 · בנגקוק → תל אביב", type: "flight", place: "BKK", note: "דרך אבו דאבי · נחיתה 16:50" },
    ],
  },
];

// ------------------------------------------------------------
// אטרקציות (צ'ק-ליסט לילדים)
// ------------------------------------------------------------
export const ATTRACTIONS: Attraction[] = [
  { id: "a1", title: "קורס צלילה Open Water", cityId: "kohtao", emoji: "🤿" },
  { id: "a2", title: "שנורקלינג בקו נאנג יואן", cityId: "kohtao", emoji: "🐠" },
  { id: "a3", title: "תצפית John-Suwan", cityId: "kohtao", emoji: "🌅" },
  { id: "a4", title: "מקלט הפילים", cityId: "kohsamui", emoji: "🐘" },
  { id: "a5", title: "אי החזירים", cityId: "kohsamui", emoji: "🐷" },
  { id: "a6", title: "פסל Big Buddha", cityId: "kohsamui", emoji: "🧘" },
  { id: "a7", title: "מפל Na Muang", cityId: "kohsamui", emoji: "💦" },
  { id: "a8", title: "סדנת בישול תאי", cityId: "kohsamui", emoji: "🍜" },
  { id: "a9", title: "כפר הדייגים בּוֹפוּט", cityId: "kohsamui", emoji: "🏘️" },
  { id: "a10", title: "הארמון המלכותי הגדול", cityId: "bangkok", emoji: "🏰" },
  { id: "a11", title: "וואט אָרוּן (מקדש השחר)", cityId: "bangkok", emoji: "🛕" },
  { id: "a12", title: "שייט בטוק-טוק", cityId: "bangkok", emoji: "🛺" },
  { id: "a13", title: "שוק לילה Jodd Fairs", cityId: "bangkok", emoji: "🍢" },
  { id: "a14", title: "טעימת מנגו עם דביק אורז", cityId: "bangkok", emoji: "🥭" },
];

// ------------------------------------------------------------
// אנשי קשר לחירום
// ------------------------------------------------------------
export const EMERGENCY: EmergencyContact[] = [
  { id: "e1", label: "חירום כללי בתאילנד", phone: "191", group: "thai", note: "משטרה" },
  { id: "e2", label: "מד\"א / אמבולנס", phone: "1669", group: "thai", note: "חירום רפואי" },
  { id: "e3", label: "משטרת התיירים", phone: "1155", group: "thai", note: "אנגלית" },
  { id: "e4", label: "כיבוי אש", phone: "199", group: "thai" },
  { id: "e5", label: "שגרירות ישראל בבנגקוק", phone: "+6622049200", group: "embassy", note: "מרכז ת'אניה, סילום" },
  { id: "e6", label: "מוקד חירום קונסולרי (ישראל)", phone: "+97235303155", group: "embassy", note: "מטה לשכת המצב" },
  { id: "e7", label: "Onyx Divers — מועדון צלילה", phone: "", group: "diving", note: "להשלים מספר מקומי" },
  { id: "e8", label: "DAN — חירום צלילה", phone: "+6628061513", group: "diving", note: "תאונות דקומפרסיה" },
  { id: "e9", label: "The Park Nine Hotel", phone: "", group: "hotel", note: "להשלים מהאישור" },
  { id: "e10", label: "Sairee Cottage Resort", phone: "", group: "hotel", note: "להשלים מהאישור" },
  { id: "e11", label: "Peace Garden Resort", phone: "", group: "hotel", note: "להשלים מהאישור" },
  { id: "e12", label: "Radisson Blu Plaza Bangkok", phone: "+6623028888", group: "hotel" },
];

// ------------------------------------------------------------
// כספת מסמכים
// ------------------------------------------------------------
export const DOCS: DocItem[] = [
  { id: "doc1", title: "דרכון — אסף", category: "passport", hint: "בתוקף 6+ חודשים מהכניסה" },
  { id: "doc2", title: "דרכון — הבת", category: "passport", hint: "ודאו תוקף + אישור הורה אם נדרש" },
  { id: "doc3", title: "פטור מוויזה (עד 30 יום)", category: "visa", hint: "ישראלים פטורים מוויזה לשהות קצרה" },
  { id: "doc4", title: "ביטוח נסיעות", category: "insurance", ref: "מס' פוליסה", hint: "כולל כיסוי צלילה!" },
  { id: "doc5", title: "כרטיסי טיסה EY 600 / EY 403", category: "booking", hint: "ביצוע צ'ק-אין 48 שעות לפני" },
  { id: "doc6", title: "מעבורת Lomprayah", category: "booking", ref: "30790642", hint: "מאה האד → מאנם, 9.7 15:30" },
  { id: "doc7", title: "אישורי מלונות (×4)", category: "booking", hint: "Park Nine · Sairee · Peace Garden · Radisson" },
  { id: "doc8", title: "אישור Elephant Sanctuary", category: "booking", ref: "20260612AP42122", hint: "10.7 08:00 · כולל איסוף" },
  { id: "doc9", title: "תעודת צלילה SSI (אחרי הקורס)", category: "health", hint: "תישמר דיגיטלית באפליקציית SSI" },
  { id: "doc10", title: "כרטיסי אשראי + מזומן בָּאט", category: "other", hint: "צלמו גב הכרטיס לכל מקרה" },
];

// ------------------------------------------------------------
// תקציב — הוצאות ידועות מראש (טעינה ראשונית)
// ------------------------------------------------------------
export type ExpenseCat = "flights" | "hotels" | "activities" | "transport" | "food" | "other";

export const EXPENSE_CATS: { id: ExpenseCat; label: string; emoji: string }[] = [
  { id: "flights", label: "טיסות", emoji: "✈️" },
  { id: "hotels", label: "מלונות", emoji: "🏨" },
  { id: "activities", label: "פעילויות", emoji: "🎟️" },
  { id: "transport", label: "תחבורה", emoji: "🚐" },
  { id: "food", label: "אוכל", emoji: "🍜" },
  { id: "other", label: "שונות", emoji: "🛍️" },
];

export type SeedExpense = { id: string; label: string; cat: ExpenseCat; amountILS: number };

export const SEED_EXPENSES: SeedExpense[] = [
  { id: "x1", label: "מעבורת Lomprayah", cat: "transport", amountILS: 126 },
  { id: "x2", label: "Elephant Jungle Sanctuary", cat: "activities", amountILS: 555 }, // ~$149 → ₪
];

// יעד תקציב כולל (לעריכה)
export const BUDGET_TARGET_ILS = 25000;

// ------------------------------------------------------------
// רשימת ציוד / אריזה (מותאם לטיול: טרופי, צלילה, עונת גשמים, ילדה בת 12)
// ------------------------------------------------------------
export type PackCat = { id: string; label: string; emoji: string; items: string[] };

export const PACKING: PackCat[] = [
  {
    id: "clothes",
    label: "ביגוד",
    emoji: "👕",
    items: [
      "בגדי ים (2–3 לכל אחד)",
      "בגדים קלים ונושמים",
      "ז'קט/קרדיגן דק (מטוס + קניונים ממוזגים)",
      "מעיל גשם דק / פונצ'ו",
      "כובע רחב שוליים",
      "כפכפים + נעלי הליכה",
      "לבוש צנוע למקדשים (כתפיים/ברכיים)",
    ],
  },
  {
    id: "sea",
    label: "ים וצלילה",
    emoji: "🤿",
    items: [
      "נעלי ים (אלמוגים/קיפודים)",
      "מסכת שנורקל אישית",
      "מגבת מהירת ייבוש",
      "קרם הגנה ידידותי לשונית (Reef-safe)",
      "משקפי שמש",
      "שקית אטומה לטלפון (סירות)",
      "תעודת צלילה/לוגבוק (דיגיטלי)",
    ],
  },
  {
    id: "health",
    label: "בריאות ועזרה ראשונה",
    emoji: "💊",
    items: [
      "דוחה יתושים (חשוב בעונת הגשמים)",
      "אפטר-סאן / ג'ל אלוורה",
      "כדורים נגד בחילה (מעבורות/סירות)",
      "תרופות אישיות + מרשמים",
      "פלסטרים וחומר חיטוי",
      "כדורים נגד שלשול + מלחים",
      "מד-חום קטן",
    ],
  },
  {
    id: "tech",
    label: "אלקטרוניקה",
    emoji: "🔌",
    items: [
      "מתאם תקע (תאילנד: Type A/B/C)",
      "סוללת גיבוי (Power Bank)",
      "כבלים + מטענים",
      "אוזניות",
      "כרטיס SIM מקומי / eSIM",
    ],
  },
  {
    id: "docs",
    label: "מסמכים וכסף",
    emoji: "🛂",
    items: [
      "דרכונים (תוקף 6+ חודשים)",
      "עותקי דרכון (נייר + דיגיטלי)",
      "אישורי טיסות ומלונות",
      "פוליסת ביטוח (כולל צלילה)",
      "כרטיסי אשראי + מזומן בָּאט",
      "כרטיסי חירום עם מספרי טלפון",
    ],
  },
  {
    id: "kids",
    label: "לילדה",
    emoji: "🎒",
    items: [
      "משחק/ספר לטיסה הארוכה",
      "בקבוק מים רב-פעמי",
      "חטיפים מהבית",
      "כרית צוואר",
      "בגד חם לטיסה",
    ],
  },
];

// ------------------------------------------------------------
// משחקים — שאלות טריוויה
// ------------------------------------------------------------
export type TriviaQ = {
  q: string;
  options: string[];
  answer: number;
  fact: string;
};

export const TRIVIA: TriviaQ[] = [
  {
    q: "איך אומרים 'שלום' בתאית?",
    options: ["סָוואדִי", "אַריגָאטוֹ", "נָמָסטֵה", "הוֹלָה"],
    answer: 0,
    fact: "אומרים סָוואדִי-קְרָאפּ (גבר) או סָוואדִי-קָה (אישה) עם קידה קלה שנקראת 'וואי'.",
  },
  {
    q: "מה המשמעות של השם 'קו טאו'?",
    options: ["אי הקוף", "אי הצב", "אי הזהב", "אי השמש"],
    answer: 1,
    fact: "צבי ים מטילים ביצים על חופי האי — ולכן הוא 'אי הצב'.",
  },
  {
    q: "מה מטבע התשלום בתאילנד?",
    options: ["דוֹנְג", "רינגיט", "בָּאט", "רוּפּי"],
    answer: 2,
    fact: "הבָּאט (฿) מחולק ל-100 סָטָאנְג. על כל השטרות מופיע דיוקן המלך.",
  },
  {
    q: "איזה בעל חיים ענק שומר על קו סמוי בפסל זהוב?",
    options: ["דרקון", "פיל", "בודהה", "נמר"],
    answer: 2,
    fact: "פסל ה-Big Buddha בגובה 12 מטר נראה כבר מהמטוס בנחיתה.",
  },
  {
    q: "מהי 'טוּק-טוּק'?",
    options: ["מנת אוכל", "מונית תלת-גלגלית", "ריקוד", "מקדש"],
    answer: 1,
    fact: "הטוּק-טוּק קיבל את שמו מקול המנוע הקטן שלה — טוּק-טוּק-טוּק!",
  },
  {
    q: "כמה אותיות יש בשם הרשמי המלא של בנגקוק?",
    options: ["12", "44", "169", "1000"],
    answer: 2,
    fact: "169 אותיות — שיא גינס לשם המקום הארוך בעולם.",
  },
  {
    q: "מה לובשים כשנכנסים למקדש בתאילנד?",
    options: ["בגד ים", "כתפיים וברכיים מכוסות", "כובע", "משקפי שמש"],
    answer: 1,
    fact: "מורידים נעליים ומכסים כתפיים וברכיים — סימן של כבוד.",
  },
  {
    q: "איזה פרי צהוב מתוק אוהבים לאכול עם אורז דביק?",
    options: ["תפוח", "מנגו", "אבטיח", "ענבים"],
    answer: 1,
    fact: "Mango Sticky Rice הוא קינוח תאי מפורסם — מנגו, אורז דביק וחלב קוקוס.",
  },
];

// ------------------------------------------------------------
// משחק 'איך אומרים…?' — מילון תאי
// ------------------------------------------------------------
export type Phrase = { he: string; thai: string; roman: string };

export const PHRASES: Phrase[] = [
  { he: "שלום", thai: "สวัสดี", roman: "sa-wat-dee" },
  { he: "תודה", thai: "ขอบคุณ", roman: "khop-khun" },
  { he: "כן", thai: "ใช่", roman: "chai" },
  { he: "לא", thai: "ไม่", roman: "mai" },
  { he: "טעים!", thai: "อร่อย", roman: "a-roi" },
  { he: "כמה זה עולה?", thai: "เท่าไหร่", roman: "tao-rai" },
  { he: "לא חריף", thai: "ไม่เผ็ด", roman: "mai-phet" },
  { he: "מים", thai: "น้ำ", roman: "nam" },
  { he: "סליחה", thai: "ขอโทษ", roman: "kho-thot" },
  { he: "יפה!", thai: "สวย", roman: "suay" },
];

// ------------------------------------------------------------
// זוגות זיכרון
// ------------------------------------------------------------
export const MEMORY_ICONS = ["🐘", "🐢", "🥥", "🛺", "🛕", "🐠", "🍜", "🐷"];
