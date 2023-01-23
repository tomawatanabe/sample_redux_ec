export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      favorite_items: {
        Row: {
          id: number;
          stock_id: number | null;
          user_id: number | null;
        };
        Insert: {
          id?: number;
          stock_id?: number | null;
          user_id?: number | null;
        };
        Update: {
          id?: number;
          stock_id?: number | null;
          user_id?: number | null;
        };
      };
      items: {
        Row: {
          color: string | null;
          deleted: boolean | null;
          description: string | null;
          id: number;
          name: string | null;
          series: string | null;
          year: number | null;
        };
        Insert: {
          color?: string | null;
          deleted?: boolean | null;
          description?: string | null;
          id?: number;
          name?: string | null;
          series?: string | null;
          year?: number | null;
        };
        Update: {
          color?: string | null;
          deleted?: boolean | null;
          description?: string | null;
          id?: number;
          name?: string | null;
          series?: string | null;
          year?: number | null;
        };
      };
      order_items: {
        Row: {
          created_at: string | null;
          id: number;
          order_id: number | null;
          stock_id: number | null;
          user_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          order_id?: number | null;
          stock_id?: number | null;
          user_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          order_id?: number | null;
          stock_id?: number | null;
          user_id?: number | null;
        };
      };
      orders: {
        Row: {
          id: number;
          note: string | null;
          order_date: string | null;
          payment_method: string | null;
          ship_status: string | null;
          total_price: number | null;
          user_id: number | null;
        };
        Insert: {
          id?: number;
          note?: string | null;
          order_date?: string | null;
          payment_method?: string | null;
          ship_status?: string | null;
          total_price?: number | null;
          user_id?: number | null;
        };
        Update: {
          id?: number;
          note?: string | null;
          order_date?: string | null;
          payment_method?: string | null;
          ship_status?: string | null;
          total_price?: number | null;
          user_id?: number | null;
        };
      };
      shopping_cart: {
        Row: {
          id: number;
          stock_id: number | null;
          user_id: number | null;
        };
        Insert: {
          id?: number;
          stock_id?: number | null;
          user_id?: number | null;
        };
        Update: {
          id?: number;
          stock_id?: number | null;
          user_id?: number | null;
        };
      };
      stocks: {
        Row: {
          amount: number | null;
          arrival: string | null;
          condition: string | null;
          deleted: boolean | null;
          id: number;
          image1: string | null;
          image2: string | null;
          image3: string | null;
          image4: string | null;
          image5: string | null;
          item_id: number | null;
          price: number | null;
          size: number | null;
        };
        Insert: {
          amount?: number | null;
          arrival?: string | null;
          condition?: string | null;
          deleted?: boolean | null;
          id?: number;
          image1?: string | null;
          image2?: string | null;
          image3?: string | null;
          image4?: string | null;
          image5?: string | null;
          item_id?: number | null;
          price?: number | null;
          size?: number | null;
        };
        Update: {
          amount?: number | null;
          arrival?: string | null;
          condition?: string | null;
          deleted?: boolean | null;
          id?: number;
          image1?: string | null;
          image2?: string | null;
          image3?: string | null;
          image4?: string | null;
          image5?: string | null;
          item_id?: number | null;
          price?: number | null;
          size?: number | null;
        };
      };
      used_items: {
        Row: {
          id: number;
          item_code: string | null;
          item_color: string | null;
          item_name: string | null;
          item_note: string | null;
          item_size: number | null;
          reception_date: string | null;
          seller_address: string | null;
          seller_building: string | null;
          seller_city: string | null;
          seller_email: string | null;
          seller_first_name: string | null;
          seller_kana_first_name: string | null;
          seller_kana_last_name: string | null;
          seller_last_name: string | null;
          seller_phone: number | null;
          seller_prefecture: string | null;
          seller_zip_code: number | null;
          status: string | null;
          user_id: number | null;
        };
        Insert: {
          id?: number;
          item_code?: string | null;
          item_color?: string | null;
          item_name?: string | null;
          item_note?: string | null;
          item_size?: number | null;
          reception_date?: string | null;
          seller_address?: string | null;
          seller_building?: string | null;
          seller_city?: string | null;
          seller_email?: string | null;
          seller_first_name?: string | null;
          seller_kana_first_name?: string | null;
          seller_kana_last_name?: string | null;
          seller_last_name?: string | null;
          seller_phone?: number | null;
          seller_prefecture?: string | null;
          seller_zip_code?: number | null;
          status?: string | null;
          user_id?: number | null;
        };
        Update: {
          id?: number;
          item_code?: string | null;
          item_color?: string | null;
          item_name?: string | null;
          item_note?: string | null;
          item_size?: number | null;
          reception_date?: string | null;
          seller_address?: string | null;
          seller_building?: string | null;
          seller_city?: string | null;
          seller_email?: string | null;
          seller_first_name?: string | null;
          seller_kana_first_name?: string | null;
          seller_kana_last_name?: string | null;
          seller_last_name?: string | null;
          seller_phone?: number | null;
          seller_prefecture?: string | null;
          seller_zip_code?: number | null;
          status?: string | null;
          user_id?: number | null;
        };
      };
      users: {
        Row: {
          address: string | null;
          building: string | null;
          city: string | null;
          email: string | null;
          first_name: string | null;
          id: number;
          kana_first_name: string | null;
          kana_last_name: string | null;
          last_name: string | null;
          password: string | null;
          phone: number | null;
          prefecture: string | null;
          zip_code: number | null;
        };
        Insert: {
          address?: string | null;
          building?: string | null;
          city?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: number;
          kana_first_name?: string | null;
          kana_last_name?: string | null;
          last_name?: string | null;
          password?: string | null;
          phone?: number | null;
          prefecture?: string | null;
          zip_code?: number | null;
        };
        Update: {
          address?: string | null;
          building?: string | null;
          city?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: number;
          kana_first_name?: string | null;
          kana_last_name?: string | null;
          last_name?: string | null;
          password?: string | null;
          phone?: number | null;
          prefecture?: string | null;
          zip_code?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
