import './home_styles/products.css'

const products = () => {
  const items = [
    { title: 'Premium Sofa Set', price: '24,999', badge: 'Best seller', image: 'https://via.placeholder.com/560x420?text=Premium+Sofa+Set' },
    { title: 'Minimal Lamp', price: '3,199', badge: 'New', image: 'https://via.placeholder.com/560x420?text=Minimal+Lamp' },
    { title: 'Kitchen Organizer', price: '1,899', badge: 'Hot deal', image: 'https://via.placeholder.com/560x420?text=Kitchen+Organizer' },
    { title: 'Accent Chair', price: '8,499', badge: 'Top rated', image: 'https://via.placeholder.com/560x420?text=Accent+Chair' },
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
            <div className='product-image'>
              <img src={item.image} alt={item.title} />
            </div>
            <div className='product-info'>
              <h4>{item.title}</h4>
              <p className='product-price'>₹{item.price}</p>
              <button>Add to cart</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default products
