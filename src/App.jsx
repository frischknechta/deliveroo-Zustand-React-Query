import "./App.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import Category from "./components/Category";
import Cart from "./components/Cart";

// Zustand
import { useStore } from "./store";

function App() {
  const theme = useStore((store) => store.theme);
  const CHANGE_THEME = useStore((store) => store.CHANGE_THEME);

  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurantData"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://site--deliveroo-backend--5ytnmfswy69s.code.run/"
      );
      return data;
    },
    staleTime: Infinity,
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={`App ${theme === "white" ? "theme-white" : "theme-red"}`}>
      <div className="container hero">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="" />
        <button
          className="theme-button"
          onClick={() => {
            CHANGE_THEME();
          }}
        >
          Switch theme
        </button>
      </div>
      <div className="content">
        <div className="container sections-container">
          <section className="left-section">
            {data.categories.map((category, index) => {
              if (category.meals.length !== 0) {
                return <Category key={index} category={category} />;
              } else {
                return null;
              }
            })}
          </section>
          <section className="right-section">
            <Cart />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
