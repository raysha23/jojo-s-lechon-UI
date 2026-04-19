// =============================
// STEP 2 - Customer Info
// =============================
import {
  contactList,
  addContactBtn,
  contactError,
  customerName,
  nameError,
  facebookProfile,
  fbError,
  contactNumber,
} from "../state/elements.js";

const MAX_CONTACTS = 2;

// ─────────────────────────────────────────────────────────────
// NAME INPUT HANDLING
// ─────────────────────────────────────────────────────────────
export function onCustomerNameInput() {
  customerName.value = customerName.value.replace(/[^a-zA-Z\s]/g, "");
}

// ─────────────────────────────────────────────────────────────
// NAME VALIDATION
// ─────────────────────────────────────────────────────────────
export function onCustomerNameBlur() {
  const value = customerName.value.trim();
  const valid = /^[a-zA-Z\s]+$/.test(value);
  const empty = value === "";

  if (!empty && !valid) {
    nameError.classList.remove("hidden");
    customerName.classList.add("border-red-400", "ring-1", "ring-red-400");
  } else {
    nameError.classList.add("hidden");
    customerName.classList.remove("border-red-400", "ring-1", "ring-red-400");
  }
}

// ─────────────────────────────────────────────────────────────
// CONTACT INPUT HANDLING (STRICT 0–9 ONLY)
// ─────────────────────────────────────────────────────────────
export function onContactInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}
// ─────────────────────────────────────────────────────────────
// CONTACT VALIDATION (STRICT DIGITS ONLY)
// ─────────────────────────────────────────────────────────────
export function onContactBlur(input) {
  const value = input.value.trim();

  // 🚫 must be digits only AND 7–11 length
  const valid = /^[0-9]{7,11}$/.test(value);
  const empty = value === "";

  if (!empty && !valid) {
    contactError.classList.remove("hidden");
    input.classList.add("border-red-400", "ring-1", "ring-red-400");
  } else {
    contactError.classList.add("hidden");
    input.classList.remove("border-red-400", "ring-1", "ring-red-400");
  }
}
// ─────────────────────────────────────────────────────────────
// ATTACH CONTACT LOGIC
// ─────────────────────────────────────────────────────────────
export function attachContactValidation(input) {
  input.addEventListener("input", () => onContactInput(input));
  input.addEventListener("blur", () => onContactBlur(input));
}

// ─────────────────────────────────────────────────────────────
// UPDATE PLACEHOLDERS
// ─────────────────────────────────────────────────────────────
export function updateContactPlaceholders() {
  contactList.querySelectorAll(".contact-input").forEach((input, index) => {
    input.placeholder = `Contact number ${index + 1}`;
  });
}

// ─────────────────────────────────────────────────────────────
// INIT FIRST CONTACT
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// INIT FIRST CONTACT (USING STATE ELEMENT)
// ─────────────────────────────────────────────────────────────
export function initFirstContact() {
  if (contactNumber) {
    attachContactValidation(contactNumber);
  }
}
// ─────────────────────────────────────────────────────────────
// ADD CONTACT HANDLER
// ─────────────────────────────────────────────────────────────
export function onAddContactClick() {
  const items = contactList.querySelectorAll(".contact-item");

  if (items.length >= MAX_CONTACTS) {
    addContactBtn.disabled = true;
    addContactBtn.classList.add("opacity-40", "cursor-not-allowed");
    return;
  }

  const index = items.length + 1;

  const div = document.createElement("div");
  div.className = "flex items-center gap-2 contact-item";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Contact number ${index}`;
  input.maxLength = 11;
  input.className =
    "contact-input w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-600 italic";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "✕";
  btn.className =
    "remove-contact flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-red-600 transition flex-shrink-0";

  btn.addEventListener("click", () => {
    div.remove();
    updateContactPlaceholders();
    addContactBtn.disabled = false;
    addContactBtn.classList.remove("opacity-40", "cursor-not-allowed");
  });

  attachContactValidation(input);

  div.appendChild(input);
  div.appendChild(btn);

  contactList.appendChild(div);

  if (contactList.querySelectorAll(".contact-item").length >= MAX_CONTACTS) {
    addContactBtn.disabled = true;
    addContactBtn.classList.add("opacity-40", "cursor-not-allowed");
  }
}

// ─────────────────────────────────────────────────────────────
// FACEBOOK VALIDATION
// ─────────────────────────────────────────────────────────────
export function onFacebookBlur() {
  const value = facebookProfile.value.trim();

  if (value === "") {
    fbError.classList.add("hidden");
    facebookProfile.classList.remove(
      "border-red-400",
      "ring-1",
      "ring-red-400",
    );
    return;
  }

  const valid = /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\/.+/i.test(
    value,
  );

  if (!valid) {
    fbError.classList.remove("hidden");
    facebookProfile.classList.add("border-red-400", "ring-1", "ring-red-400");
  } else {
    fbError.classList.add("hidden");
    facebookProfile.classList.remove(
      "border-red-400",
      "ring-1",
      "ring-red-400",
    );
  }
}

// ─────────────────────────────────────────────────────────────
// STEP 2 VALIDATION GATE
// ─────────────────────────────────────────────────────────────
export function validateStep2() {
  const name = customerName.value.trim();
  const contacts = [...document.querySelectorAll(".contact-input")].map((i) =>
    i.value.trim(),
  );
  const fb = facebookProfile.value.trim();

  const nameOk = /^[a-zA-Z\s.'-]+$/.test(name);
  const contactOk =
    contacts.every((c) => /^\d{7,11}$/.test(c)) && contacts[0] !== "";
  const fbOk =
    fb === "" ||
    /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\/.+/i.test(fb);

  return nameOk && contactOk && fbOk;
}

// ─────────────────────────────────────────────────────────────
// INIT LISTENERS (LIKE STEP 1 STYLE)
// ─────────────────────────────────────────────────────────────
export function initStep2Listeners() {
  customerName.addEventListener("input", onCustomerNameInput);
  customerName.addEventListener("blur", onCustomerNameBlur);

  facebookProfile.addEventListener("blur", onFacebookBlur);

  addContactBtn.addEventListener("click", onAddContactClick);

  initFirstContact();
}
