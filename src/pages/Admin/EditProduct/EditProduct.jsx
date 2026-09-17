import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ImagePlus,
  Save,
  X,
} from "lucide-react";
import { featuredProducts } from "../../../utils/mockData";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = featuredProducts.find(
    (item) => String(item.id) === String(id)
  );

  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || "",
    category: product?.category || "",
    featured_image: product?.featured_image || "",
    is_virtual: product?.is_virtual || false,
  });

  const [media, setMedia] = useState(
    product?.media?.length
      ? product.media
      : [""]
  );

  const categories = [
    "Electronics",
    "Fashion",
    "Sports",
    "Accessories",
    "Home",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMediaChange = (index, value) => {
    const updatedMedia = [...media];

    updatedMedia[index] = value;

    setMedia(updatedMedia);
  };

  const addMediaField = () => {
    setMedia((prev) => [...prev, ""]);
  };

  const removeMediaField = (index) => {
    setMedia((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: product?.id,
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      media: media.filter(
        (item) => item.trim() !== ""
      ),
    };

    console.log("Updated Product:", updatedProduct);

    navigate("/admin/products");
  };

  if (!product) {
    return (
      <div className="admin-empty-state">
        <h2>Product Not Found</h2>

        <p>
          The product you are trying to edit does not exist.
        </p>

        <Link
          to="/admin/products"
          className="admin-primary-btn"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-product-form-page">

      {/* Header */}
      <div className="admin-page-header">
        <div>

          <Link
            to="/admin/products"
            className="admin-back-link"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

          <span className="admin-page-label">
            INVENTORY
          </span>

          <h1>Edit Product</h1>

          <p>
            Update product information and inventory.
          </p>

        </div>
      </div>

      <form
        className="admin-product-form"
        onSubmit={handleSubmit}
      >

        {/* Basic Information */}
        <section className="admin-form-section">

          <div className="admin-form-section-header">
            <div>
              <h2>Basic Information</h2>

              <p>
                Update the main information about this product.
              </p>
            </div>
          </div>

          <div className="admin-form-grid">

            <div className="admin-form-group full">

              <label htmlFor="title">
                Product Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            <div className="admin-form-group full">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>

        {/* Pricing & Inventory */}
        <section className="admin-form-section">

          <div className="admin-form-section-header">
            <div>

              <h2>Pricing & Inventory</h2>

              <p>
                Update price, stock and category.
              </p>

            </div>
          </div>

          <div className="admin-form-grid">

            <div className="admin-form-group">

              <label htmlFor="price">
                Price
              </label>

              <div className="admin-input-with-prefix">

                <span>$</span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="admin-form-group">

              <label htmlFor="stock">
                Stock
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
              />

            </div>

            <div className="admin-form-group">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            <div className="admin-form-group admin-checkbox-group">

              <label className="admin-checkbox-label">

                <input
                  type="checkbox"
                  name="is_virtual"
                  checked={formData.is_virtual}
                  onChange={handleChange}
                />

                <span>
                  Virtual Product
                </span>

              </label>

              <small>
                Enable this if the product does not require
                physical delivery.
              </small>

            </div>

          </div>

        </section>

        {/* Product Images */}
        <section className="admin-form-section">

          <div className="admin-form-section-header">
            <div>

              <h2>Product Images</h2>

              <p>
                Update the featured image and additional media.
              </p>

            </div>
          </div>

          <div className="admin-form-group full">

            <label htmlFor="featured_image">
              Featured Image URL
            </label>

            <div className="admin-image-input">

              <ImagePlus size={19} />

              <input
                id="featured_image"
                name="featured_image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.featured_image}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admin-media-section">

            <div className="admin-media-header">

              <label>
                Additional Media
              </label>

              <button
                type="button"
                className="admin-secondary-btn"
                onClick={addMediaField}
              >
                + Add Image
              </button>

            </div>

            {media.map((item, index) => (
              <div
                className="admin-media-row"
                key={index}
              >

                <input
                  type="url"
                  placeholder={`Media image URL ${index + 1}`}
                  value={item}
                  onChange={(e) =>
                    handleMediaChange(
                      index,
                      e.target.value
                    )
                  }
                />

                {media.length > 1 && (
                  <button
                    type="button"
                    className="admin-remove-media"
                    onClick={() =>
                      removeMediaField(index)
                    }
                  >
                    <X size={17} />
                  </button>
                )}

              </div>
            ))}

          </div>

        </section>

        {/* Actions */}
        <div className="admin-form-actions">

          <Link
            to="/admin/products"
            className="admin-cancel-btn"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-btn"
          >
            <Save size={18} />
            Update Product
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProduct;