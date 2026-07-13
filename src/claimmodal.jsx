import React, { useState } from "react";
import { COMBO_OFFER } from "./data/products";
import "./App.css";

// ─────────────────────────────────────────────────────────────────────────
// HOW TO CONNECT YOUR GOOGLE FORM (one-time setup):
// 1. Open your Google Form (create one with 3 short-answer questions:
//    Name, Email, Address).
// 2. Click the 3-dot menu (top right) → "Get pre-filled link".
// 3. Type a dummy value into each question (e.g. "TestName", "test@x.com",
//    "TestAddress") and click "Get link" at the bottom.
// 4. Copy the generated link. It will look like:
//    https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxxxxxxxxxxx/viewform?usp=pp_url&entry.111111111=TestName&entry.222222222=test%40x.com&entry.333333333=TestAddress
// 5. From that link:
//      - GOOGLE_FORM_ID = the part between "/d/e/" and "/viewform"
//      - entry.111111111 → paste that number into ENTRY_IDS.name
//      - entry.222222222 → paste that number into ENTRY_IDS.email
//      - entry.333333333 → paste that number into ENTRY_IDS.address
// 6. Save this file — submissions will now land as new rows in your
//    Form's linked Google Sheet.
// ─────────────────────────────────────────────────────────────────────────
const GOOGLE_FORM_ID = "1FAIpQLSfsgxLh9951U3ZyftBNDXRLxfqSsnhVa6c7ZJY9XBjNsfKfrA";
const ENTRY_IDS = {
  name: "516214188",
  email: "408166001",
  address: "1113362729",
  mobile : "1354627912"
};

const FORM_ACTION_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

export default function ClaimModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", mobile: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.address.trim()) e.address = "Please enter your address";
    if (!form.mobile.trim()) e.mobile = "Please enter your mobile number";
    else if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);

    const data = new FormData();
    data.append(`entry.${ENTRY_IDS.name}`, form.name);
    data.append(`entry.${ENTRY_IDS.email}`, form.email);
    data.append(`entry.${ENTRY_IDS.address}`, form.address);
    data.append(`entry.${ENTRY_IDS.mobile}`, form.mobile);

    try {
      // Google Forms blocks reading the response (CORS), so we submit with
      // mode: "no-cors". The browser can't read back a success/fail status,
      // but the submission still reaches Google and gets recorded.
      await fetch(FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
    } catch (err) {
      console.error("Google Form submission error:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {!submitted ? (
          <>
            <p className="modal-eyebrow">{COMBO_OFFER.discountLabel} Combo</p>
            <h2 className="modal-title">{COMBO_OFFER.title}</h2>
            <p className="modal-subtitle">
              Fill in your details and we'll confirm your order.
            </p>

            <div className="modal-form">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
              />
              {errors.name && <p className="field-error">{errors.name}</p>}

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}

              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                rows={3}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="House no., street, city, pin code"
              />
              {errors.address && (
                <p className="field-error">{errors.address}</p>
              )}

              <label htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                type="tel"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
                placeholder="10-digit mobile number"
              />
              {errors.mobile && <p className="field-error">{errors.mobile}</p>}

              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Get Coupon"}
              </button>
              <p className="modal-note">
                Your details are sent directly to our order form.
              </p>
            </div>
          </>
        ) : (
          <div className="modal-success">
            <h2>Thank you, {form.name.split(" ")[0]}!</h2>
            <p>
              We've received your order for the {COMBO_OFFER.title}. A confirmation
              will be sent to <strong>{form.email}</strong>.
            </p>
            <button className="done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}