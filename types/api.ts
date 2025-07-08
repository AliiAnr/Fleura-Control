export interface APIResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}
export interface LoginResponse {
  access_token: string;
}

export interface ProductReviewResponse {
  productId: string;
  description: string;
  status: AdminsStatus;
}
export interface SellerReviewRequest {
  sellerId: string;
  description: string;
  status: AdminsStatus;
}
export interface UpdateOrderRequest {
  status: OrderStatus;
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

export enum TakenMethod {
  PICKUP = "pickup",
  DELIVERY = "delivery",
}
export enum OrderStatus {
  CREATED = "created",
  PROCESS = "process",
  PICKUP = "pickup",
  DELIVERY = "delivery",
  COMPLETED = "completed",
}

export interface Order {
  id: string;
  note: string;
  created_at: Date;
  total: number;
  point: number;
  taken_date: Date;
  taken_method: TakenMethod;
  status: OrderStatus;
  store?: Store;
  buyer?: Buyer;
  addressId?: string;
  orderItems?: OrderItem[];
  payment?: Payment;
}

export interface OrderItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Payment {
  id: string;
  created_at: Date;
  status: PaymentStatus;
  methode: PaymentMethod;
  success_at: Date;
  orderId: string;
  qris_url: string;
  qris_expired_at: string;
  
}

export enum PaymentMethod {
  QRIS = "qris",
  CASH = "cash",
  POINT = "point",
}

export enum PaymentStatus {
  EXPIRE = "expire",
  UNPAID = "unpaid",
  PAID = "paid",
}

export interface Buyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  point: number;
  verified_at: Date;
}

export interface StoreAddress {
  id: string;
  postcode: string;
  road: string;
  province: string;
  city: string;
  detail: string;
  district: string;
  storeId: string;
}
export interface BuyerAddress {
  id: string;
  postcode: string;
  road: string;
  province: string;
  city: string;
  detail: string;
  district: string;
  buyerId: string;
}
export interface SellerAddress {
  id: string;
  postcode: string;
  road: string;
  province: string;
  city: string;
  detail: string;
  district: string;
  buyerId: string;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  identity_number: string;
  identity_picture: string;
  account: string;
  picture: string;
}

export interface AdminProductReview {
  id: string;
  created_at: string;
  description: string;
  status: AdminsStatus;
  productId: string;
}
export interface AdminStoreReview {
  id: string;
  created_at: string;
  description: string;
  status: AdminsStatus;
  productId: string;
}

export enum AdminsStatus {
  ACCEPTED = "ACCEPTED",
  NEED_REVIEW = "NEED_REVIEW",
  REJECTED = "REJECTED",
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductPicture {
  id: string;
  path: string;
}
