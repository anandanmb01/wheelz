import {React,useContext} from "react";
import Header from "./components/Header/Header"
import Home from "./pages/home/Home";
import "./App.css";
import Footer from "./components/Footer";
import Product from "./pages/Product/Product";
import CategoryProductList from "./pages/Category/CategoryProductList";
import CartPage from "./pages/Cart/CartPage";
import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";


function App() {

  const {authStatus,setAuthStatus} = useContext(AuthContext);

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/cart" element={true?<CartPage/>:<Home/>} />
        <Route path="/section/:sectionName" element={true?<CategoryProductList/>:<Home/>} />
        <Route path="/product/:productId" element={true?<Product/>:<Home/>} />
          {/* <Product/> */}
          {/* <CategoryProductList/> */}
          {/* <CartPage /> */}
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
