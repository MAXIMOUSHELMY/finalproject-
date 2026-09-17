import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const foundOrder = orders.find(
      (item) => item.id.toString() === id
    );

    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return (
      <main className="not-found-page">
        <Package size={50} />

        <h1>Order Not Found</h1>

        <Link to="/orders">
          Back to Orders
        </Link>
      </main>
    );
  }

  const status = order.status || "Pending";

  const canCancel =
    status.toLowerCase() === "pending";

  const handleCancel = () => {
    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const updatedOrders = orders.map((item) =>
      item.id.toString() === id
        ? {
            ...item,
            status: "Canceled",
          }
        : item
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrder({
      ...order,
      status: "Canceled",
    });
  };

  return (
    <main className="order-details-page">

      <Link
        to="/orders"
        className="back-link"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      <div className="order-details-header">

        <div>
          <span className="section-label">
            ORDER DETAILS
          </span>

          <h1>
            Order #{order.id}
          </h1>

          <p>
            Placed on{" "}
            {order.createdAt || "Recently"}
          </p>
        </div>

        <span
          className={`status-badge ${status.toLowerCase()}`}
        >
          {status}
        </span>

      </div>

      <section className="order-details-layout">

        {/* Items */}
        <div className="order-details-content">

          <div className="order-detail-box">

            <h2>Order Items</h2>

            <div className="order-products">

              {(order.items || []).map((item, index) => (
                <div
                  className="order-product"
                  key={item.id || index}
                >

                  <img
                    src={item.featured_image}
                    alt={item.title}
                  />

                  <div className="order-product-info">

                    <h3>{item.title}</h3>

                    <span>
                      Quantity: {item.quantity}
                    </span>

                  </div>

                  <strong>
                    $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </strong>

                </div>
              ))}

            </div>

          </div>

          {/* Shipping */}
          <div className="order-detail-box">

            <h2>Shipping Information</h2>

            <p className="shipping-address">
              {order.shippingAddress ||
                "No address available"}
            </p>

          </div>

          {/* Payment */}
          <div className="order-detail-box">

            <h2>Payment Method</h2>

            <p>
              {order.paymentMethod ||
                "Cash on Delivery"}
            </p>

          </div>

        </div>

        {/* Summary */}
        <aside className="order-summary-box">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ${Number(order.total || 0).toFixed(2)}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${Number(order.total || 0).toFixed(2)}
            </strong>
          </div>

          {canCancel && (
            <button
              className="cancel-order-button"
              onClick={handleCancel}
            >
              Cancel Order
            </button>
          )}

        </aside>

      </section>

    </main>
  );
}

export default OrderDetails;