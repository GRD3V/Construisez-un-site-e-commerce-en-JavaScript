import { ContactEntity } from "./ContactEntity";

export type OrderResponseEntity = {
  contact: ContactEntity;
  orderId: string;
  products: string[];
};
