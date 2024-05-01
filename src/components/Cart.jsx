import { useStore } from "../store";

const Cart = () => {
  const cart = useStore((store) => store.cart);
  const total = useStore((store) => store.total);
  const ADD_TO_CART = useStore((store) => store.ADD_TO_CART);
  const REMOVE_FROM_CART = useStore((store) => store.REMOVE_FROM_CART);

  return cart.length !== 0 ? (
    <div className="cart">
      {cart.map((meal) => {
        return (
          <div key={meal.id}>
            <div>
              <button
                onClick={() => {
                  REMOVE_FROM_CART(meal);
                }}
              >
                -
              </button>
              <span>{meal.quantity}</span>
              <button
                onClick={() => {
                  ADD_TO_CART(meal);
                }}
              >
                +
              </button>
            </div>

            <span>{meal.title}</span>
            <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
          </div>
        );
      })}
      <p> TOTAL : {total.toFixed(2)}</p>
    </div>
  ) : (
    <div>Panier vide</div>
  );
};

export default Cart;
