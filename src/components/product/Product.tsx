import React from 'react';
import "./product.css"

class Product extends React.Component<{dataset:ProductResponse}> {

  render() {
    return (
      <div className='product-container'>
        <div style={{backgroundImage: `url(${this.props.dataset.thumbnail})`}} className = 'product__img'></div>
        <div className='product__description'>
          <span className='product__title'>{this.props.dataset.title}</span>
          <p className='product__description-text'>{this.props.dataset.description}</p>
          <div className='product__raiting'>
            <div className='product__rating_active' style={{width: `calc(100%*(${this.props.dataset.rating}/5))`}}></div>
            <span>{this.props.dataset.rating}</span>
          </div>
        </div>
        <div className='product__price'>
          <span>From {this.props.dataset.price} Or</span>
          <a href="#" className='add'>Add to cart</a>
        </div>
      </div>
    )
  }
}

interface ProductResponse {
  brand: string,
  category: string,
  description: string,
  discountPercentage: number,
  id: number,
  images: string[],
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  title: string,
}

export default Product