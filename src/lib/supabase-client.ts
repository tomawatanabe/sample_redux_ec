import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../schema";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
