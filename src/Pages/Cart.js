import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../Store/Actions/favoriteAction";

const Cart = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((sum, product) => sum + product.price, 0);
  const totalWithTaxes = totalPrice + (totalPrice * 0.1);

  return (
    <div className="container-fluid">
      {cartItems.length === 0 ? (
        <div className="text-center my-2">
          <h4 className="my-4 ">
            Your cart is Empty.
          </h4>
        </div>
      ) : (
        <div className="row">
          {cartItems.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
              <div className="card product-card mb-4">
                <Link to={`/products/${product.id}`}>
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
                    onClick={() =>
                      favorites.some(
                        (favproduct) => favproduct.id === product.id
                      )
                        ? dispatch(removeFromFavorites(product.id))
                        : dispatch(
                          addToFavorites({
                            id: product.id,
                            thumbnail: product.thumbnail,
                            title: product.title,
                            rating: product.rating,
                            price: product.price,
                          })
                        )
                    }
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
      {cartItems.length > 0 && (
        <div className="text-right mb-5 mt-2">
          <p className="text-light">
            <b>Total Price:</b> ${totalPrice.toFixed(2)}
          </p>
          <p className="text-light">
            <b>Taxes:</b> 10%
          </p>
          <hr className="text-light" />
          <h4 className="text-light">
            <b>Total with Taxes:</b> ${(totalWithTaxes).toFixed(2)}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
