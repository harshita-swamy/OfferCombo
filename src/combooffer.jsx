import React from "react";
import { PRODUCT_IMAGES } from "./assets/productImages";
import { COMBO_OFFER } from "./data/products";
import "./App.css";

export default function ComboOffer({ onClaim }) {
  return (
    <section className="combo-offer">
      <div className="combo-offer__card">
        <img
          src={PRODUCT_IMAGES.hero}
          alt={`${COMBO_OFFER.title} - ${COMBO_OFFER.badge}, ${COMBO_OFFER.discountLabel}`}
          className="combo-offer__image"
        />
        <button className="combo-offer__button" onClick={onClaim}>
          Claim This Offer
        </button>
      </div>
    </section>
  );
}