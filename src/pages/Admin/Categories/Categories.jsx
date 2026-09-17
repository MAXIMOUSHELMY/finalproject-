import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2, Tags } from "lucide-react";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", products: 12 },
    { id: 2, name: "Fashion", products: 18 },
    { id: 3, name: "Sports", products: 8 },
    { id: 4, name: "Accessories", products: 14 },
    { id: 5, name: "Home", products: 10 },
  ]);

  const [search, setSearch] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!newCategory.trim()) return;

    const category = {
      id: Date.now(),
      name: newCategory.trim(),
      products: 0,
    };

    setCategories((prev) => [...prev, category]);
    setNewCategory("");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );
  };

  return (
    <div className="admin-categories-page">

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-label">CATALOG</span>
          <h1>Categories</h1>
          <p>
            Organize your products into categories.
          </p>
        </div>

        <button
          className="admin-primary-btn"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Add Category */}
      {showForm && (
        <form
          className="admin-category-add-form"
          onSubmit={handleAdd}
        >
          <div className="admin-form-group">
            <label htmlFor="categoryName">
              Category Name
            </label>

            <input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) =>
                setNewCategory(e.target.value)
              }
            />
          </div>

          <div className="admin-category-form-actions">
            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() => {
                setShowForm(false);
                setNewCategory("");
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-primary-btn"
            >
              Add Category
            </button>
          </div>
        </form>
      )}

      {/* Toolbar */}
      <div className="admin-products-toolbar">
        <div className="admin-search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {/* Categories */}
      <div className="admin-table-wrapper">
        {filteredCategories.length > 0 ? (
          <table className="admin-table">

            <thead>
              <tr>
                <th>Category</th>
                <th>Products</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>

                  <td>
                    <div className="admin-category-cell">
                      <div className="admin-category-icon">
                        <Tags size={18} />
                      </div>

                      <strong>
                        {category.name}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {category.products}
                  </td>

                  <td>
                    <span className="admin-stock-status available">
                      Active
                    </span>
                  </td>

                  <td>
                    <div className="admin-table-actions">

                      <button
                        type="button"
                        className="admin-action-btn edit"
                        title="Edit Category"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="admin-action-btn delete"
                        title="Delete Category"
                        onClick={() =>
                          handleDelete(category.id)
                        }
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        ) : (
          <div className="admin-empty-state">
            <Tags size={42} />
            <h2>No Categories Found</h2>
            <p>
              Try another search.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Categories;