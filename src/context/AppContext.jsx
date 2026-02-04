import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{

  const currency = import.meta.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showuserLogin, setshowuserLogin] = useState(false);
  const [products, setproducts] = useState([]);

  const [ cartitem, setcartitems ] = useState({})

  //Fetch all products
  const fetchProducts = async ()=>{
    setproducts(dummyProducts)
  }

  //Add products to cart
  const addtocart = (itemId) => {
    let cartData = structuredClone(cartitem)

    if(cartData[itemId]){
      cartData[itemId] += 1;
    } else{
      cartData[itemId] = 1;
    }
    setcartitems(cartData);
    toast.success("Added to Cart")
  }

  //update card item quantity
  const updatecart = (itemId, quantity) => {
    let cartData = structuredClone(cartitem)
    cartData[itemId] = quantity
    setcartitems(cartData)
    toast.success("Cart Updated")
  }

  //Remove items from cart
  const removefromcart = (itemId) => {
    let cartData = structuredClone(cartitem)
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      
      if(cartData[itemId] === 0){
        delete cartData[itemId]
      }
    }
    toast.success("Removed from Cart")
    setcartitems(cartData)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const value = {navigate, user, setuser,setIsSeller, isSeller, showuserLogin, setshowuserLogin, products, currency, addtocart, updatecart, removefromcart, cartitem }

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>

}

export const useAppContext = () => {
  return useContext(AppContext);
}