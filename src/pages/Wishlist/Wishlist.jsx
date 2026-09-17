import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(savedWishlist);
  }, []);

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    updateWishlist(updatedWishlist);
  };

  const moveToCart = (product) => {
    if (product.stock === 0) {
      return;
    }

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity = Math.min(
        existingItem.quantity + 1,
        product.stock
      );
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <main className="wishlist-page">

        <div className="empty-wishlist">
          <Heart size={60} />

          <h1>Your Wishlist is Empty</h1>

          <p>
            Save products you love and come back to them
            later.
          </p>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Browse Products
          </Link>
        </div>

      </main>
    );
  }

  return (
    <main className="wishlist-page">

      <div className="wishlist-header">
        <span className="section-label">
          YOUR FAVORITES
        </span>

        <h1>Wishlist</h1>

        <p>
          Products you've saved for later.
        </p>
      </div>

      <section className="wishlist-grid">

        {wishlist.map((product) => {
          const isOutOfStock = product.stock === 0;

          return (
            <article
              className="wishlist-card"
              key={product.id}
            >

              <div className="wishlist-image">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.featured_image}
                    alt={product.title}
                  />
                </Link>

                <button
                  className="wishlist-remove"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="wishlist-info">

                <span className="product-category">
                  {product.category}
                </span>

                <Link
                  to={`/products/${product.id}`}
                  className="product-title"
                >
                  {product.title}
                </Link>

                <div className="wishlist-bottom">

                  <strong className="product-price">
                    ${product.price.toFixed(2)}
                  </strong>

                  <button
                    className="add-cart-btn"
                    disabled={isOutOfStock}
                    onClick={() =>
                      moveToCart(product)
                    }
                  >
                    <ShoppingCart size={16} />

                    {isOutOfStock
                      ? "Out of Stock"
                      : "Move to Cart"}
                  </button>

                </div>

              </div>

            </article>
          );
        })}

      </section>

    </main>
  );
}

export default Wishlist;