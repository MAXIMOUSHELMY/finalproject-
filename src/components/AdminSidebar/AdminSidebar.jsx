import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingBag,
  Percent,
  Users,
  LogOut,
  Store,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";

function AdminSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Tags,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Discounts",
      path: "/admin/discounts",
      icon: Percent,
    },
  ];

  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">
        <Store size={22} />

        <span>STORE</span>
      </div>

      {/* Navigation */}
      <nav className="admin-nav">

        <span className="admin-nav-title">
          MANAGEMENT
        </span>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                isActive
                  ? "admin-nav-link active"
                  : "admin-nav-link"
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Bottom */}
      <div className="admin-sidebar-bottom">

        <Link
          to="/"
          className="admin-nav-link"
        >
          <Store size={19} />
          <span>View Store</span>
        </Link>

        <button className="admin-logout">
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;