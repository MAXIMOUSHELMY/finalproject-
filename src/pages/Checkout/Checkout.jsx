import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod] = useState("COD");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your shipping address.");
      return;
    }

    setLoading(true);

    try {
      /*
        Backend checkout will be connected here.

        Example later:

        const response = await checkout({
          products: cart,
          address,
          paymentMethod: "COD"
        });

        After successful checkout:
        localStorage.removeItem("cart");
        navigate("/orders");
      */

      console.log("Checkout data:", {
        products: cart,
        address,
        paymentMethod,
        total,
      });

      // Temporary until Backend API is ready
      setTimeout(() => {
        localStorage.removeItem("cart");
        setLoading(false);

        navigate("/orders");
      }, 700);
    } catch (err) {
      console.error("Checkout failed:", err);

      setError(
        "Something went wrong while creating your order."
      );

      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h1>Your Cart is Empty</h1>

          <p>
            Add some products before proceeding to checkout.
          </p>

          <Link to="/products">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">

      <div className="checkout-header">
        <span className="section-label">
          CHECKOUT
        </span>

        <h1>Complete Your Order</h1>

        <p>
          Enter your shipping information and choose your
          payment method.
        </p>
      </div>

      <section className="checkout-layout">

        {/* Checkout Form */}
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <div className="checkout-section">

            <h2>Shipping Address</h2>

            <div className="form-group">
              <label htmlFor="address">
                Full Address
              </label>

              <textarea
                id="address"
                rows="5"
                placeholder="Enter your full shipping address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setError("");
                }}
              />
            </div>

          </div>

          <div className="checkout-section">

            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                checked
                readOnly
              />

              <div>
                <strong>Cash on Delivery</strong>

                <span>
                  Pay when your order arrives.
                </span>
              </div>
            </label>

          </div>

          {error && (
            <div className="checkout-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="place-order-button"
            disabled={loading}
          >
            {loading
              ? "Creating Order..."
              : "Place Order"}
          </button>

        </form>

        {/* Order Summary */}
        <aside className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="checkout-items">

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <img
                  src={item.featured_image}
                  alt={item.title}
                />

                <div>
                  <h3>{item.title}</h3>

                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong>
                  $
                  {(item.price * item.quantity).toFixed(
                    2
                  )}
                </strong>
              </div>
            ))}

          </div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

        </aside>

      </section>

    </main>
  );
}

export default Checkout;