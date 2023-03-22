import {React,useContext} from "react";
import Header from "./components/Header/Header";
import Home from "./pages/home/Home";
import "./App.css";
import Footer from "./components/Footer";
import Product from "./pages/Product/Product";
import CategoryProductList from "./pages/Category/CategoryProductList";
import CartPage from "./pages/Cart/CartPage";
import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";

function App() {

  // const [authStatus,setAuthStatus] = useContext(AuthContext);

  return (
    <>
      <AuthProvider>
        <Header />
        <Home/>
        <Product/>
        <CategoryProductList/>
        <CartPage />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
