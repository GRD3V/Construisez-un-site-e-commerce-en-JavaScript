// @ts-check

/**
 *
 * @param {{
 *  product: import("../types/entity/ProductEntity").ProductEntity;
 * }} props
 * @returns {HTMLAnchorElement}
 */
export function ProductItemComponent(props) {
  const a = document.createElement("a");
  a.href = `./product.html?id=${props.product._id}`;

  const article = document.createElement("article");

  const img = document.createElement("img");
  img.src = props.product.imageUrl;
  img.alt = props.product.altTxt;

  const h3 = document.createElement("h3");
  h3.classList.add("productName");
  h3.textContent = props.product.name;

  const p = document.createElement("p");
  p.classList.add("productDescription");
  p.textContent = props.product.description;

  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);

  a.appendChild(article);

  return a;
}
