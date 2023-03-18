import "./App.css";
import { Navbars } from "./Components/Navbars";
import { Login } from "./Components/Login";
import Signup from "./Components/Signup";
import { Routes, Route } from "react-router-dom";
import { Welcome } from "./Components/Welcome";
import { Completeprofile } from "./Components/Completeprofile";
import Logout from "./Components/Logout";
function App() {
  return (
    <div className="App">
      <Navbars />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/profile" element={<Completeprofile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
