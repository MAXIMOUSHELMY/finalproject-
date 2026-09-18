import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";

function AdminOrderDetails() {
  const { id } = useParams();

  // Temporary mock data
  const order = {
    id,
    customer: "Ahmed Mohamed",
    client_id: 25,
    status: "Pending",
    paymentMethod: "COD",
    shippingAddress: "Zagazig, Egypt",
    createdAt: "2026-09-15",
    items: [
      {
        id: 1,
        name: "Premium Headphones",
        quantity: 2,
        price: 49.99,
      },
      {
        id: 2,
        name: "Classic Watch",
        quantity: 1,
        price: 50.01,
      },
    ],
  };

  const subtotal = order.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="admin-order-details-page">

      <div className="admin-page-header">
        <div>
          <Link
            to="/admin/orders"
            className="admin-back-link"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>

          <span className="admin-page-label">
            ORDER DETAILS
          </span>

          <h1>{order.id}</h1>

          <p>
            View customer and order information.
          </p>
        </div>

        <span
          className={`admin-order-status-select ${order.status.toLowerCase()}`}
        >
          {order.status}
        </span>
      </div>

      <div className="admin-order-details-grid">

        {/* Customer */}
        <section className="admin-form-section">

          <div className="admin-form-section-header">
            <h2>Customer Information</h2>
          </div>

          <div className="admin-detail-list">

            <div>
              <span>Customer</span>
              <strong>{order.customer}</strong>
            </div>

            <div>
              <span>Client ID</span>
              <strong>#{order.client_id}</strong>
            </div>

            <div>
              <span>Order Date</span>
              <strong>{order.createdAt}</strong>
            </div>

          </div>

        </section>

        {/* Shipping */}
        <section className="admin-form-section">

          <div className="admin-form-section-header">
            <h2>Shipping & Payment</h2>
          </div>

          <div className="admin-detail-list">

            <div>
              <span>
                <MapPin size={15} />
                Shipping Address
              </span>

              <strong>
                {order.shippingAddress}
              </strong>
            </div>

            <div>
              <span>
                <CreditCard size={15} />
                Payment Method
              </span>

              <strong>
                {order.paymentMethod}
              </strong>
            </div>

          </div>

        </section>

      </div>

      {/* Items */}
      <section className="admin-form-section">

        <div className="admin-form-section-header">
          <h2>Order Items</h2>

          <p>
            Products included in this order.
          </p>
        </div>

        <div className="admin-order-items">

          {order.items.map((item) => (
            <div
              className="admin-order-item"
              key={item.id}
            >

              <div className="admin-order-item-icon">
                <Package size={19} />
              </div>

              <div className="admin-order-item-info">
                <strong>{item.name}</strong>

                <span>
                  Quantity: {item.quantity}
                </span>
              </div>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>

            </div>
          ))}

        </div>

        <div className="admin-order-total">

          <span>Subtotal</span>

          <strong>
            ${subtotal.toFixed(2)}
          </strong>

        </div>

      </section>

    </div>
  );
}

export default AdminOrderDetails;