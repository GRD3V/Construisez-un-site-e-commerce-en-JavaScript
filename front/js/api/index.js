// @ts-check

import { config } from "../config";
import { ContextFetch } from "../custom_modules/ContextFetch";

const contextApi = new ContextFetch({
  apiUrl: `${config.API_URL}:${config.API_PORT}`,
});

/**
 * Récupère les produit via l'API.
 * @returns {Promise<import("../types/entity/ProductEntity").ProductEntity[]>} Retourne une promise des produit
 */
export async function fetchProducts() {
  const res = await contextApi.get("/api/products");
  return res.json();
}

/**
 * Récupère un produit par son ID via l'API.
 * @param {string} productId - ID du produit
 * @returns {Promise<import("../types/entity/ProductEntity").ProductEntity>} Retourne une promise des produit
 */
export async function fetchProductById(productId) {
  const res = await contextApi.get(`/api/products/${productId}`);
  return res.json();
}

/**
 * Envoie la commande client vers l'API
 * @param {import("../types/entity/OrderRequestEntity").OrderRequestEntity} orderRequest - Object de requete order
 * @returns {Promise<import("../types/entity/OrderResponseEntity").OrderResponseEntity>} Retourne une promise des produit
 */
export async function submitOrder(orderRequest) {
  const res = await contextApi.post(`/api/products/order`, {
    body: JSON.stringify(orderRequest),
  });
  return res.json();
}
