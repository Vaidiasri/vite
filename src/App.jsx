import Data from "./Constants/Data"
import Login from "./components/Login";
import Property from "./components/Property"
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ToDo from "./components/ToDo";

const App = () => {
  return (
    <>
      {/* {Data.map((data, index) => (
        <Property 
          key={index} 
          title={data.title} 
          age={data.age} 
        />
      ))} */}
      {/* <Login/> */}
      {/* <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> */}
      <ToDo />
    </>
  )
}

export default App;