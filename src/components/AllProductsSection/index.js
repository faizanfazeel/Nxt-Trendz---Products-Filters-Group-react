import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    isFetchFailed: false,
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    categoryId: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied
    const {activeOptionId, titleSearch, rating, categoryId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&title_search=${titleSearch}&rating=${rating}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isFetchFailed: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  FilteredProductsData = categoryId => {
    this.setState({categoryId}, this.getProducts)
  }

  SearchProducts = name => {
    this.setState({titleSearch: name}, this.getProducts)
  }

  ratingProducts = value => {
    this.setState({rating: value}, this.getProducts)
  }

  clearAllFilters = () => {
    this.setState(
      {
        rating: '',
        categoryId: '',
        titleSearch: '',
        activeOptionId: sortbyOptions[0].optionId,
        productsList: [],
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    return (
      <>
        {productsList.length > 0 ? (
          <div className="all-products-container">
            <ProductsHeader
              activeOptionId={activeOptionId}
              sortbyOptions={sortbyOptions}
              changeSortby={this.changeSortby}
            />
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="all-products-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png "
              className="no-products"
              alt="no products"
            />
            <h1 className="wrong-message">No Products Found</h1>
            <p className="wrong-description">
              We could not find any products. Try another filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="all-products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png  "
        className="failed"
        alt="products failure"
      />
      <h1 className="wrong-message">Oops! something went wrong</h1>
      <p className="wrong-description">
        we are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  render() {
    const {isLoading, isFetchFailed} = this.state

    return (
      <div className="all-products-section">
        {isFetchFailed ? (
          this.renderFailureView()
        ) : (
          <>
            <FiltersGroup
              categoryOptions={categoryOptions}
              FilteredProductsData={this.FilteredProductsData}
              SearchProducts={this.SearchProducts}
              ratingProducts={this.ratingProducts}
              clearAllFilters={this.clearAllFilters}
              ratingsList={ratingsList}
              categoryOptionsList={categoryOptions}
            />
            {isLoading ? this.renderLoader() : this.renderProductsList()}
          </>
        )}
      </div>
    )
  }
}

export default AllProductsSection
