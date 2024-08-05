import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state,action) => {
            //  mutating the state here
            state.items.push(action.payload);
        },
        removeItem: (state)=>{
            state.items.pop();
        },
        clearCart: (state)=> {
            state.items.length = 0;  // items = []
        }
    }
});

export const{addItem,removeItem,clearCart} = CartSlice.actions; // exported our actions which help to modify cart
export default CartSlice.reducer; 