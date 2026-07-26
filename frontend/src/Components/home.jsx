// home.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/home.css'
import Home_content from './home_components/home_content'

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
    'Gen-zs',
    'Millenials',
    'Celebrations',
    'Gifts',
    'Accessories',
    'Footwears',
  ]

  return (
    <div className='parenthome'>
      <div className='page-shell'>
        <header className='home-header' ref={headerRef}>
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
                <div className="logosp" ></div>  Account</button>
              <button className='top-action'>More</button>
              <button className='top-action cart'>
                <div className="logosp"></div>
                Cart</button>
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