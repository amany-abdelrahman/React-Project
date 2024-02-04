import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products`)
      .then(res => {
        const products = res.data.products;
        const productById = products.filter(product => product.id === parseInt(productId))[0];
        setProductData(productById);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  if (!productData) {
    return <div></div>;
  }

  const productImage = productData.images && productData.images.length > 0 ? productData.images[0] : '';

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <img src={productImage} alt={productData.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h3>{productData.title}</h3>
          <p>Description: {productData.description}</p>
          <p>Category: {productData.category}</p>
          <p>Price: ${productData.price}</p>
          <p>Discount: {productData.discountPercentage}%</p>
          <p>Brabd: {productData.brand}</p>
          <p>Rating: {productData.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
