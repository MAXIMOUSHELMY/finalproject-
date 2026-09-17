import { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Lock,
  Save,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
  const [formData, setFormData] = useState({
    name: "Omar Ahmed",
    email: "omar@example.com",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [activeSection, setActiveSection] = useState("profile");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI only
    console.log("Profile data:", formData);
  };

  return (
    <main className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <span className="section-label">
          MY ACCOUNT
        </span>

        <h1>Account Settings</h1>

        <p>
          Manage your personal information, address and
          account settings.
        </p>
      </div>

      <section className="profile-layout">

        {/* Sidebar */}
        <aside className="profile-sidebar">

          <div className="profile-user">
            <div className="profile-avatar">
              <User size={28} />
            </div>

            <div>
              <h3>{formData.name}</h3>
              <span>{formData.email}</span>
            </div>
          </div>

          <nav className="profile-nav">

            <button
              className={
                activeSection === "profile"
                  ? "profile-nav-item active"
                  : "profile-nav-item"
              }
              onClick={() => setActiveSection("profile")}
            >
              <User size={18} />
              Personal Information
            </button>

            <button
              className={
                activeSection === "address"
                  ? "profile-nav-item active"
                  : "profile-nav-item"
              }
              onClick={() => setActiveSection("address")}
            >
              <MapPin size={18} />
              Address
            </button>

            <button
              className={
                activeSection === "password"
                  ? "profile-nav-item active"
                  : "profile-nav-item"
              }
              onClick={() => setActiveSection("password")}
            >
              <Lock size={18} />
              Password
            </button>

            <Link
              to="/orders"
              className="profile-nav-link"
            >
              <Mail size={18} />
              My Orders
            </Link>

          </nav>

          <button className="profile-logout">
            <LogOut size={18} />
            Logout
          </button>

        </aside>

        {/* Content */}
        <div className="profile-content">

          {/* Personal Information */}
          {activeSection === "profile" && (
            <div className="profile-box">

              <div className="profile-box-header">
                <div>
                  <h2>Personal Information</h2>

                  <p>
                    Update your basic account information.
                  </p>
                </div>

                <User size={24} />
              </div>

              <form
                className="profile-form"
                onSubmit={handleSubmit}
              >

                <div className="profile-form-grid">

                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                    />

                    <small>
                      Email cannot be changed.
                    </small>
                  </div>

                </div>

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  <Save size={18} />
                  Save Changes
                </button>

              </form>

            </div>
          )}

          {/* Address */}
          {activeSection === "address" && (
            <div className="profile-box">

              <div className="profile-box-header">
                <div>
                  <h2>Shipping Address</h2>

                  <p>
                    This address will be used during checkout.
                  </p>
                </div>

                <MapPin size={24} />
              </div>

              <form
                className="profile-form"
                onSubmit={handleSubmit}
              >

                <div className="form-group">
                  <label htmlFor="address">
                    Full Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows="6"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  <Save size={18} />
                  Save Address
                </button>

              </form>

            </div>
          )}

          {/* Password */}
          {activeSection === "password" && (
            <div className="profile-box">

              <div className="profile-box-header">
                <div>
                  <h2>Change Password</h2>

                  <p>
                    Update your password to keep your
                    account secure.
                  </p>
                </div>

                <Lock size={24} />
              </div>

              <form
                className="profile-form"
                onSubmit={handleSubmit}
              >

                <div className="form-group">
                  <label htmlFor="password">
                    New Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  <Save size={18} />
                  Update Password
                </button>

              </form>

            </div>
          )}

        </div>

      </section>

    </main>
  );
}

export default Profile;