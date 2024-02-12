// @ts-check

/**
 * Une classe pour effectuer des requêtes HTTP via l'API Fetch.
 * @class
 */
export class ContextFetch {
  /** @type {string | null} */
  apiUrl = null;

  /**
   * Crée une instance de ContextFetch.
   * @constructor
   * @param {import("./types/ContextFetchConfig").ContextFetchConfig} options - Les options de configuration.
   * @throws {Error} Lance une erreur si l'URL de l'API est null
   */
  constructor(options) {
    /**
     * L'URL de base de l'API.
     * @type {string|undefined}
     * @private
     */
    this.apiUrl = options.apiUrl || null;

    if (!this.apiUrl)
      throw new Error(
        "Impossible d'instancier ContextFetch car apiUrl est null"
      );
  }

  /**
   * Effectue une requête HTTP.
   * @param {RequestInfo} input - Les informations de la requête.
   * @param {RequestInit=} init - Les options de configuration de la requête.
   * @returns {Promise<Response>} Une promesse résolue avec la réponse de la requête.
   */
  fetch(input, init) {
    return window.fetch(`${this.apiUrl}${input}`, init);
  }

  /**
   * Effectue une requête HTTP en method GET.
   * @param {RequestInfo} input - Les informations de la requête.
   * @param {RequestInit=} init - Les options de configuration de la requête.
   * @returns {Promise<Response>} Une promesse résolue avec la réponse de la requête.
   */
  get(input, init) {
    return window.fetch(`${this.apiUrl}${input}`, { method: "GET", ...init });
  }

  /**
   * Effectue une requête HTTP en method GET.
   * @param {RequestInfo} input - Les informations de la requête.
   * @param {RequestInit=} init - Les options de configuration de la requête.
   * @returns {Promise<Response>} Une promesse résolue avec la réponse de la requête.
   */
  post(input, init) {
    return window.fetch(`${this.apiUrl}${input}`, {
      method: "POST",
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  }
}
