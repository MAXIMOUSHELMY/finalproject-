import { Link } from "react-router-dom";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { featuredProducts } from "../../utils/mockData";

function Home() {
  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  const handleAddToWishlist = (product) => {
    console.log("Add to wishlist:", product);
  };

  return (
    <main className="home-page">
      <section className="hero-section">
  <div className="hero-content">
    <span className="hero-label">
      Welcome to our store
    </span>

    <h1>
      Everything You Need,
      <br />
      All in One Place.
    </h1>

    <p>
      Discover our collection of quality products
      and find what suits you best.
    </p>

    <div className="hero-actions">
      <Link to="/products" className="primary-button">
        Shop Now
      </Link>

      <Link to="/register" className="secondary-button">
        Create Account
      </Link>
    </div>
  </div>
</section>
      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span>Our Collection</span>
            <h2>Featured Products</h2>
          </div>

          <Link to="/products" className="view-all">
            View All
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </section>
    </main>
  );
}

export default Home;