import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { addToCart, removeFromCart } from "../../Store/Actions/cartAction";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../Store/Actions/favoriteAction';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const allCategories = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'];
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(err => console.err(err));
  }, []);

  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true)
    );

    const currentProducts = [...filteredProducts].slice(firstProduct, lastProduct);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  const itemsOfCart = useSelector((state) => state.cart.itemsOfCart || []);
  const isProductInCart = (productId, itemsOfCart) => {
    return itemsOfCart.some((cartItem) => cartItem.id === productId);
  };

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(product => product.id === productId);
    if (isProductInCart(productId, itemsOfCart)) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(addToCart(selectedProduct));
    }
  };

  const isProductInFavorites = (productId) => {
    return favorites.some((favProduct) => favProduct.id === productId);
  };

  const handleAddToFavorites = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (isProductInFavorites(productId)) {
      dispatch(removeFromFavorites(productId));
    } else {
      dispatch(addToFavorites(selectedProduct));
    }
  };

  return (
    <div className="container mt-3">
  <div className="row mb-4">
    <div className="col-md-6">
      <div>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search for Products"
          value={searchQuery}
          onChange={handleSearchChange}/>
      </div>
    </div>
    <div className="col-md-6">
      <div>
        <select
          className="form-control"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}>
          <option value="">All Categories</option>
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {currentProducts.map((product) => (
        <div key={product.id} className="col mb-4">
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card h-100 shadow-lg">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: "200px" }}/>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Brand: {product.brand}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <button
                    className="btn btn-outline-secondary me-3"
                    onClick={() => handleAddToCart(product.id)}>
                      <FontAwesomeIcon icon={faCartPlus}
                      style={{
                        color: isProductInCart(product.id, itemsOfCart) ? '#DCB2CA' : 'inherit',}} />
                    </button>
                    <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleAddToFavorites(product.id)}>
                      <FontAwesomeIcon icon={faHeart}
                      style={{color: isProductInFavorites(product.id) ? '#DCB2CA' : 'inherit',}} />
                    </button>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-light mx-2"
              onClick={() => pagination(currentPage - 1)}
              disabled={currentPage === 1}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="btn btn-light mx-2"
              onClick={() => pagination(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredProducts.length / productsPerPage)}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
  );
}

export default ProductList;
