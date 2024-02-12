// @ts-check

import { fetchProducts, submitOrder } from "../api";
import { CartItemComponent } from "../components/cartItemComponent";
import { showPopup } from "../custom_modules/CustomPopup";
import {
  getCart,
  removeFromCart,
  resetCart,
  updateQuantity,
} from "../utils/cartUtil";
import { formatPrice } from "../utils/priceUtil";
import { isValidAddress, isValidEmail, isValidName } from "../utils/regexUtil";

export async function CartView() {
  const cartContainer = /** @type { HTMLElement } */ (
    document.querySelector("#cart__items")
  );
  const productList = await fetchProducts();
  const cart = getCart();

  let totalPrice = 0;
  let totalQuantity = 0;

  const totalQuantityEl = /** @type { HTMLSpanElement } */ (
    document.querySelector("#totalQuantity")
  );
  const totalPriceEl = /** @type { HTMLSpanElement } */ (
    document.querySelector("#totalPrice")
  );

  for (const item of cart) {
    const product = productList.find((product) => product._id === item.id);
    if (!product) {
      throw new Error(
        `Erreur critique, un produit du panier n'est pas trouvable dans notre catalogue. ${item.id}`
      );
    }
    const cartItem = CartItemComponent({
      id: item.id,
      imageUrl: product.imageUrl,
      name: product.name,
      color: item.color,
      price: product.price,
      quantity: item.quantity,
      onQuantityChange(newQuantity, update) {
        update(updateQuantity(product._id, item.color, newQuantity));
        updateTotalPriceAndQuantity();
      },
      onDelete() {
        showPopup({
          title: "Supprimer le produit ?",
          body: `Êtes vous vraiment sùr de supprimer ce produit de votre panier ?`,
          type: "question",
          confirmText: "Supprimer",
          onconfirm: () => {
            removeFromCart(product._id, item.color);
            cartItem.remove();
            updateTotalPriceAndQuantity();
            onFormChange();
          },
        });
      },
    });
    cartContainer.appendChild(cartItem);
  }

  function updateTotalPriceAndQuantity() {
    totalQuantity = 0;
    totalPrice = 0;
    const cart = getCart();
    for (const item of cart) {
      const product = productList.find((product) => product._id === item.id);
      if (!product) {
        throw new Error(
          `Erreur critique, un produit du panier n'est pas trouvable dans notre catalogue. ${item.id}`
        );
      }
      totalQuantity += item.quantity;
      totalPrice += product.price * item.quantity;
    }
    totalQuantityEl.textContent = `${totalQuantity}`;
    totalPriceEl.textContent = `${formatPrice(totalPrice)}`;
  }
  updateTotalPriceAndQuantity();

  const firstNameEl = /** @type { HTMLInputElement } */ (
    document.querySelector("#firstName")
  );
  const firstNameErrorMsgEl = /** @type { HTMLParagraphElement } */ (
    document.querySelector("#firstNameErrorMsg")
  );
  const lastNameEl = /** @type { HTMLInputElement } */ (
    document.querySelector("#lastName")
  );
  const lastNameErrorMsgEl = /** @type { HTMLParagraphElement } */ (
    document.querySelector("#lastNameErrorMsg")
  );
  const addressEl = /** @type { HTMLInputElement } */ (
    document.querySelector("#address")
  );
  const addressErrorMsgEl = /** @type { HTMLParagraphElement } */ (
    document.querySelector("#addressErrorMsg")
  );
  const cityEl = /** @type { HTMLInputElement } */ (
    document.querySelector("#city")
  );
  const cityErrorMsgEl = /** @type { HTMLParagraphElement } */ (
    document.querySelector("#cityErrorMsg")
  );
  const emailEl = /** @type { HTMLInputElement } */ (
    document.querySelector("#email")
  );
  const emailErrorMsgEl = /** @type { HTMLParagraphElement } */ (
    document.querySelector("#emailErrorMsg")
  );

  /** @type {import("../types/entity/ContactEntity").ContactEntity} */
  const contactForm = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  };

  firstNameEl.oninput = (e) => {
    // @ts-ignore
    contactForm.firstName = e.target.value;
    onFormChange();
  };
  lastNameEl.oninput = (e) => {
    // @ts-ignore
    contactForm.lastName = e.target.value;
    onFormChange();
  };
  addressEl.oninput = (e) => {
    // @ts-ignore
    const value = e.target.value.toUpperCase();
    contactForm.address = value;
    // @ts-ignore
    e.target.value = value;
    onFormChange();
  };
  cityEl.oninput = (e) => {
    // @ts-ignore
    const value = e.target.value.toUpperCase();
    contactForm.city = value;
    // @ts-ignore
    e.target.value = value;
    onFormChange();
  };
  emailEl.oninput = (e) => {
    // @ts-ignore
    contactForm.email = e.target.value;
    onFormChange();
  };

  const orderEl = /** @type { HTMLInputElement } */ (
    document.querySelector("#order")
  );
  orderEl.disabled = true;
  orderEl.style.opacity = "0.5";

  const contactCartFormEl = /** @type { HTMLFormElement } */ (
    document.querySelector("#contactCartForm")
  );
  contactCartFormEl.onsubmit = async (e) => {
    e.preventDefault();
    const cart = getCart();
    const payload = {
      contact: contactForm,
      products: cart.map((item) => item.id),
    };
    const order = await submitOrder(payload);
    resetCart();
    window.location.href = `confirmation.html?orderId=${order.orderId}`;
  };

  function onFormChange() {
    const isValidList = {
      firstName: false,
      lastName: false,
      address: false,
      city: false,
      email: false,
    };
    const { firstName, lastName, address, city, email } = contactForm;
    if (firstName.length === 0) {
      isValidList.firstName = false;
      firstNameErrorMsgEl.textContent = "Le champ Prénom doit être remplis.";
    } else if (!isValidName(firstName)) {
      isValidList.firstName = false;
      firstNameErrorMsgEl.textContent =
        "Le champ Prénom ne doit contenir que des lettres. (ex. John)";
    } else {
      isValidList.firstName = true;
      firstNameErrorMsgEl.textContent = "";
    }

    if (lastName.length === 0) {
      isValidList.lastName = false;
      lastNameErrorMsgEl.textContent = "Le champ Nom doit être remplis.";
    } else if (!isValidName(lastName)) {
      isValidList.lastName = false;
      lastNameErrorMsgEl.textContent =
        "Le champ Nom ne doit contenir que des lettres. (ex. Doe)";
    } else {
      isValidList.lastName = true;
      lastNameErrorMsgEl.textContent = "";
    }

    if (address.length === 0) {
      isValidList.address = false;
      addressErrorMsgEl.textContent = "Le champ Adresse doit être remplis.";
    } else if (!isValidAddress(address)) {
      isValidList.address = false;
      addressErrorMsgEl.textContent =
        "Le champ Adresse ne coorespond pas à une adresse valide. (ex. 15 AVENUE DES CHAMPS ÉLYSÉES)";
    } else {
      isValidList.address = true;
      addressErrorMsgEl.textContent = "";
    }

    if (city.length === 0) {
      isValidList.city = false;
      cityErrorMsgEl.textContent = "Le champ Ville doit être remplis.";
    } else if (!isValidName(city)) {
      isValidList.city = false;
      cityErrorMsgEl.textContent =
        "Le champ Ville ne doit contenir que des lettres. (ex. PARIS)";
    } else {
      isValidList.city = true;
      cityErrorMsgEl.textContent = "";
    }

    if (email.length === 0) {
      isValidList.email = false;
      emailErrorMsgEl.textContent = "Le champ Email doit être remplis.";
    } else if (!isValidEmail(email)) {
      isValidList.email = false;
      emailErrorMsgEl.textContent =
        "Le champ Email ne coorespond pas à un email valide.";
    } else {
      isValidList.email = true;
      emailErrorMsgEl.textContent = "";
    }

    if (
      isValidList.firstName &&
      isValidList.lastName &&
      isValidList.address &&
      isValidList.city &&
      isValidList.email &&
      totalQuantity > 0
    ) {
      orderEl.disabled = false;
      orderEl.style.opacity = "1";
    } else {
      orderEl.disabled = true;
      orderEl.style.opacity = "0.5";
    }
  }
  onFormChange();
}
