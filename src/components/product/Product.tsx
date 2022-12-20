import React from 'react';
import "./product.css"

export function Product(props:{dataset:ProductResponse}) {
  return (
    <div className='product-container'>
      <div style={{backgroundImage: `url(${props.dataset.thumbnail})`}} className = 'product__img'></div>
      <div className='product__description'>
        <span className='product__title'>{props.dataset.title}</span>
        <p className='product__description-text'>{props.dataset.description}</p>
        <div className='product__raiting'>
          <div className='product__rating_active' style={{width: `calc(100%*(${props.dataset.rating}/5))`}}></div>
          <span>{props.dataset.rating}</span>
        </div>
      </div>
      <div className='product__price'>
        <span>From {props.dataset.price} Or</span>
        <a href="#" className='add'>Add to cart</a>
      </div>
    </div>
  )
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