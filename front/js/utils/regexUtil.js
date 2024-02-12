export const regexList = {
  name: /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/,
  address: /^\d{1,5}\s[A-ZÀ-Ö]+\s[A-ZÀ-Ö]+(\s[A-ZÀ-Ö]+)*\s*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

/**
 * Valide un champ de type nom
 * @param {string} payload
 * @returns {boolean}
 */
export function isValidName(payload) {
  return regexList.name.test(payload);
}

/**
 * Valide un champ de type adresse
 * @param {string} payload
 * @returns {boolean}
 */
export function isValidAddress(payload) {
  return regexList.address.test(payload);
}

/**
 * Valide un champ de type email
 * @param {string} payload
 * @returns {boolean}
 */
export function isValidEmail(payload) {
  return regexList.email.test(payload);
}
