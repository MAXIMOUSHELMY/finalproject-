import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            item.stock
          ),
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 0 : 0;

  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="cart-page">

        <div className="empty-cart">

          <ShoppingBag size={60} />

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any products yet.
          </p>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-header">
        <span className="section-label">
          SHOPPING CART
        </span>

        <h1>Your Cart</h1>

        <p>
          Review your items before checkout.
        </p>
      </div>

      <section className="cart-layout">

        {/* Cart Items */}
        <div className="cart-items">

          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.featured_image}
                alt={item.title}
              />

              <div className="cart-item-info">

                <span>
                  {item.category}
                </span>

                <h3>{item.title}</h3>

                <p>
                  ${item.price.toFixed(2)}
                </p>

              </div>

              <div className="cart-quantity">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  <Minus size={15} />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  <Plus size={15} />
                </button>

              </div>

              <div className="cart-item-total">
                $
                {(item.price * item.quantity).toFixed(
                  2
                )}
              </div>

              <button
                className="remove-cart-item"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                <Trash2 size={18} />
              </button>

            </div>
          ))}

        </div>

        {/* Summary */}
        <aside className="cart-summary">

          <h2>Order Summary</h2>

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

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/products"
            className="continue-shopping-link"
          >
            Continue Shopping
          </Link>

        </aside>

      </section>

    </main>
  );
}

export default Cart;