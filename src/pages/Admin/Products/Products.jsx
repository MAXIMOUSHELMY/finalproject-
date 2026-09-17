import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  AlertTriangle,
} from "lucide-react";
import { featuredProducts } from "../../../utils/mockData";

function AdminProducts() {
  const [products, setProducts] = useState(featuredProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(featuredProducts.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-products-page">

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-label">INVENTORY</span>
          <h1>Products</h1>
          <p>Manage your store products and inventory.</p>
        </div>

        <Link to="/admin/products/add" className="admin-primary-btn">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="admin-product-stats">

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Package size={20} />
          </div>

          <div>
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon warning">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Low Stock</span>
            <strong>
              {products.filter(
                (product) => product.stock > 0 && product.stock <= 5
              ).length}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon danger">
            <Package size={20} />
          </div>

          <div>
            <span>Out of Stock</span>
            <strong>
              {products.filter((product) => product.stock === 0).length}
            </strong>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="admin-products-toolbar">

        <div className="admin-search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-filter-select"
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

      {/* Products Table */}
      <div className="admin-table-wrapper">

        {filteredProducts.length > 0 ? (
          <table className="admin-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {

                const stockStatus =
                  product.stock === 0
                    ? "out"
                    : product.stock <= 5
                    ? "low"
                    : "available";

                return (
                  <tr key={product.id}>

                    {/* Product */}
                    <td>
                      <div className="admin-product-cell">

                        <img
                          src={product.featured_image}
                          alt={product.title}
                        />

                        <div>
                          <strong>{product.title}</strong>
                          <span>#{product.id}</span>
                        </div>

                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="admin-category-badge">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td>
                      <strong>${product.price.toFixed(2)}</strong>
                    </td>

                    {/* Stock */}
                    <td>{product.stock}</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`admin-stock-status ${stockStatus}`}
                      >
                        {stockStatus === "out"
                          ? "Out of Stock"
                          : stockStatus === "low"
                          ? "Low Stock"
                          : "Available"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="admin-table-actions">

                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="admin-action-btn edit"
                          title="Edit Product"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          type="button"
                          className="admin-action-btn delete"
                          title="Delete Product"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        ) : (
          <div className="admin-empty-state">

            <Package size={42} />

            <h2>No Products Found</h2>

            <p>
              Try changing your search or category filter.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminProducts;