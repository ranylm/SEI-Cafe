import { useState } from "react";
import "./App.css";
import { getUser } from "./utilities/users-service";

import AuthPage from "./pages/AuthPage/AuthPage";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage";
import { Routes, Route } from "react-router-dom";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import NavBar from "./component/NavBar/NavBar";
import LoginForm from "./component/LoginForm/LoginForm";

function App() {
  const [user, setUser] = useState(getUser());
  console.log("USER IS: ", user);
  return (
    <>
      {!user ? <LoginForm setUser={setUser} /> : undefined}
      <div>
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders/" element={<OrderHistoryPage />} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default App;
