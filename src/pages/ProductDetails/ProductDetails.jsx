import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { featuredProducts } from "../../utils/mockData";

function ProductDetails() {
  const { id } = useParams();

  const product = featuredProducts.find(
    (item) => item.id.toString() === id
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="not-found-page">
        <h1>Product Not Found</h1>

        <Link to="/products">
          Back to Products
        </Link>
      </main>
    );
  }

  const isOutOfStock = product.stock === 0;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity = Math.min(
        existingItem.quantity + quantity,
        product.stock
      );
    } else {
      cart.push({
        ...product,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart");
  };

  return (
    <main className="product-details-page">

      <Link to="/products" className="back-link">
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <section className="product-details">

        {/* Image */}
        <div className="product-details-image">
          <img
            src={product.featured_image}
            alt={product.title}
          />
        </div>

        {/* Info */}
        <div className="product-details-info">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="product-details-price">
            ${product.price.toFixed(2)}
          </div>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-stock">
            {isOutOfStock
              ? "Out of Stock"
              : `${product.stock} items available`}
          </div>

          {!isOutOfStock && (
            <>
              <div className="quantity-control">

                <button onClick={decreaseQuantity}>
                  −
                </button>

                <span>{quantity}</span>

                <button onClick={increaseQuantity}>
                  +
                </button>

              </div>

              <div className="product-actions">

                <button
                  className="add-cart-button"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <button className="wishlist-button">
                  <Heart size={20} />
                </button>

              </div>
            </>
          )}

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;