"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/home.css";
import Image from "next/image";
import Link from "next/link";
import HomeContent from "./home_components/home_content";

import Cart from "../assets/icons/cart.png";
import Green from "../assets/icons/green.png";
import More from "../assets/icons/more.png";
import User from "../assets/icons/user.png";
import Logo from "../assets/images/M.png";

const Home = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const stored = localStorage.getItem("mangalams-cart");
        if (stored) {
          const items = JSON.parse(stored);
          if (Array.isArray(items)) {
            const count = items.reduce(
              (acc, item) => acc + (item.quantity || 1),
              0,
            );
            setCartCount(count);
            return;
          }
        }
      } catch {
        setCartCount(0);
      }
      setCartCount(0);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMoreOpen(false);
      }
    };

    if (isMoreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMoreOpen]);

  const categories = [
    "For You",
    "Best Deals",
    "Traditionals",
    "Moderns",
    "Weddings",
    "Festives",
    "Mens",
    "Womens",
    "Kids",
    "Celebrations",
    "Gifts",
    "Recycle",
  ];

  const moreMenuItems = [
    {
      group: "Orders & Support",
      items: [
        {
          title: "Track Order",
          subtitle: "Check live delivery & shipment status",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          ),
          href: "/cart",
        },
        {
          title: "24x7 Customer Care",
          subtitle: "Instant resolution & support helpline",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          ),
          href: "/#contact",
        },
        {
          title: "Wishlist & Saved Items",
          subtitle: "View your saved festive collections",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          ),
          href: "/cart",
        },
      ],
    },
    {
      group: "Offers & Benefits",
      items: [
        {
          title: "Festive Offers & Coupons",
          subtitle: "Explore active discounts & coupon codes",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          ),
          badge: "FESTIVE20",
          href: "/cart",
        },
        {
          title: "Mangalams Gift Cards",
          subtitle: "Share traditional elegance with loved ones",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="8" width="18" height="14" rx="2"></rect>
              <path d="M12 5a3 3 0 1 0-3 3h6a3 3 0 1 0-3-3Z"></path>
              <path d="M12 12h.01"></path>
              <path d="M12 8v14"></path>
            </svg>
          ),
          href: "/#gifts",
        },
        {
          title: "Artisan Circular Story",
          subtitle: "Our promise of sustainable Indian weaves",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          ),
          href: "/#about",
        },
      ],
    },
  ];

  return (
    <div className='parenthome'>
      <div className='page-shell'>
        <header className='home-header'>
          <div className='promo-strip' aria-label='announcement bar'>
            <div className='promo-track'>
              <span>
                Free shipping on orders above ₹399 • New arrivals every week •
                Festive collections now live
              </span>
              <span>
                Free shipping on orders above ₹399 • New arrivals every week •
                Festive collections now live
              </span>
              <span>
                Free shipping on orders above ₹399 • New arrivals every week •
                Festive collections now live
              </span>
            </div>
          </div>

          <div className='top-bar'>
            <div className='top-bar-left'>
              <Image
                src={Logo}
                alt='Mangalams logo'
                className='logo'
                width={50}
                height={50}
              />
              <h4 className='brand'>Mangalams</h4>
            </div>
            <div className='search-bar'>
              <input
                className='search-input'
                placeholder='Search for Products, Brands and More'
              />
            </div>
            <div className='top-bar-right'>
              <Link className='top-action' href='/accounts'>
                <div className='logosp'>
                  <Image
                    src={User}
                    alt='Account'
                    className='icon'
                    width={24}
                    height={24}
                  />
                </div>
                <h4>Account</h4>
              </Link>

              {/* More button with dropdown */}
              <div className='more-dropdown-wrapper' ref={moreRef}>
                <button
                  type='button'
                  className={`top-action more-trigger ${isMoreOpen ? "active" : ""}`}
                  onClick={() => setIsMoreOpen((prev) => !prev)}
                  aria-expanded={isMoreOpen}
                  aria-haspopup='true'
                  aria-label='More options'>
                  <div className='logosp'>
                    <Image
                      src={More}
                      alt='More options'
                      className='icon'
                      width={24}
                      height={24}
                    />
                  </div>
                  <h4>More</h4>
                  <span className={`more-arrow ${isMoreOpen ? "rotated" : ""}`}>
                    ▾
                  </span>
                </button>

                {isMoreOpen && (
                  <div className='more-dropdown-menu' role='menu'>
                    <div className='more-dropdown-header'>
                      <span className='more-dropdown-eyebrow'>MANGALAMS CONCIERGE</span>
                      <h5>Services & Quick Access</h5>
                    </div>

                    <div className='more-dropdown-body'>
                      {moreMenuItems.map((group) => (
                        <div className='more-menu-group' key={group.group}>
                          <span className='more-group-title'>{group.group}</span>
                          {group.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className='more-menu-item'
                              onClick={() => setIsMoreOpen(false)}>
                              <div className='more-item-icon'>{item.icon}</div>
                              <div className='more-item-text'>
                                <div className='more-item-title-row'>
                                  <span className='more-item-title'>{item.title}</span>
                                  {item.badge && (
                                    <span className='more-item-badge'>{item.badge}</span>
                                  )}
                                </div>
                                <span className='more-item-sub'>{item.subtitle}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className='more-dropdown-footer'>
                      <div className='more-contact-pill'>
                        <span>Need immediate help?</span>
                        <a href='tel:+919876543210' className='more-call-btn'>
                          Call +91 98765 43210
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                className='top-action cart'
                href='/cart'
                data-count={cartCount}>
                <div className='logosp'>
                  <Image
                    src={Cart}
                    alt='Cart'
                    className='icon'
                    width={24}
                    height={24}
                  />
                </div>
                <h4>Cart</h4>
              </Link>
            </div>
          </div>

          <div className='category-strip'>
            {categories.map((item) => (
              <button
                key={item}
                className={`category-pill ${item === "For You" ? "active" : ""}`}>
                {item}
              </button>
            ))}
          </div>
        </header>

        <main className='home-main'>
          <HomeContent />
        </main>

        <footer className='page-footer'>
          <div className='footer-inner'>
            <div>
              <h4>Mangalams</h4>
              <p className='footer_p'>
                <span>Traditional products</span> made for
                <span> Modern INDIA</span>.
              </p>
            </div>
            <div>
              <p>
                <strong>Customer Care</strong>
              </p>
              <p>help@mangalms.com</p>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <p>
                <strong>Quick Links</strong>
              </p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
          <p className='footer-copy'>
            © 2026 Mangalams E-commerce . All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;