import '../../styles/filter.css'

const home_filter = () => {
  const filters = ['New Arrivals', 'Best Sellers', 'Offers', 'Furniture', 'Decor', 'Fashion']

  return (
    <div className='home-filter'>
      <div className='filter-pill-row'>
        {filters.map((item) => (
          <span className='filter-pill' key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}

export default home_filter
