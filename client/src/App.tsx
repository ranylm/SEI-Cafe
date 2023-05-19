import { useState } from "react";
import "./App.css";
import { getUser } from "./utilities/users-service";

import AuthPage from "./pages/AuthPage/AuthPage";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage";
import { Routes, Route, Navigate } from "react-router-dom";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import NavBar from "./components/NavBar/NavBar";
// import LoginForm from "./components/LoginForm/LoginForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
function App() {
  const [user, setUser]: [
    null,
    (a: { username: string; email: string } | null) => void
  ] = useState(getUser());
  console.log("USER IS: ", user);
  const [parent] = useAutoAnimate();
  return (
    <>
      {/* {!user ? <LoginForm setUser={setUser} /> : null} */}
      <div ref={parent}>
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route
                path="/orders/new"
                element={<NewOrderPage user={user} setUser={setUser} />}
              />
              <Route
                path="/orders/"
                element={<OrderHistoryPage user={user} setUser={setUser} />}
              />
              <Route path="/*" element={<Navigate to="/orders/new" />} />
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
