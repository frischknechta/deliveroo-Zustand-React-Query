import { useStore } from "../store";

const Meal = ({ meal }) => {
  const ADD_TO_CART = useStore((store) => store.ADD_TO_CART);
  return (
    <div
      className="meal"
      onClick={() => {
        ADD_TO_CART(meal);
      }}
    >
      <div>
        <p>{meal.title}</p>
        {meal.description && (
          <div className="description-container">
            <p>{meal.description}</p>
          </div>
        )}
        <div className="price-popular-container">
          <p>{meal.price} €</p>
          {meal.popular && <p style={{ color: "orange" }}>popular</p>}
        </div>
      </div>
      {meal.picture && <img src={meal.picture} alt="" />}
    </div>
  );
};

export default Meal;
