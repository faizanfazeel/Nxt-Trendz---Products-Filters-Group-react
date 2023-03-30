import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    categoryOptionsList,
    FilteredProductsData,
    SearchProducts,
    ratingProducts,
    clearAllFilters,
  } = props

  const onSearching = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      SearchProducts(event.target.value)
    }
  }

  const onSelectingCategory = category => {
    FilteredProductsData(category)
  }

  const onSelectingRating = value => {
    ratingProducts(value)
  }

  const onClearingFilters = () => {
    clearAllFilters()
  }

  return (
    <div className="filters-group-container">
      <div className="search-bar-container">
        <input
          type="search"
          className="app-store-search"
          placeholder="Search"
          onKeyPress={onSearching}
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
          className="search-icon"
          alt="search icon"
        />
      </div>
      <h1 className="category">Category</h1>
      {categoryOptionsList.map(each => (
        <button
          key={each.categoryId}
          className="button"
          type="button"
          onClick={() => onSelectingCategory(`${each.categoryId}`)}
        >
          <p className="name">{each.name}</p>
        </button>
      ))}
      <h1 className="category">Rating</h1>

      {ratingsList.map(each => (
        <button
          key={each.ratingId}
          className="button"
          type="button"
          onClick={() => onSelectingRating(`${each.ratingId}`)}
        >
          <img
            src={each.imageUrl}
            className="rating-button"
            alt={`rating ${each.ratingId}`}
          />
        </button>
      ))}
      <button
        className="clear-button"
        type="button"
        onClick={onClearingFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
