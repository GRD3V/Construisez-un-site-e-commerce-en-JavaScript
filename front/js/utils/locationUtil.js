// @ts-check

/**
 * Récupère une valeur d'un param dans l'URL
 * @param {string} paramName - Clé du param
 * @returns {string | null} Retourne la valeur du param
 */
export function getValueOfParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}
