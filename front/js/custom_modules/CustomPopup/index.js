// @ts-check

/**
 *
 * @param {{
 *  title: string;
 *  body: HTMLElement | string;
 *  type: "question" | "info" | "error";
 *  onclose?: () => void;
 *  onconfirm?: () => void;
 *  confirmText?: string;
 * }} options
 * @returns {HTMLDivElement}
 */
export function showPopup(options) {
  // @ts-ignore
  document.activeElement?.blur();

  const popupContainer = document.createElement("div");
  popupContainer.style.position = "fixed";
  popupContainer.style.top = "0";
  popupContainer.style.bottom = "0";
  popupContainer.style.left = "0";
  popupContainer.style.right = "0";
  popupContainer.style.backgroundColor = "#0002";
  popupContainer.style.display = "flex";
  popupContainer.onclick = (/** @type {Event} */ e) => {
    if (e.target === popupContainer) {
      popupContainer.remove();
      if (options.onclose) options.onclose();
    }
  };

  const popupEl = document.createElement("div");
  popupEl.style.margin = "auto";
  popupEl.style.width = "420px";
  popupEl.style.height = "160px";
  popupEl.style.background = "white";
  popupEl.style.borderRadius = "3px";

  const headerEl = document.createElement("div");
  headerEl.style.height = "40px";
  headerEl.style.backgroundColor = "#0005";
  const headerTitleEl = document.createElement("h2");
  headerTitleEl.textContent = options.title;
  headerTitleEl.style.fontSize = "16px";
  headerTitleEl.style.margin = "0";
  headerTitleEl.style.textAlign = "left";
  headerTitleEl.style.padding = "9px";
  headerEl.appendChild(headerTitleEl);

  const bodyEl = document.createElement("div");
  bodyEl.style.color = "black";
  bodyEl.style.overflowY = "auto";
  bodyEl.style.height = "calc(100% - 80px)";
  bodyEl.style.padding = "0 10px";
  if (typeof options.body === "string") {
    const pEl = document.createElement("p");
    pEl.textContent = options.body;
    bodyEl.appendChild(pEl);
  } else {
    bodyEl.appendChild(options.body);
  }

  const footerEl = document.createElement("div");
  footerEl.style.height = "40px";
  footerEl.style.backgroundColor = "#0005";
  footerEl.style.display = "flex";
  footerEl.style.flexDirection = "row-reverse";
  const closeBtnEl = document.createElement("button");
  closeBtnEl.textContent = "Fermer";
  closeBtnEl.onclick = (e) => {
    popupContainer.remove();
    if (options.onclose) options.onclose();
  };
  if (options.onconfirm) {
    const confirmBtnEl = document.createElement("button");
    // confirmBtnEl.style.background = "#aee7bf";
    confirmBtnEl.textContent = options.confirmText ?? "Ok";
    confirmBtnEl.onclick = (e) => {
      popupContainer.remove();
      if (options.onconfirm) options.onconfirm();
    };
    footerEl.appendChild(confirmBtnEl);
  }
  footerEl.appendChild(closeBtnEl);

  popupEl.appendChild(headerEl);
  popupEl.appendChild(bodyEl);
  popupEl.appendChild(footerEl);
  popupContainer.appendChild(popupEl);
  document.body.appendChild(popupContainer);

  function handlerKeyDown(/** @type {KeyboardEvent} */ e) {
    if (e.code === "Escape") {
      document.body.removeEventListener("keydown", handlerKeyDown);
      popupContainer.remove();
      if (options.onclose) options.onclose();
    }
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      document.body.removeEventListener("keydown", handlerKeyDown);
      popupContainer.remove();
      if (options.onconfirm) {
        options.onconfirm();
      } else if (options.onclose) {
        options.onclose();
      }
    }
  }

  document.body.addEventListener("keydown", handlerKeyDown);
  return popupContainer;
}
