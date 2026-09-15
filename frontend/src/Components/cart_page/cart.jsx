"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./cart.css";
import Logo from "../../assets/images/M.png";

/* ─────────────────────────────────────────────
   DATA — unchanged from original (product data,
   recommendation data, threshold constant)
───────────────────────────────────────────── */

const INITIAL_CART_ITEMS = [
  {
    id: "mangalams-101",
    title: "Crimson Banarasi Zari Silk Saree",
    subtitle: "Handwoven Pure Silk · Royal Crimson & Antique Gold Zari",
    price: 12999,
    mrp: 16499,
    size: "Free Size (5.5m + Blouse)",
    color: "Crimson Gold",
    quantity: 1,
    inStock: true,
    stockLeft: 3,
    badge: "Heritage Pick",
    circularTag: "SECOND LIFE",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "mangalams-102",
    title: "Royal Heritage Embroidered Sherwani Set",
    subtitle: "Hand-crafted Threadwork · Deep Burgundy & Cream Chanderi",
    price: 8499,
    mrp: 10999,
    size: "M (38)",
    color: "Deep Burgundy",
    quantity: 1,
    inStock: true,
    stockLeft: 2,
    badge: "Festive Exclusive",
    circularTag: "ARTISAN MADE",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf03b0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "mangalams-103",
    title: "Handcrafted Brass Floral Temple Urli",
    subtitle: "Solid Brass · Antique Gold Hand-Polished Finish",
    price: 2499,
    mrp: 3200,
    size: "12 Inches",
    color: "Antique Gold",
    quantity: 1,
    inStock: true,
    stockLeft: 5,
    badge: "Artisan Craft",
    circularTag: "HANDCRAFTED",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80",
  },
];

const RECOMMENDATIONS = [
  {
    id: "rec-201",
    title: "Kundan Gold Plated Choker & Earring Set",
    subtitle: "Handcrafted Bridal Collection",
    price: 3499,
    mrp: 4999,
    badge: "Trending",
    circularTag: "ARTISAN MADE",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rec-202",
    title: "Hand-Embroidered Zardozi Mojris",
    subtitle: "Genuine Leather & Velvet Base",
    price: 2199,
    mrp: 2999,
    badge: "Popular",
    circularTag: "HANDCRAFTED",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rec-203",
    title: "Pure Chiffon Phulkari Dupatta",
    subtitle: "Multicolor Traditional Handwork",
    price: 1899,
    mrp: 2499,
    badge: "Bestseller",
    circularTag: "SECOND LIFE",
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
  },
];

const FREE_SHIPPING_THRESHOLD = 15000;

/* ─────────────────────────────────────────────
   SMALL SVG ICONS (inline, no extra dependency)
───────────────────────────────────────────── */

const IconArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M1.5 3.5h10M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M10.5 3.5l-.6 7a.5.5 0 01-.5.5H3.6a.5.5 0 01-.5-.5l-.6-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBookmark = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2.5 2a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v9.5L6.5 9.5 2.5 11.5V2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5L2.5 4v4c0 3 2.5 5 5.5 6 3-1 5.5-3 5.5-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 8l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTruck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 4h9v7H1V4zM10 6l3 1.5V11h-3V6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="3.5" cy="11.5" r="1" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="12" cy="11.5" r="1" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconReturn = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 8A5.5 5.5 0 108 2.5M2.5 5V8H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTag = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M1.5 1.5h5l6.5 6.5-5 5L1.5 6.5v-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
  </svg>
);

const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 1a5 5 0 015 5c0 3-5 8-5 8S2 9 2 6a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN CART COMPONENT
───────────────────────────────────────────── */

export default function Cart() {
  /* ── state (identical to original) ── */
  const [items, setItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [includeGift, setIncludeGift] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [pincodeOpen, setPincodeOpen] = useState(false);

  /* ── persistence (identical to original) ── */
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("mangalams-cart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        setItems(parsed.length > 0 ? parsed : INITIAL_CART_ITEMS);
      } else {
        setItems(INITIAL_CART_ITEMS);
      }
      const storedSaved = localStorage.getItem("mangalams-saved-for-later");
      if (storedSaved) setSavedItems(JSON.parse(storedSaved));
    } catch {
      setItems(INITIAL_CART_ITEMS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("mangalams-cart", JSON.stringify(items));
  }, [items, isLoaded]);

  useEffect(() => {
    if (isLoaded)
      localStorage.setItem("mangalams-saved-for-later", JSON.stringify(savedItems));
  }, [savedItems, isLoaded]);

  /* ── handlers (identical logic to original) ── */
  const handleQuantityChange = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveForLater = (itemToSave) => {
    setItems((prev) => prev.filter((item) => item.id !== itemToSave.id));
    setSavedItems((prev) => [...prev, itemToSave]);
  };

  const handleMoveToCart = (itemToMove) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== itemToMove.id));
    setItems((prev) => [...prev, itemToMove]);
  };

  const handleAddRecommendation = (rec) => {
    const existingIndex = items.findIndex((item) => item.id === rec.id);
    if (existingIndex > -1) {
      handleQuantityChange(rec.id, 1);
    } else {
      const newItem = {
        ...rec,
        quantity: 1,
        inStock: true,
        size: "Standard",
        color: "As Shown",
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === "FESTIVE20") {
      setAppliedCoupon({ code: "FESTIVE20", discountPercent: 20, type: "percent" });
      setCouponCode("");
      setCouponOpen(false);
    } else if (cleanCode === "MANGALAMS10") {
      setAppliedCoupon({ code: "MANGALAMS10", discountPercent: 10, type: "percent" });
      setCouponCode("");
      setCouponOpen(false);
    } else if (cleanCode === "WELCOME500") {
      setAppliedCoupon({ code: "WELCOME500", flatDiscount: 500, type: "flat" });
      setCouponCode("");
      setCouponOpen(false);
    } else {
      setCouponError("Invalid code. Try FESTIVE20 or MANGALAMS10.");
    }
  };

  const handleRemoveCoupon = () => setAppliedCoupon(null);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode.trim())) {
      setDeliveryInfo({
        pin: pincode,
        date: "Thursday, 17 Sep",
        standard: "FREE Standard Shipping",
        express: "Express Available (1–2 Days)",
      });
    } else {
      setDeliveryInfo({ error: "Enter a valid 6-digit pincode." });
    }
  };

  const handleCheckout = () => {
    setCheckoutMessage("Preparing your checkout…");
    setTimeout(() => {
      setCheckoutMessage("");
      alert(`Proceeding to checkout — Order Total: ₹${grandTotal.toLocaleString("en-IN")}`);
    }, 1200);
  };

  /* ── calculations (identical to original) ── */
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalMrp = items.reduce(
    (acc, item) => acc + (item.mrp || item.price) * item.quantity,
    0,
  );
  const totalMrpSavings = Math.max(0, totalMrp - subtotal);

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.type === "flat") {
      couponDiscount = Math.min(subtotal, appliedCoupon.flatDiscount);
    }
  }

  const giftWrapFee = includeGift ? 149 : 0;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 249;
  const gstTax = Math.round((subtotal - couponDiscount) * 0.05);
  const grandTotal = Math.max(
    0,
    subtotal - couponDiscount + giftWrapFee + shippingFee + gstTax,
  );

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (!isLoaded) return null;

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <div className="mc-page">

      {/* ── TOP NAV ── */}
      <nav className="mc-nav" aria-label="Cart navigation">
        <Link href="/" className="mc-nav__brand" aria-label="Mangalams home">
          <Image src={Logo} alt="" className="mc-nav__logo" width={36} height={36} />
          <span className="mc-nav__wordmark">Mangalams</span>
        </Link>

        {/* Checkout progress */}
        <ol className="mc-progress" aria-label="Checkout steps">
          <li className="mc-progress__step mc-progress__step--active" aria-current="step">
            <span className="mc-progress__dot" />
            <span>Bag</span>
          </li>
          <span className="mc-progress__line" aria-hidden="true" />
          <li className="mc-progress__step">
            <span className="mc-progress__dot" />
            <span>Delivery</span>
          </li>
          <span className="mc-progress__line" aria-hidden="true" />
          <li className="mc-progress__step">
            <span className="mc-progress__dot" />
            <span>Payment</span>
          </li>
        </ol>

        <Link href="/" className="mc-nav__back">
          <IconArrowLeft />
          <span>Continue shopping</span>
        </Link>
      </nav>

      <div className="mc-shell">

        {/* ── PAGE TITLE ── */}
        <header className="mc-page-title">
          <div className="mc-page-title__left">
            <h1 className="mc-page-title__heading">
              Your Cart
              {totalCartCount > 0 && (
                <span className="mc-page-title__count">{totalCartCount}</span>
              )}
            </h1>
            <p className="mc-page-title__sub">
              Good choices deserve a second life.
            </p>
          </div>

          {/* Free shipping meter */}
          {items.length > 0 && (
            <div className="mc-ship-meter">
              <p className="mc-ship-meter__text">
                {remainingForFreeShipping === 0 ? (
                  <>Free shipping unlocked</>
                ) : (
                  <>
                    Add{" "}
                    <strong>₹{remainingForFreeShipping.toLocaleString("en-IN")}</strong>{" "}
                    for free shipping
                  </>
                )}
              </p>
              <div className="mc-ship-meter__track" role="progressbar"
                aria-valuenow={freeShippingProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Free shipping progress">
                <div
                  className="mc-ship-meter__fill"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* ── EMPTY STATE ── */}
        {items.length === 0 && (
          <div className="mc-empty">
            <div className="mc-empty__mark">
              <Image src={Logo} alt="Mangalams" width={64} height={64} className="mc-empty__logo" />
            </div>
            <p className="mc-empty__eyebrow">YOUR CART IS WAITING</p>
            <h2 className="mc-empty__heading">
              Find something that deserves<br />another life.
            </h2>
            <p className="mc-empty__body">
              Explore handcrafted traditional wear, reclaimed textiles,<br />
              and artisan-made pieces — all with a story to tell.
            </p>
            <Link href="/" className="mc-empty__cta">
              Explore Collections
            </Link>
            <div className="mc-empty__tags">
              <span>Reused</span>
              <span>Upcycled</span>
              <span>Artisan Made</span>
              <span>Handcrafted</span>
            </div>
          </div>
        )}

        {/* ── MAIN CART LAYOUT ── */}
        {items.length > 0 && (
          <div className="mc-layout">

            {/* ────── LEFT COLUMN ────── */}
            <section className="mc-items" aria-label="Cart items">

              {/* Item count label */}
              <div className="mc-items__label">
                <span>{items.length} {items.length === 1 ? "item" : "items"}</span>
              </div>

              {/* Item cards */}
              {items.map((item) => (
                <article key={item.id} className="mc-item">

                  {/* Image */}
                  <div className="mc-item__img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="mc-item__img"
                      loading="lazy"
                    />
                    {item.circularTag && (
                      <span className="mc-item__circular-tag">{item.circularTag}</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mc-item__body">
                    <div className="mc-item__top-row">
                      <div>
                        <h2 className="mc-item__name">{item.title}</h2>
                        <p className="mc-item__sub">{item.subtitle}</p>
                      </div>
                      {/* Price — desktop right-align */}
                      <div className="mc-item__price-block mc-item__price-block--desktop">
                        <p className="mc-item__price">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        {item.mrp && item.mrp > item.price && (
                          <p className="mc-item__mrp">
                            ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                          </p>
                        )}
                        {item.mrp && item.mrp > item.price && (
                          <p className="mc-item__saving">
                            −₹{((item.mrp - item.price) * item.quantity).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Variant chips */}
                    <div className="mc-item__variants">
                      {item.size && (
                        <span className="mc-item__chip">
                          <span className="mc-item__chip-label">Size</span>
                          {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="mc-item__chip">
                          <span className="mc-item__chip-label">Colour</span>
                          {item.color}
                        </span>
                      )}
                      {item.inStock && item.stockLeft && item.stockLeft <= 5 && (
                        <span className="mc-item__chip mc-item__chip--stock">
                          Only {item.stockLeft} left
                        </span>
                      )}
                    </div>

                    {/* Price — mobile */}
                    <div className="mc-item__price-block mc-item__price-block--mobile">
                      <p className="mc-item__price">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      {item.mrp && item.mrp > item.price && (
                        <>
                          <p className="mc-item__mrp">
                            ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                          </p>
                          <p className="mc-item__saving">
                            −₹{((item.mrp - item.price) * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Controls row */}
                    <div className="mc-item__actions">
                      {/* Quantity stepper */}
                      <div className="mc-qty" role="group" aria-label={`Quantity for ${item.title}`}>
                        <button
                          type="button"
                          className="mc-qty__btn"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}>
                          −
                        </button>
                        <span className="mc-qty__val" aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          className="mc-qty__btn"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          aria-label="Increase quantity">
                          +
                        </button>
                      </div>

                      {/* Divider */}
                      <span className="mc-item__actions-sep" aria-hidden="true" />

                      {/* Save for later */}
                      <button
                        type="button"
                        className="mc-item__action-link"
                        onClick={() => handleSaveForLater(item)}
                        aria-label={`Save ${item.title} for later`}>
                        <IconBookmark />
                        Save for later
                      </button>

                      {/* Divider */}
                      <span className="mc-item__actions-sep" aria-hidden="true" />

                      {/* Remove */}
                      <button
                        type="button"
                        className="mc-item__action-link mc-item__action-link--danger"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.title} from cart`}>
                        <IconTrash />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {/* ── TOOLS SECTION ── */}
              <div className="mc-tools">

                {/* Coupon accordion */}
                <div className="mc-tool">
                  {appliedCoupon ? (
                    <div className="mc-tool__applied">
                      <div className="mc-tool__applied-left">
                        <IconTag />
                        <div>
                          <p className="mc-tool__applied-code">{appliedCoupon.code}</p>
                          <p className="mc-tool__applied-desc">
                            {appliedCoupon.type === "percent"
                              ? `${appliedCoupon.discountPercent}% discount applied`
                              : `₹${appliedCoupon.flatDiscount} off applied`}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mc-tool__remove"
                        onClick={handleRemoveCoupon}
                        aria-label="Remove promo code">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="mc-tool__toggle"
                        onClick={() => setCouponOpen((o) => !o)}
                        aria-expanded={couponOpen}>
                        <span className="mc-tool__toggle-left">
                          <IconTag />
                          Have a promo code?
                        </span>
                        <span className={`mc-tool__chevron ${couponOpen ? "mc-tool__chevron--open" : ""}`}>
                          ›
                        </span>
                      </button>
                      {couponOpen && (
                        <form onSubmit={handleApplyCoupon} className="mc-tool__form">
                          <input
                            type="text"
                            className="mc-tool__input"
                            placeholder="e.g. FESTIVE20"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            aria-label="Promo code"
                          />
                          <button type="submit" className="mc-tool__btn">
                            Apply
                          </button>
                        </form>
                      )}
                      {couponError && (
                        <p className="mc-tool__error" role="alert">{couponError}</p>
                      )}
                    </>
                  )}
                </div>

                {/* Pincode accordion */}
                <div className="mc-tool">
                  <button
                    type="button"
                    className="mc-tool__toggle"
                    onClick={() => setPincodeOpen((o) => !o)}
                    aria-expanded={pincodeOpen}>
                    <span className="mc-tool__toggle-left">
                      <IconPin />
                      Check delivery
                    </span>
                    <span className={`mc-tool__chevron ${pincodeOpen ? "mc-tool__chevron--open" : ""}`}>
                      ›
                    </span>
                  </button>
                  {pincodeOpen && (
                    <form onSubmit={handleCheckPincode} className="mc-tool__form">
                      <input
                        type="text"
                        className="mc-tool__input"
                        placeholder="6-digit pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        maxLength={6}
                        aria-label="Pincode"
                      />
                      <button type="submit" className="mc-tool__btn">
                        Check
                      </button>
                    </form>
                  )}
                  {deliveryInfo && !deliveryInfo.error && (
                    <p className="mc-tool__delivery-ok" role="status">
                      Delivery to <strong>{deliveryInfo.pin}</strong> by{" "}
                      <strong>{deliveryInfo.date}</strong>. {deliveryInfo.standard}.
                    </p>
                  )}
                  {deliveryInfo?.error && (
                    <p className="mc-tool__error" role="alert">{deliveryInfo.error}</p>
                  )}
                </div>
              </div>

              {/* ── CIRCULAR IMPACT MESSAGE ── */}
              <div className="mc-impact">
                <div className="mc-impact__mark">M</div>
                <p className="mc-impact__text">
                  Every piece in your cart supports local artisan families and keeps
                  meaningful clothing in circulation — not in landfills.
                </p>
              </div>

            </section>

            {/* ────── RIGHT COLUMN — STICKY SUMMARY ────── */}
            <aside className="mc-summary-col" aria-label="Order summary">
              <div className="mc-summary">
                <h2 className="mc-summary__heading">Order Summary</h2>

                <div className="mc-summary__rows">
                  <div className="mc-summary__row">
                    <span>Subtotal (MRP)</span>
                    <span>₹{totalMrp.toLocaleString("en-IN")}</span>
                  </div>

                  {totalMrpSavings > 0 && (
                    <div className="mc-summary__row mc-summary__row--saving">
                      <span>Product discount</span>
                      <span>−₹{totalMrpSavings.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="mc-summary__row mc-summary__row--saving">
                      <span>Promo ({appliedCoupon.code})</span>
                      <span>−₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {includeGift && (
                    <div className="mc-summary__row">
                      <span>Gift packaging</span>
                      <span>+₹{giftWrapFee}</span>
                    </div>
                  )}

                  <div className="mc-summary__row">
                    <span>Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="mc-summary__free">Free</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="mc-summary__row">
                    <span>GST (5%)</span>
                    <span>₹{gstTax.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="mc-summary__divider" />

                <div className="mc-summary__total">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>

                {/* Gift wrap option */}
                <label className="mc-gift">
                  <input
                    type="checkbox"
                    checked={includeGift}
                    onChange={(e) => setIncludeGift(e.target.checked)}
                    className="mc-gift__check"
                  />
                  <div className="mc-gift__text">
                    <span className="mc-gift__title">Add gift packaging</span>
                    <span className="mc-gift__detail">
                      Handcrafted box, satin ribbon, calligraphy note · +₹149
                    </span>
                  </div>
                </label>

                {/* Checkout CTA */}
                <button
                  type="button"
                  className="mc-checkout-btn"
                  onClick={handleCheckout}>
                  {checkoutMessage ? checkoutMessage : "Proceed to checkout"}
                  {!checkoutMessage && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {/* Trust signals */}
                <ul className="mc-trust">
                  <li className="mc-trust__item">
                    <IconShield />
                    <span>Secure checkout</span>
                  </li>
                  <li className="mc-trust__item">
                    <IconTruck />
                    <span>Pan-India delivery</span>
                  </li>
                  <li className="mc-trust__item">
                    <IconReturn />
                    <span>Easy returns</span>
                  </li>
                </ul>
              </div>
            </aside>

          </div>
        )}

        {/* ── SAVED FOR LATER ── */}
        {savedItems.length > 0 && (
          <section className="mc-saved" aria-label="Saved for later">
            <h2 className="mc-section-heading">
              Saved for later
              <span className="mc-section-heading__count">{savedItems.length}</span>
            </h2>
            <div className="mc-saved__grid">
              {savedItems.map((saved) => (
                <div key={saved.id} className="mc-saved__card">
                  <img
                    src={saved.image}
                    alt={saved.title}
                    className="mc-saved__img"
                    loading="lazy"
                  />
                  <div className="mc-saved__info">
                    <h3 className="mc-saved__name">{saved.title}</h3>
                    <p className="mc-saved__price">
                      ₹{saved.price.toLocaleString("en-IN")}
                    </p>
                    <button
                      type="button"
                      className="mc-saved__move"
                      onClick={() => handleMoveToCart(saved)}>
                      Move to bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── RECOMMENDATIONS ── */}
        <section className="mc-recs" aria-label="Recommendations">
          <h2 className="mc-section-heading">Continue exploring</h2>
          <p className="mc-recs__sub">Handpicked to complement what you've chosen.</p>
          <div className="mc-recs__grid">
            {RECOMMENDATIONS.map((rec) => (
              <article key={rec.id} className="mc-rec-card">
                <div className="mc-rec-card__img-wrap">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="mc-rec-card__img"
                    loading="lazy"
                  />
                  {rec.circularTag && (
                    <span className="mc-rec-card__tag">{rec.circularTag}</span>
                  )}
                </div>
                <div className="mc-rec-card__body">
                  <div>
                    <h3 className="mc-rec-card__name">{rec.title}</h3>
                    <p className="mc-rec-card__sub">{rec.subtitle}</p>
                    <div className="mc-rec-card__pricing">
                      <span className="mc-rec-card__price">
                        ₹{rec.price.toLocaleString("en-IN")}
                      </span>
                      {rec.mrp && (
                        <span className="mc-rec-card__mrp">
                          ₹{rec.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mc-rec-card__add"
                    onClick={() => handleAddRecommendation(rec)}>
                    Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
