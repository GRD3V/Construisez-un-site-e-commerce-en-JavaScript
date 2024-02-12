// @ts-check

import { formatPrice } from "../utils/priceUtil";

/**
 *
 * @param {{
 *  id: string;
 *  imageUrl: string;
 *  name: string;
 *  color: string;
 *  price: number;
 *  quantity: number;
 *  onQuantityChange: (newQuantity: number, update: (newQuantity: number) => void) => void;
 *  onDelete: () => void;
 * }} props
 * @returns {HTMLElement}
 */
export function CartItemComponent(props) {
  const articleEl = document.createElement("article");
  articleEl.classList.add("cart__item");
  articleEl.setAttribute("data-id", props.id);
  articleEl.setAttribute("data-color", props.color);

  // Image container
  {
    const imgContainerEl = document.createElement("div");
    imgContainerEl.classList.add("cart__item__img");
    const imgEl = document.createElement("img");
    imgEl.src = props.imageUrl;
    imgEl.alt = `Photographie du canapé ${props.name}`;
    imgContainerEl.appendChild(imgEl);

    articleEl.appendChild(imgContainerEl);
  }

  // Item content
  {
    const contentContainerEl = document.createElement("div");
    contentContainerEl.classList.add("cart__item__content");

    // Description container
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("cart__item__content__description");
    const descriptionH2El = document.createElement("h2");
    descriptionH2El.textContent = props.name;
    const descriptionP1El = document.createElement("p");
    descriptionP1El.textContent = props.color;
    const descriptionP2El = document.createElement("p");
    descriptionP2El.textContent = `${formatPrice(
      props.price * props.quantity
    )} €`;
    descriptionContainer.appendChild(descriptionH2El);
    descriptionContainer.appendChild(descriptionP1El);
    descriptionContainer.appendChild(descriptionP2El);

    contentContainerEl.appendChild(descriptionContainer);

    // Settings container
    {
      const settingsContainer = document.createElement("div");
      settingsContainer.classList.add("cart__item__content__settings");

      // Quantity container
      {
        const settingsQuantityContainer = document.createElement("div");
        settingsQuantityContainer.classList.add(
          "cart__item__content__settings__quantity"
        );
        const settingsQuantityPEl = document.createElement("p");
        settingsQuantityPEl.textContent = "Qté : ";
        settingsQuantityContainer.appendChild(settingsQuantityPEl);
        const settingsQuantityInputEl = document.createElement("input");
        settingsQuantityInputEl.type = "number";
        settingsQuantityInputEl.classList.add("itemQuantity");
        settingsQuantityInputEl.name = "itemQuantity";
        settingsQuantityInputEl.min = "1";
        settingsQuantityInputEl.max = "100";
        settingsQuantityInputEl.value = `${props.quantity}`;
        settingsQuantityInputEl.onchange = (e) => {
          //@ts-ignore
          const value = parseInt(e.target.value);
          props.onQuantityChange(value, (newQuantity) => {
            props.quantity = newQuantity;
            descriptionP2El.textContent = `${formatPrice(
              props.price * props.quantity
            )} €`;
            settingsQuantityInputEl.value = `${props.quantity}`;
          });
        };
        settingsQuantityContainer.appendChild(settingsQuantityInputEl);
        settingsContainer.appendChild(settingsQuantityContainer);
      }

      // Delete container
      {
        const settingsDeleteContainer = document.createElement("div");
        settingsDeleteContainer.classList.add(
          "cart__item__content__settings__delete"
        );
        const settingsDeletePEl = document.createElement("p");
        settingsDeletePEl.textContent = "Supprimer";
        settingsDeletePEl.onclick = () => props.onDelete();
        settingsDeleteContainer.appendChild(settingsDeletePEl);

        settingsContainer.appendChild(settingsDeleteContainer);
      }

      contentContainerEl.appendChild(settingsContainer);
    }

    articleEl.appendChild(contentContainerEl);
  }

  return articleEl;
}
