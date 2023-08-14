import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext()
const CartProvider = ({children})=>{
    return <CartContext.Provider value={useLocalStorage()}>{children}</CartContext.Provider>
}
const useCartContext = ()=>{
    return useContext(CartContext)
}
export {CartProvider,useCartContext}
