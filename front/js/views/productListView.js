// @ts-check

import { fetchProducts } from "../api";
import { ProductItemComponent } from "../components/productItemComponents";

export async function ProductListView() {
  const productSection = /** @type { HTMLElement } */ (
    document.querySelector("#items")
  );

  const products = await fetchProducts();

  for (const product of products) {
    productSection.appendChild(ProductItemComponent({ product }));
  }
}
