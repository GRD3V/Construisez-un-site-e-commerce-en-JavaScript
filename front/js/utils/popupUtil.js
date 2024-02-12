//@ts-check

import { showPopup } from "../custom_modules/CustomPopup";

/**
 * Affiche la confirmation d'ajout au panier
 * @param {number} totalQuantity
 */
export function showAddCartPopup(totalQuantity) {
  showPopup({
    title: "Le produit à été ajouté",
    body: `Le produit a été ajouté dans votre panier. ${
      totalQuantity > 100
        ? "La quantité à été ajusté à 100 au total dans votre panier."
        : ""
    }`,
    type: "info",
    confirmText: "Allez au panier",
    onconfirm: () => {
      window.location.href = "cart.html";
    },
  });
}

/**
 * Affiche une erreur d'ajustement de quantity
 * @param {number} quantity
 */
export function showErrorQuantityPopup(quantity) {
  showPopup({
    title: "La quantité de produit est incorrect",
    body: `La quantité de produit doit être compris entre 1 et 100. La quantité à été remis à ${
      quantity < 1 ? 1 : 100
    }`,
    type: "error",
  });
}
