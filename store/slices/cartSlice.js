import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

let item;
if (typeof window !== "undefined") {
  item = localStorage.getItem("cartItems");
}

const initialState = {
  cartItems: item ? JSON.parse(item) : [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};

export const cartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.info(`${action.payload.title} quantity increaased in cart`, {
          position: "bottom-left",
        });
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.title} added to the cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIndex].quantity;
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        toast.info(`${action.payload.title} quantity decreased in cart`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextArray = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextArray;
        toast.error(`${action.payload.title} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIndex].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.info(`${action.payload.title} quantity decreased in cart`, {
        position: "bottom-left",
      });
    },
    showCart: (state, action) => {},

    removeItemFromCart: (state, action) => {
      const nextArray = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = nextArray;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.title} removed from cart`, {
        position: "bottom-left",
      });
    },

    addSubTotal: (state, action) => {
      const {total , quantity} = state.cartItems.reduce((cartTotal , cartItem) => {
        const {price , quantity} = cartItem
        const itemTotal = price * quantity

        cartTotal.total += itemTotal
        cartTotal.quantity += quantity

        return cartTotal
      } , {
        total: 0,
        quantity: 0
      })

      
      state.cartTotalQuantity = quantity
      state.cartTotalPrice = total
      // console.log(state.cartTotalPrice)

    }
  },
});

export const { addToCart, decQuantity, incQuantity, removeItemFromCart, addSubTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
