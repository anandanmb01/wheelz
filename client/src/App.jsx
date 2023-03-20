import Header from "./components/Header";
import Home from "./pages/home/Home";
import './App.css';
import Footer from "./components/Footer";
import Product from "./pages/Product/Product";
import CategoryProductList from "./pages/Category/CategoryProductList";


function App() {
  return (
    <>
    <Header/>
    {/* <Home/> */}
    <Product/>
    {/* <CategoryProductList/> */}
    <Footer/>
    </>
    );
}

export default App;
