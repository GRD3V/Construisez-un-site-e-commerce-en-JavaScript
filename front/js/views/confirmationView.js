// @ts-check

import { getValueOfParam } from "../utils/locationUtil";

export async function ConfirmationView() {
  const orderId = getValueOfParam("orderId");
  const orderIdEl = /** @type { HTMLElement } */ (
    document.querySelector("#orderId")
  );
  orderIdEl.textContent = orderId;
}
