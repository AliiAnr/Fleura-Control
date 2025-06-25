export interface APIResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}
export interface LoginResponse {
  access_token: string;
}

export interface Product {
    id: string;
    name: string;
    stock: number;
    price: number;
    pre_order: boolean;
    description: string;
    arrange_time: string;
    point: number;
    store?: Store;
    category?: Category;
    picture?: ProductPicture[];
}

export interface Store {
    id: string;
    name: string;
    picture: string;
    balance: number;
    logo: string;
    phone: string;
    updated_at: Date;
    operational_hour: string;
    operational_day: string;
    description: string;
    sellerId: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface ProductPicture {
    id: string;
    path: string;
}