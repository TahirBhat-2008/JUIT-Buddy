// JUIT data utilities: fetch + decode the live timetable & mess menu
// from juittimetable.me (the public JUIT timetable site), with embedded
// snapshots as offline fallback.

export interface TimetableEntry {
  slot: number;
  subject: string;
  subject_code: string;
  faculty: string;
  room: string;
  classType: "L" | "T" | "P";
  color: string;
  isLab: boolean;
  isTutorial: boolean;
  time: string;
}

export type DayKey = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type TimetableData = Partial<Record<DayKey, TimetableEntry[]>>;

export interface MessDay {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface MessMenu {
  lastUpdated: string;
  source: string;
  weekly: MessDay[];
  mealTimes: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  milkDistribution?: {
    girls?: { timing: string; place: string };
    boys?: { timing: string; place: string };
    firstYearBoys?: { timing: string; place: string };
  };
}

const XOR_KEY = 0x78; // derived from the timetable site's app bundle

function decodeBase64ToBytes(s: string): Uint8Array {
  const t = Buffer.from(s, "base64").toString("latin1");
  const bytes = new Uint8Array(t.length);
  for (let i = 0; i < t.length; i++) bytes[i] = t.charCodeAt(i);
  return bytes;
}

function xorBytes(bytes: Uint8Array): Uint8Array {
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ ((XOR_KEY + i) % 0x100);
  return out;
}

function gunzipIfNeeded(bytes: Uint8Array): Buffer {
  // gzip magic: 1f 8b
  if (bytes.length > 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
    const zlib = require("zlib");
    return zlib.gunzipSync(Buffer.from(bytes));
  }
  return Buffer.from(bytes);
}

/** Decode the encrypted batch timetable payload. */
export function decodeTimetablePayload(data: string): TimetableData {
  const out = xorBytes(decodeBase64ToBytes(data));
  const text = Buffer.from(out).toString("utf8");
  const json = JSON.parse(text);
  const key = Object.keys(json)[0];
  return (json[key] as TimetableData) || json;
}

/** Decode the encrypted mess menu payload (XOR + optional gzip). */
export function decodeMessMenuPayload(data: string): MessMenu {
  const out = xorBytes(decodeBase64ToBytes(data));
  const text = gunzipIfNeeded(out).toString("utf8");
  return JSON.parse(text) as MessMenu;
}

const MESS_MENU_URL = "https://juittimetable.me/mess-menu.enc";
const BATCH_URL = (batch: string) =>
  `https://juittimetable.me/batches/batch-${batch}.json?t=${Date.now()}`;

/** Fetch the live mess menu; falls back to the embedded snapshot. */
export async function fetchMessMenu(): Promise<MessMenu> {
  try {
    const res = await fetch(MESS_MENU_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const menu = decodeMessMenuPayload(text.trim());
    if (menu && menu.weekly && menu.weekly.length > 0) return menu;
    throw new Error("Invalid menu payload");
  } catch {
    return FALLBACK_MESS_MENU;
  }
}

import yearSnapshots from "./yearSnapshots.json";

// In-memory timetable cache to avoid repetitive external requests
const timetableCache = new Map<string, TimetableData>();

/** Fetch the live timetable for a batch; falls back to the embedded snapshot. */
export async function fetchTimetable(batch: string): Promise<TimetableData> {
  const cleanBatch = batch.trim().toUpperCase();

  // Return cached result immediately
  if (timetableCache.has(cleanBatch)) {
    return timetableCache.get(cleanBatch)!;
  }

  // Prevent hitting external network for partial / invalid batch codes
  if (cleanBatch.length < 4 || !/^2[3-6]/.test(cleanBatch)) {
    const snaps = yearSnapshots as Record<string, TimetableData>;
    if (cleanBatch.startsWith("25") && snaps["25A11"]) return snaps["25A11"];
    if (cleanBatch.startsWith("24") && snaps["24A11"]) return snaps["24A11"];
    if (cleanBatch.startsWith("23") && snaps["23A11"]) return snaps["23A11"];
    return FALLBACK_TIMETABLE;
  }

  try {
    const res = await fetch(BATCH_URL(cleanBatch), {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json && json.encrypted && json.data) {
      const decoded = decodeTimetablePayload(json.data);
      if (decoded && Object.keys(decoded).length > 0) {
        timetableCache.set(cleanBatch, decoded);
        return decoded;
      }
    }
    throw new Error("Invalid timetable payload");
  } catch {
    const snaps = yearSnapshots as Record<string, TimetableData>;
    if (snaps[cleanBatch]) return snaps[cleanBatch];
    if (cleanBatch.startsWith("25") && snaps["25A11"]) return snaps["25A11"];
    if (cleanBatch.startsWith("24") && snaps["24A11"]) return snaps["24A11"];
    if (cleanBatch.startsWith("23") && snaps["23A11"]) return snaps["23A11"];
    return FALLBACK_TIMETABLE;
  }
}



// ---------- Embedded snapshots (fetched & decoded 07 Sep 2026) ----------

export const FALLBACK_TIMETABLE: TimetableData = {
  MON: [
    { slot: 1, subject: "25B11HS111", subject_code: "25B11HS111", faculty: "JBSW_RS12", room: "LANGULAB", classType: "T", color: "yellow", isLab: false, isTutorial: true, time: "10:00 AM - 10:55 AM" },
    { slot: 3, subject: "25B11PH111", subject_code: "25B11PH111", faculty: "HAZ", room: "CR04", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "12:00 PM - 12:55 PM" },
    { slot: 5, subject: "25B11CI112", subject_code: "25B11CI112", faculty: "FSL", room: "CR15", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "02:00 PM - 02:55 PM" },
    { slot: 6, subject: "25B11EC111", subject_code: "25B11EC111", faculty: "HSL", room: "CR15", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "03:00 PM - 03:55 PM" },
    { slot: 7, subject: "25B11MA113", subject_code: "25B11MA113", faculty: "MDS", room: "CR15", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "04:00 PM - 04:55 PM" },
  ],
  TUE: [
    { slot: 0, subject: "25B11HS111", subject_code: "25B11HS111", faculty: "DLR", room: "CR02", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "09:00 AM - 09:55 AM" },
    { slot: 7, subject: "25B11MA113", subject_code: "25B11MA113", faculty: "MDS", room: "CR01", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "04:00 PM - 04:55 PM" },
    { slot: 6, subject: "25B11CI112", subject_code: "25B11CI112", faculty: "FSL", room: "DLC,CR01", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "03:00 PM - 03:55 PM" },
    { slot: 2, subject: "25B17EC171", subject_code: "25B17EC171", faculty: "HSL", room: "ECL2", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "11:00 AM - 11:55 AM" },
    { slot: 3, subject: "25B17EC171", subject_code: "25B17EC171", faculty: "HSL", room: "ECL2", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "12:00 PM - 12:55 PM" },
  ],
  WED: [
    { slot: 4, subject: "25B11PH111", subject_code: "25B11PH111", faculty: "HAZ", room: "CR04", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "01:00 PM - 01:55 PM" },
    { slot: 6, subject: "25B11EC111", subject_code: "25B11EC111", faculty: "HSL", room: "CR04", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "03:00 PM - 03:55 PM" },
    { slot: 7, subject: "25B11PH111", subject_code: "25B11PH111", faculty: "HAZ", room: "CR17", classType: "T", color: "yellow", isLab: false, isTutorial: true, time: "04:00 PM - 04:55 PM" },
    { slot: 2, subject: "25B11MA113", subject_code: "25B11MA113", faculty: "MAT_RS2", room: "CR04", classType: "T", color: "yellow", isLab: false, isTutorial: true, time: "11:00 AM - 11:55 AM" },
  ],
  THU: [
    { slot: 5, subject: "25B11CI112", subject_code: "25B11CI112", faculty: "FSL", room: "CR17", classType: "T", color: "yellow", isLab: false, isTutorial: true, time: "02:00 PM - 02:55 PM" },
    { slot: 2, subject: "25B17PH171", subject_code: "25B17PH171", faculty: "HAZ", room: "PHLAB2", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "11:00 AM - 11:55 AM" },
    { slot: 3, subject: "25B17PH171", subject_code: "25B17PH171", faculty: "HAZ", room: "PHLAB2", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "12:00 PM - 12:55 PM" },
  ],
  FRI: [
    { slot: 0, subject: "25B11HS111", subject_code: "25B11HS111", faculty: "NJL", room: "GDROOM", classType: "T", color: "yellow", isLab: false, isTutorial: true, time: "09:00 AM - 09:55 AM" },
    { slot: 1, subject: "25B17GE171", subject_code: "25B17GE171", faculty: "ABJ", room: "WORKLAB1", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "10:00 AM - 10:55 AM" },
    { slot: 2, subject: "25B17GE171", subject_code: "25B17GE171", faculty: "ABJ", room: "WORKLAB1", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "11:00 AM - 11:55 AM" },
    { slot: 3, subject: "25B17GE171", subject_code: "25B17GE171", faculty: "ABJ", room: "WORKLAB1", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "12:00 PM - 12:55 PM" },
    { slot: 5, subject: "25B11CI112", subject_code: "25B11CI112", faculty: "FSL", room: "CR08", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "02:00 PM - 02:55 PM" },
    { slot: 6, subject: "25B11PH111", subject_code: "25B11PH111", faculty: "HAZ", room: "CR01", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "03:00 PM - 03:55 PM" },
    { slot: 7, subject: "25B11MA113", subject_code: "25B11MA113", faculty: "MDS", room: "CR02", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "04:00 PM - 04:55 PM" },
  ],
  SAT: [
    { slot: 2, subject: "25B11EC111", subject_code: "25B11EC111", faculty: "HSL", room: "LT2", classType: "L", color: "lightblue", isLab: false, isTutorial: false, time: "11:00 AM - 11:55 AM" },
    { slot: 3, subject: "25B11EC111", subject_code: "25B11EC111", faculty: "RKU", room: "TR3", classType: "T", color: "yellow", isLab: false, isTutorial: true, time: "12:00 PM - 12:55 PM" },
    { slot: 0, subject: "25B17CI172", subject_code: "25B17CI172", faculty: "FSL", room: "CL52", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "09:00 AM - 09:55 AM" },
    { slot: 1, subject: "25B17CI172", subject_code: "25B17CI172", faculty: "FSL", room: "CL52", classType: "P", color: "lightgreen", isLab: true, isTutorial: false, time: "10:00 AM - 10:55 AM" },
  ],
};

export const FALLBACK_MESS_MENU: MessMenu = {
  lastUpdated: "2026-09-01",
  source: "Annapurna - (A) Weekly Menu September - 2026",
  mealTimes: { breakfast: "07:30-09:30", lunch: "12:00-14:00", dinner: "19:30-21:00" },
  weekly: [
    {
      day: "Monday",
      breakfast: "Stuffed Parantha, Plain Curd, Daliya, Sprouts (Chat Masala), Bread, Butter, Jam, Pickle, Tea",
      lunch: "Aaloo Methi, Kadhi Pakoda, Multigrain Tandoori Roti & Plain Chapati, Rice, Salad, Papad, Pear",
      dinner: "Dal Panchranga, Egg Curry / Egg Bhurji, Aaloo Beans, Multigrain Tandoori & Plain Chapati, Rice, Salad, Corn Salad, Sweet Dish - Semiya, Hot & Cold Milk",
    },
    {
      day: "Tuesday",
      breakfast: "Veg. Sandwich, Macaroni (Zero Maida), Cornflakes, Kala Chana Chat, Bread, Butter, Jam, Milk, Tea",
      lunch: "Dal Rajmah, Aaloo Shimla Mirch, Plain Curd, Tandoori Roti & Plain Chapati, Rice, Salad, Apple Royal",
      dinner: "Dal Moong Sabut, Shahi Paneer, Tandoori Roti & Plain Chapati, Rice, Salad, Sweet Dish - Besan Ladoo, Hot & Cold Milk",
    },
    {
      day: "Wednesday",
      breakfast: "Poha, Veg Cutlet, Daliya, Boiled Egg, Sprouts (Chat Masala), Bread, Butter, Jam, Tea",
      lunch: "Choley Bhature, Biryani, Dahi Vada / Pakodi With Sounth Chutney, Onion Salad & Lemon, Banana",
      dinner: "Dal Chana Urad, Mix Veg., Tandoori Roti & Plain Chapati, Matar Pulao, Salad, Green Chutney, Sweet - Amul Butter Scotch / Mango Cup, Hot & Cold Milk",
    },
    {
      day: "Thursday",
      breakfast: "Poori, Aaloo Tomato Sabji, Veg Semiya, Kala Chana Chaat, Bread, Butter, Jam, Cold Coffee, Apple Golden",
      lunch: "Dal Moong Malka, Matar Paneer, Boondi Raita, Tandoori Roti & Plain Chapati, Salad",
      dinner: "Dal Arhar, Soya Chaap Curry, Tandoori Roti & Plain, Rice, Salad, Sweet - Sooji Halwa, Hot & Cold Milk",
    },
    {
      day: "Friday",
      breakfast: "Kachori Dal / Matar, Aaloo Sabji, Maggi (Zero Maida), Boiled Egg, Daliya, Sprouts (Chat Masala), Bread, Butter, Jam, Tea",
      lunch: "Dal Masoor Sabut, Mix Veg., Boondi Raita, Tandoori Roti & Plain Chapati, Rice, Corn Salad, Banana",
      dinner: "Dal Maharani, Kadhai Paneer / Paneer Bhurji, Tandoori Roti & Plain Chapati, Rice, Salad, Sweet Dish - Gulab Jamun, Hot & Cold Milk",
    },
    {
      day: "Saturday",
      breakfast: "Idli, Sambhar, Vada, Upma, Coconut Chutney, Kala Chana Chat, Bread, Butter, Jam, Cold Coffee",
      lunch: "Dal Rajmah, Lauki Tomato, Lassi, Tandoori Roti & Plain Chapati, Rice, Salad, Guava",
      dinner: "Dal Chana Masala, Dry Aaloo Matar, Multigrain Tandoori Roti & Plain Chapati, Matar Pulao, Salad, Green Chutney, Sweet Dish - Fruit Custard, Hot & Cold Milk",
    },
    {
      day: "Sunday",
      breakfast: "Bread Pakora / Pav Bhaji, White Sauce Pasta (Zero Maida), Cornflakes, Omlette, Bread, Butter, Jam, Milk, Tea",
      lunch: "Paneer Onion Parantha, Veg Biryani, Curd, Butter, Salad, Papad, Pickle, Amul Kulfi - Kashmiri",
      dinner: "Dal Makhani, Masala Bhindi / Baingan Bharta, Tandoori Roti & Plain Chapati, Rice, Salad, Sweet Dish - Rice Kheer, Hot & Cold Milk",
    },
  ],
  milkDistribution: {
    girls: { timing: "09:15 PM - 09:45 PM", place: "Geeta Bhawan, Geeta Bhawan Extention & Malviya - B" },
    boys: { timing: "09:15 PM - 09:45 PM", place: "Dinning hall no. 1 & First Year Dining Hall" },
    firstYearBoys: { timing: "Along With Dinner", place: "Peach Tree & Meet & Treet" },
  },
};