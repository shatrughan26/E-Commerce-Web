import Navbar from "./component/navbar"
import { Routes,Route } from "react-router-dom";
import Home from "./Routes/Home";
import Cart from "./Routes/Cart";
import Products from "./Routes/Products";
import Login from "./Routes/Login";
import Footer from "./component/Footer"

function App() {
    return(
      <div  className="app-wrapper">
        <Navbar/>
          <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<Products/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
          </main>
        <Footer/>
      </div>

    );
    };


export default App;
