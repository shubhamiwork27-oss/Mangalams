// home.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/home.css'
import Home_content from './home_components/home_content'

//components import 
import Cart from '../assets/icons/cart.png'
import More from '../assets/icons/more.png'
import User from '../assets/icons/user.png'






const Home = () => {
  const headerRef = useRef(null)
  const mainRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      [headerRef.current, mainRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.1 }
    )
  }, [])

  const categories = [
    'For You',
    'Best Deals',
    'Traditionals',
    'Moderns',
    'Weddings',
    'Festives',
    'Mens',
    'Womens',
    'Kids',
    'Ages',
    'Celebrations',
    'Gifts',
    'Accessories',
  ]

  return (
    <div className='parenthome'>
      <div className='page-shell'>
        <header className='home-header' ref={headerRef}>
          <div className='promo-strip' aria-label='announcement bar'>
            <div className='promo-track'>
              <span>Free shipping on orders above ₹999 • New arrivals every week • Festive collections now live</span>
              <span>Free shipping on orders above ₹999 • New arrivals every week • Festive collections now live</span>
            </div>
          </div>

          <div className='top-bar'>
            
            <div className='top-bar-left'>
              <div className="logo"></div>
              <h4 className='brand'>Mangalms</h4>
            </div>
            <div className='search-bar'>
            <input className='search-input' placeholder='Search for Products, Brands and More' />
          </div>
            <div className='top-bar-right'>
              <button className='top-action'>
                <div className="logosp" >
                  <img src={User} alt="" className='icon'/>
                  </div>  
                  <h4>Account</h4></button>
              <button className='top-action'>
                <div className="logosp">
                  <img src={More} alt="" className='icon'/>
                </div>
                <h4>More</h4></button>
              <button className='top-action cart'>
                <div className="logosp">
                  <img src={Cart} alt="" className='icon' />
                </div>
                <h4>Cart</h4></button>
            </div>
          </div>



          <div className='category-strip'>
            {categories.map((item) => (
              <button key={item} className={`category-pill ${item === 'For You' ? 'active' : ''}`}>
                {item}
              </button>
            ))}
          </div>
        </header>

        <main className='home-main' ref={mainRef}>
          <Home_content />
        </main>
      </div>
    </div>
  )
}

export default Home