import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home.jsx";
import AddUser from "./addUser/AddUser.jsx";
import Update from "./update/Update.jsx";
import Login from "./Login.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/update/:id" element={<Update/>} />
          <Route path="login"  element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
