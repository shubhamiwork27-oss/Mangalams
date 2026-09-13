"use client";

import "../styles/home.css";
import Image from "next/image";
import HomeContent from "./home_components/home_content";

import Cart from "../assets/icons/cart.png";
import Green from "../assets/icons/green.png";
import More from "../assets/icons/more.png";
import User from "../assets/icons/user.png";
import Logo from "../assets/images/M.png";

const Home = () => {
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
    "Accessories",
    "Picks",
  ];

  return (
    <div className='parenthome'>
      <div className='page-shell'>
        <header className='home-header'>
          <div className='promo-strip' aria-label='announcement bar'>
            <div className='promo-track'>
              <span>
                Free shipping on orders above ₹999 • New arrivals every week •
                Festive collections now live
              </span>
              <span>
                Free shipping on orders above ₹999 • New arrivals every week •
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
                width={48}
                height={48}
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
              <button className='top-action'>
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
              </button>
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
              <button className='top-action cart'>
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
              </button>
            </div>
            <div className='top-bar-circle' aria-hidden='true'>
              <Image
                src={Green}
                alt=''
                width={34}
                height={34}
                className='top-bar-circle-icon'
              />
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
