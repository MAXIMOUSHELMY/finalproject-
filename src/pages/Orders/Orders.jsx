import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="empty-orders">
          <Package size={60} />

          <h1>No Orders Yet</h1>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link to="/products">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">

      <div className="orders-header">
        <span className="section-label">
          YOUR ACCOUNT
        </span>

        <h1>My Orders</h1>

        <p>
          Track and manage your orders.
        </p>
      </div>

      <section className="orders-list">

        {orders.map((order) => (
          <article
            className="order-card"
            key={order.id}
          >

            <div className="order-main">

              <div className="order-icon">
                <Package size={22} />
              </div>

              <div className="order-info">

                <span className="order-number">
                  Order #{order.id}
                </span>

                <h3>
                  {order.items?.length || 0}{" "}
                  {order.items?.length === 1
                    ? "Item"
                    : "Items"}
                </h3>

                <p>
                  {order.createdAt || "Recently"}
                </p>

              </div>

            </div>

            <div className="order-status">
              <span
                className={`status-badge ${order.status?.toLowerCase()}`}
              >
                {order.status || "Pending"}
              </span>
            </div>

            <div className="order-total">
              <span>Total</span>
              <strong>
                ${Number(order.total || 0).toFixed(2)}
              </strong>
            </div>

            <Link
              to={`/orders/${order.id}`}
              className="order-details-link"
            >
              <span>View Details</span>
              <ChevronRight size={18} />
            </Link>

          </article>
        ))}

      </section>

    </main>
  );
}

export default Orders;