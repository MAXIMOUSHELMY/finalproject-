import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { featuredProducts } from "../../utils/mockData";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    ...new Set(featuredProducts.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    let products = [...featuredProducts];

    if (search.trim()) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      products = products.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      products.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return products;
  }, [search, category, sort]);

  return (
    <main className="products-page">

      <section className="products-header">
        <div>
          <span className="section-label">OUR COLLECTION</span>

          <h1>All Products</h1>

          <p>
            Discover our collection and find what suits you best.
          </p>
        </div>
      </section>

      <section className="products-content">

        {/* Filters */}
        <div className="products-toolbar">

          <div className="search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <SlidersHorizontal size={18} />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>

        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="empty-products">
            <h2>No products found</h2>
            <p>Try another search or category.</p>
          </div>
        )}

      </section>

    </main>
  );
}

export default Products;