// @ts-check

import { fetchProductById } from "../api";
import { showPopup } from "../custom_modules/CustomPopup";
import { addToCart, controlQuantityNumber } from "../utils/cartUtil";
import { getValueOfParam } from "../utils/locationUtil";
import { showErrorQuantityPopup } from "../utils/popupUtil";

export async function ProductView() {
  const productId = getValueOfParam("id");
  if (!productId) {
    alert(
      "L'ID du produit fournit en paramètre d'URL n'est pas valide. La page ne peut s'afficher."
    );
    return;
  }
  const product = await fetchProductById(productId);
  setProductPage(product);

  /** @type {{ quantity: number; color: string | null; }} */
  const varProduct = {
    quantity: 1,
    color: null,
  };

  const quantityInput = /** @type { HTMLInputElement } */ (
    document.querySelector("#quantity")
  );
  quantityInput.value = "1";
  const addToCartBtn = /** @type { HTMLButtonElement } */ (
    document.querySelector("#addToCart")
  );

  quantityInput.onchange = handlerQuantityOnChange;
  addToCartBtn.onclick = handlerAddToCart;

  function handlerAddToCart(e) {
    if (!varProduct.color) {
      showPopup({
        title: "Vous devez choisir une couleur",
        body: "Vous devez choisir une couleur avant de pouvoir ajouter le kanap au panier.",
        type: "error",
      });
      return;
    }
    const cart = addToCart(product._id, varProduct.color, varProduct.quantity);
  }

  function handlerQuantityOnChange(e) {
    const quantity = e.target.value;
    if (quantity < 1 || quantity > 100) {
      showErrorQuantityPopup(quantity);
    }
    e.target.value = varProduct.quantity = controlQuantityNumber(
      e.target.value
    );
  }

  function handlerOptionsOnChange(e) {
    varProduct.color = e.target.value;
  }

  function setProductPage(product) {
    document.title = product.name;

    const imgContainer = /** @type { HTMLDivElement } */ (
      document.querySelector("div.item__img")
    );
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    imgContainer.appendChild(img);

    const h1 = /** @type { HTMLHeadingElement } */ (
      document.querySelector("#title")
    );
    h1.textContent = product.name;

    const span = /** @type { HTMLSpanElement } */ (
      document.querySelector("#price")
    );
    span.textContent = `${product.price}`;

    const p = /** @type { HTMLParagraphElement } */ (
      document.querySelector("#description")
    );
    p.textContent = product.description;

    const select = /** @type { HTMLSelectElement } */ (
      document.querySelector("#colors")
    );
    product.colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = option.textContent = color;
      select.appendChild(option);
    });
    select.onchange = handlerOptionsOnChange;
  }
}
