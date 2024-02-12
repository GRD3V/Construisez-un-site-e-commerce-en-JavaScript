// @ts-check

import { showAddCartPopup, showErrorQuantityPopup } from "./popupUtil";

/**
 * @typedef {Object.<string, import("../types/entity/CartProductEntity").CartProductEntity>} CartProductMap
 */

const _LOCALSTORAGE_CART_KEY = "kanap_cart";

/**
 * Reset le panier
 * @returns {string}
 */
export function resetCart() {
  const initData = JSON.stringify([]);
  localStorage.setItem(_LOCALSTORAGE_CART_KEY, initData);
  return initData;
}

/**
 * Recupere les données du panier
 * @returns {import("../types/entity/CartProductEntity").CartProductEntity[]}
 */
export function getCart() {
  let cartRaw = localStorage.getItem(_LOCALSTORAGE_CART_KEY);
  if (!cartRaw) {
    cartRaw = resetCart();
  }
  return JSON.parse(cartRaw);
}

/**
 * Ajoute un produit au panier
 * @param {string} productId
 * @param {string} color
 * @param {number} quantity
 * @returns {import("../types/entity/CartProductEntity").CartProductEntity[]}
 */
export function addToCart(productId, color, quantity = 1) {
  if (!productId) throw new Error("productId manquant");
  if (!color) throw new Error("color manquant");
  const cart = getCart();
  const even = (product) => product.id === productId && product.color === color;
  const potentialProduct = cart.find(even);
  const potentialProductIndex = cart.findIndex(even);

  if (potentialProduct && potentialProductIndex !== -1) {
    const product = cart[potentialProductIndex];
    if (quantity < 1 || quantity > 100) {
      showErrorQuantityPopup(quantity);
    }
    cart[potentialProductIndex].quantity = controlQuantityNumber(
      product.quantity + quantity
    );

    showAddCartPopup(product.quantity + quantity);
  } else {
    cart.push({
      id: productId,
      color,
      quantity: controlQuantityNumber(quantity),
    });
    showAddCartPopup(quantity);
  }

  saveCart(cart);
  return cart;
}

/**
 * Retire un produit du panier
 * @param {string} productId
 * @param {string} color
 * @returns {import("../types/entity/CartProductEntity").CartProductEntity[]}
 */
export function removeFromCart(productId, color) {
  if (!productId) throw new Error("productId manquant");
  if (!color) throw new Error("color manquant");
  const cart = getCart();

  const even = (product) => product.id === productId && product.color === color;
  const potentialProductIndex = cart.findIndex(even);
  if (potentialProductIndex < 0)
    throw new Error(`Le produit ${productId} n'existe pas dans le panier`);

  cart.splice(potentialProductIndex, 1);
  saveCart(cart);

  return cart;
}

/**
 * Retire un produit du panier
 * @param {string} productId
 * @param {string} color
 * @param {number} quantity
 * @returns {number}
 */
export function updateQuantity(productId, color, quantity) {
  if (!productId) throw new Error("productId manquant");
  if (!color) throw new Error("color manquant");
  if (typeof quantity !== "number") throw new Error("quantity manquant");
  const cart = getCart();

  const even = (product) => product.id === productId && product.color === color;
  const potentialProductIndex = cart.findIndex(even);
  if (potentialProductIndex < 0)
    throw new Error(`Le produit ${productId} n'existe pas dans le panier`);
  if (quantity < 1 || quantity > 100) {
    showErrorQuantityPopup(quantity);
  }
  cart[potentialProductIndex].quantity = controlQuantityNumber(quantity);
  saveCart(cart);

  return cart[potentialProductIndex].quantity;
}

/**
 * Save le panier
 * @param {import("../types/entity/CartProductEntity").CartProductEntity[]} cart
 * @returns {string}
 */
function saveCart(cart) {
  const initData = JSON.stringify(cart);
  localStorage.setItem(_LOCALSTORAGE_CART_KEY, initData);
  return initData;
}

/**
 * Control et transforme si besoin la quantité
 * @param {number | string} quantity
 * @returns {number}
 */
export function controlQuantityNumber(quantity) {
  if (typeof quantity !== "number") quantity = parseInt(quantity);
  if (isNaN(quantity)) throw new Error("Quantity is NaN");
  if (quantity < 1) return 1;
  if (quantity > 100) return 100;
  return quantity;
}
