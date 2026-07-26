import './home_styles/products.css'

const products = () => {
  const items = [
    { title: 'Premium Sofa Set', price: '24,999', rating: '4.8', badge: 'Best seller', emoji: '🛋️' },
    { title: 'Minimal Lamp', price: '3,199', rating: '4.6', badge: 'New', emoji: '💡' },
    { title: 'Kitchen Organizer', price: '1,899', rating: '4.7', badge: 'Hot deal', emoji: '🍽️' },
    { title: 'Accent Chair', price: '8,499', rating: '4.9', badge: 'Top rated', emoji: '🪑' },
  ]

  return (
    <section className='products-section'>
      <div className='products-head'>
        <h3>Popular picks</h3>
        <a href='#'>See more</a>
      </div>

      <div className='products-grid'>
        {items.map((item) => (
          <article className='product-card' key={item.title}>
            <span className='product-badge'>{item.badge}</span>
            <div className='product-image'>{item.emoji}</div>
            <div className='product-info'>
              <h4>{item.title}</h4>
              <p className='product-price'>₹{item.price}</p>
              <p className='product-rating'>⭐ {item.rating}</p>
              <button>Add to cart</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default products
