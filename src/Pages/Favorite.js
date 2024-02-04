import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavorites } from '../Store/Actions/favoriteAction';

const Favorite = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div className="container-fluid">
      {favorites.length === 0 ? (
        <div className="text-center my-2">
          <h4 className="my-4 ">
            Your Favorites List is Empty.
          </h4>
        </div>
      ) : (
        <div className="row">
          {favorites.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4">
              <div className="card product-card mb-4">
                <Link
                  to={`/products/${product.id}`}
                >
                  <img
                    src={product.thumbnail || `${process.env.PUBLIC_URL}/image-notfound.jpg`}
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="favorites-icon">
                  <i
                    className={`fas fa-heart${favorites.some(
                      (favproduct) => favproduct.id === product.id
                    )
                      ? " text-danger"
                      : "-broken text-danger"
                      }`}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      fontSize: "2rem",
                    }}
                    onClick={() => handleRemoveFromFavorites(product.id)}
                  ></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
