export type OrderStatus = 'Placed' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  cityStateZip: string;
  phone: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  retailerId: string;
  franchiseId: string;
  status: OrderStatus;
  timestamp: string;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  category: string;
  icon: string;
}

export interface LogMessage {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  component: 'Spring Boot' | 'Azure DB' | 'Kafka' | 'OIDC';
  message: string;
}

export interface KafkaMessage {
  id: string;
  topic: 'order-placed' | 'order-routed' | 'order-status-update';
  key: string;
  value: string;
  timestamp: string;
}

export type UserRole = 'retailer' | 'franchise' | 'admin';

export interface UserProfile {
  username: string;
  role: UserRole;
  token: string;
  retailerId?: string;
  franchiseId?: string;
}
