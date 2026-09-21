import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

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

  // Registration success message
  const registrationMessage = location.state?.message;

  // =========================
  // Handle Input Change
  // =========================
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

  // =========================
  // Validate Form
  // =========================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  // =========================
  // Login
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      const { name, token, role } = response;

      login({
        name,
        token,
        role,
      });

      const from = location.state?.from;

      if (role === "admin") {
        navigate(from || "/admin", {
          replace: true,
        });
      } else {
        navigate(from || "/", {
          replace: true,
        });
      }
    } catch (err) {
      console.error("Login failed:", err);

      const errorMsg =
        err.response?.data?.title ||
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Invalid email or password. Please try again.";

      setErrors({
        general:
          typeof errorMsg === "string"
            ? errorMsg
            : "Invalid email or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container">

        {/* Header */}
        <div className="auth-header">
          <span>WELCOME BACK</span>

          <h1>Login</h1>

          <p>
            Sign in to continue shopping with us.
          </p>
        </div>

        {/* Registration Success */}
        {registrationMessage && (
          <div className="auth-success-message">
            <div className="auth-success-icon">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <strong>
                Account created successfully!
              </strong>

              <p>
                Please check your email and confirm
                your email address before logging in.
              </p>
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="form-error">
            {errors.general}
          </div>
        )}

        {/* Login Form */}
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
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