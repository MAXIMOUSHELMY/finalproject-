import { useMemo, useState } from "react";
import { Search, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      client_id: 25,
      customer: "Ahmed Mohamed",
      items: 3,
      total: 149.99,
      status: "Pending",
      paymentMethod: "COD",
      shippingAddress: "Zagazig, Egypt",
      createdAt: "2026-09-15",
    },
    {
      id: "ORD-1002",
      client_id: 31,
      customer: "Mohamed Ali",
      items: 2,
      total: 89.99,
      status: "Shipped",
      paymentMethod: "COD",
      shippingAddress: "Cairo, Egypt",
      createdAt: "2026-09-14",
    },
    {
      id: "ORD-1003",
      client_id: 17,
      customer: "Omar Hassan",
      items: 1,
      total: 249.99,
      status: "Delivered",
      paymentMethod: "COD",
      shippingAddress: "Alexandria, Egypt",
      createdAt: "2026-09-13",
    },
    {
      id: "ORD-1004",
      client_id: 42,
      customer: "Karim Adel",
      items: 4,
      total: 319.99,
      status: "Canceled",
      paymentMethod: "COD",
      shippingAddress: "Giza, Egypt",
      createdAt: "2026-09-12",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const getNextStatuses = (status) => {
    if (status === "Pending") {
      return ["Pending", "Shipped", "Canceled"];
    }

    if (status === "Shipped") {
      return ["Shipped", "Delivered"];
    }

    return [status];
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div className="admin-orders-page">

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-label">
            MANAGEMENT
          </span>

          <h1>Orders</h1>

          <p>
            View and manage customer orders.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-products-toolbar">

        <div className="admin-search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search order or customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>

      </div>

      {/* Orders Table */}
      <div className="admin-table-wrapper">

        {filteredOrders.length > 0 ? (
          <table className="admin-table">

            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => {

                const availableStatuses =
                  getNextStatuses(order.status);

                return (
                  <tr key={order.id}>

                    <td>
                      <div className="admin-order-id">
                        <strong>{order.id}</strong>
                        <span>{order.createdAt}</span>
                      </div>
                    </td>

                    <td>
                      <div className="admin-customer-cell">
                        <strong>
                          {order.customer}
                        </strong>

                        <span>
                          Client #{order.client_id}
                        </span>
                      </div>
                    </td>

                    <td>
                      {order.items}
                    </td>

                    <td>
                      <strong>
                        ${order.total.toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span className="admin-category-badge">
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`admin-order-status-select ${order.status.toLowerCase()}`}
                        value={order.status}
                        disabled={
                          availableStatuses.length === 1
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                      >
                        {availableStatuses.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td>
                      <Link
                        to={`/orders/${order.id}`}
                        className="admin-action-btn edit"
                        title="View Order"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        ) : (
          <div className="admin-empty-state">
            <ShoppingBag size={42} />

            <h2>No Orders Found</h2>

            <p>
              Try another search or status filter.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default AdminOrders;