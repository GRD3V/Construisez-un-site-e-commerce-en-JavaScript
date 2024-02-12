import { ContactEntity } from "./ContactEntity";

export type OrderRequestEntity = {
  contact: ContactEntity;
  products: string[];
};
