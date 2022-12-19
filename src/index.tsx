import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Product from './components/product/Product';

const prodData = {
  brand: "Apple",
  category: "smartphones",
  description: "An apple mobile which is nothing like apple",
  discountPercentage: 12.96,
  id: 1,
  images: [
    'https://i.dummyjson.com/data/products/1/1.jpg', 
    'https://i.dummyjson.com/data/products/1/2.jpg', 
    'https://i.dummyjson.com/data/products/1/3.jpg', 
    'https://i.dummyjson.com/data/products/1/4.jpg', 
    'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
  ],
  price: 549,
  rating: 4.69,
  stock: 94,
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  title: "iPhone 9"
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Product dataset = {prodData}/>
  </React.StrictMode>
);

