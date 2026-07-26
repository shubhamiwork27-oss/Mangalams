import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../../styles/home_content.css'
import Products from './products'

const home_content = () => {
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const promoRef = useRef(null)
  const quickLinksRef = useRef(null)

  useEffect(() => {
    const sections = [heroRef, featuredRef, promoRef, quickLinksRef]

    const handleScroll = () => {
      sections.forEach((ref) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const isVisible = rect.top < windowHeight && rect.bottom > 0

        if (isVisible) {
          // Premium parallax calculation
          const scrollProgress = 1 - (rect.top / windowHeight)
          const offset = scrollProgress * 40 * 0.05
          gsap.to(ref.current, {
            y: offset,
            duration:1,
            ease: 'expo.inOut',
            overwrite: 'auto'
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className='homecontent-inner'>
      <section className='hero-section' ref={heroRef}>
        <div className='hero-card hero-primary'>
          <div>
            <img src="" alt="" />
          </div>
        </div>

        <div className='hero-row'>
          <div className='hero-card hero-small'>
            <img src="" alt="" />
          </div>
          <div className='hero-card hero-small'>
            <img src="" alt="" />
          </div>
        </div>
      </section>

      <section className='featured-section' ref={featuredRef}>
        <div className='featured-head'>
          <div>
            <p className='featured-label'>Still looking for these?</p>
            <h3>Popular choices you might like</h3>
          </div>
          <button className='view-all'>View Store</button>
        </div>
        <div className='featured-grid'>
          <article className='featured-card'>
            <div className='featured-image'>
              <span>👞</span>
            </div>
            <p>Men's Formal Shoes</p>
          </article>
          <article className='featured-card'>
            <div className='featured-image'>
              <span>👟</span>
            </div>
            <p>Men's Sports Shoes</p>
          </article>
          <article className='featured-card future-card'>
            <div className='featured-image'>
              <span>➡️</span>
            </div>
            <p>More options</p>
          </article>
        </div>
      </section>

      <section className='promo-section' ref={promoRef}>
        <div className='section-header'>
          <div>
            <p className='featured-label'>Fresh arrivals</p>
            <h3>Deals curated for your day</h3>
          </div>
          <button className='view-all'>Browse Deals</button>
        </div>
        <div className='promo-cards'>
          <article className='promo-card'>
            <span>⚡</span>
            <p>Lightning offers on daily essentials</p>
          </article>
          <article className='promo-card'>
            <span>🏷️</span>
            <p>Extra savings with bank and wallet cashback</p>
          </article>
          <article className='promo-card'>
            <span>🚚</span>
            <p>Express delivery across your city in under 24 hours</p>
          </article>
        </div>
      </section>

      <section className='quick-links' ref={quickLinksRef}>
        <article className='quick-card'>
          <strong>Top picks</strong>
          <p>Recommended products chosen for your taste.</p>
        </article>
        <article className='quick-card'>
          <strong>Bank offers</strong>
          <p>Extra discounts from trusted partner banks.</p>
        </article>
        <article className='quick-card'>
          <strong>New launches</strong>
          <p>Explore trending launches before they sell out.</p>
        </article>
        <article className='quick-card'>
          <strong>Customer favorites</strong>
          <p>Best-rated products loved by shoppers like you.</p>
        </article>
      </section>

      <Products />
    </div>
  )
}

export default home_content
