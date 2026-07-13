import React, { useState } from "react";
import ComboOffer from "./combooffer";
import ClaimModal from "./claimmodal";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page">
      <header className="hero">
        <p className="hero__eyebrow">Season Sale</p>
        <h1 className="hero__title">
          Every look, every time, <span className="hero__highlight">50% off</span>
        </h1>
        <p className="hero__subtitle">
          6 must-have essentials, curated in one combo — kurti to sunglasses,
  everything you need for a complete look.
        </p>
      </header>

      <ComboOffer onClaim={() => setShowModal(true)} />
      {showModal && <ClaimModal onClose={() => setShowModal(false)} />}
    </div>
  );
}