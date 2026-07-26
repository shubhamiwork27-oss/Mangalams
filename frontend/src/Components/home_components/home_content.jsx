import '../../styles/home_content.css'
import '../../styles/home_content.css'
import Products from './products'

const home_content = () => {
  return (
    <div className='homecontent-inner'>
      <section className='hero-section'>
        <div className='hero-card hero-primary'>
          <div>
            <p className='hero-title'>Big savings on your favorite brands</p>
            <h2>Shop the latest collections today</h2>
            <p>Exclusive deals, instant offers and quick delivery on trending essentials.</p>
          </div>
          <div className='hero-badge'>Best of Mangalms</div>
        </div>

        <div className='hero-row'>
          <div className='hero-card hero-small'>
            <p className='hero-small-title'>Ergonomic office chairs</p>
            <p className='hero-small-sub'>From ₹2,799</p>
          </div>
          <div className='hero-card hero-small'>
            <p className='hero-small-title'>Nitro 75 QLED 4K TV</p>
            <p className='hero-small-sub'>Just ₹62,424*</p>
          </div>
        </div>
      </section>

      <section className='featured-section'>
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

      <section className='promo-section'>
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

      <section className='quick-links'>
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
