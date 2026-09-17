import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // Temporary mock login
    // Will be replaced with Backend API later.
    setTimeout(() => {
      const isAdmin =
        formData.email.toLowerCase() === "admin@store.com" &&
        formData.password === "admin123";

      const userData = {
        name: isAdmin ? "Admin" : "Customer",
        token: isAdmin
          ? "temporary-admin-token"
          : "temporary-client-token",
        role: isAdmin ? "admin" : "client",
      };

      login(userData);

      setLoading(false);

      const from = location.state?.from;

      if (isAdmin) {
        navigate(from || "/admin", { replace: true });
      } else {
        navigate(from || "/", { replace: true });
      }
    }, 700);
  };

  return (
    <main className="auth-page">
      <section className="auth-container">

        <div className="auth-header">
          <span>WELCOME BACK</span>

          <h1>Login</h1>

          <p>
            Sign in to continue shopping with us.
          </p>
        </div>

        {errors.general && (
          <div className="form-error">
            {errors.general}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="field-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <span className="field-error">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

      </section>
    </main>
  );
}

export default Login;