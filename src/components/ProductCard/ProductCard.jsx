import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;

  return (
    <article className="product-card">

      {/* Image */}
      <div className="product-image-wrapper">

        <Link to={`/products/${product.id}`}>
          <img
            src={product.featured_image}
            alt={product.title}
            className="product-image"
          />
        </Link>

        <button
          className="wishlist-btn"
          type="button"
          aria-label="Add to wishlist"
        >
          <Heart size={19} />
        </button>

        {isOutOfStock && (
          <span className="stock-badge">
            Out of Stock
          </span>
        )}

      </div>

      {/* Info */}
      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">

          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          <button
            className="add-cart-btn"
            type="button"
            disabled={isOutOfStock}
          >
            <ShoppingCart size={17} />

            {isOutOfStock ? "Out of Stock" : "Add"}
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;