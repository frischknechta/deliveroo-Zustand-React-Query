import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const myStore = (set) => {
  return {
    cart: [],
    total: 0,
    theme: "white",

    ADD_TO_CART: (payload) =>
      set(
        (state) => {
          const mealPresent = state.cart.find((elem) => elem.id === payload.id);
          if (mealPresent) {
            mealPresent.quantity++;
          } else {
            state.cart.push({ ...payload, quantity: 1 });
          }
          state.total += Number(payload.price);
        },
        false,
        "ADD_TO_CART"
      ),
    REMOVE_FROM_CART: (payload) =>
      set(
        (state) => {
          const mealPresent = state.cart.find((elem) => elem.id === payload.id);
          if (mealPresent.quantity === 1) {
            const index = state.cart.indexOf(mealPresent);
            state.cart.splice(index, 1);
          } else {
            mealPresent.quantity--;
          }
          state.total -= Number(payload.price);
        },
        false,
        "REMOVE_FROM_CART"
      ),

    // TOTAL: (payload) => set((state) => {}, false, "TOTAL"),

    CHANGE_THEME: () =>
      set(
        (state) => {
          if (state.theme === "white") state.theme = "red";
          else state.theme = "white";
        },
        false,
        "CHANGE_THEME"
      ),
  };
};

export const useStore = create(devtools(immer(myStore)));
