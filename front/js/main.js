import { CartView } from "./views/cartView";
import { ConfirmationView } from "./views/confirmationView";
import { ProductListView } from "./views/productListView";
import { ProductView } from "./views/productView";

/**
 * Gere l'affichage page
 * @param {string} pageId - ID de la page à init
 * @returns {Promise<void>} Retourne une promise vide
 */
async function initPage(pageId) {
  if (!pageId) throw new Error("pageId doit être definie");
  switch (pageId) {
    case "index":
      await ProductListView();
      break;
    case "product":
      await ProductView();
      break;
    case "cart":
      await CartView();
      break;
    case "confirmation":
      await ConfirmationView();
      break;

    default:
      throw new Error("Page inconnue !");
  }
}

window.initPage = initPage;
