"use client";

import { useEffect, useState } from "react";
import "../styles/home.css";
import Image from "next/image";
import Link from "next/link";
import HomeContent from "./home_components/home_content";

import Cart from "../app/assets/icons/cart.png";
import Green from "../app/assets/icons/green.png";
import More from "../app/assets/icons/more.png";
import User from "../app/assets/icons/user.png";
import Logo from "../app/assets/images/M.png";

const Home = () => {
  const [cartCount, setCartCount] = useState(0);

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
              <button className='top-action'>
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
              </button>
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
