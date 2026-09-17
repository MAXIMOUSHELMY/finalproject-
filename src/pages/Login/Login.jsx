import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      /*
        Backend API will be connected here.

        Example later:

        const response = await loginUser(formData);

        const { name, token, role } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name, role })
        );

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      */

      console.log("Login data:", formData);

      // Temporary until Backend API is ready
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Login failed:", error);

      setErrors({
        general: "Invalid email or password",
      });

      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-header">
          <span>Welcome Back</span>

          <h1>Login</h1>

          <p>
            Sign in to continue to your account.
          </p>
        </div>

        {errors.general && (
          <div className="form-error">
            {errors.general}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>

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
            <label htmlFor="password">Password</label>

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
          <Link to="/register">Create Account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;