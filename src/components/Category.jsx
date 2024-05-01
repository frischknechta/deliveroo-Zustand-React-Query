import Meal from "./Meal";

const Category = ({ category }) => {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="meals-container">
        {category.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </div>
    </div>
  );
};

export default Category;
