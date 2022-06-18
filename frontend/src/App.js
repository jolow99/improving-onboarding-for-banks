import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./pages/Landing.js";
import Details from "./pages/Details.js";
import Passport from "./pages/Passport.js";
import Review from "./pages/Review.js";
import Login from "./pages/Login.js";

export default function App() {
  const loggedIn = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Login/>}/>
        <Route path="/landing" element= {<Landing/>}/>
        <Route path="/details" element={<Details />} />
        <Route path="/passport" element={<Passport />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}
