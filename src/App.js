// Modules
import React from "react";

// Firebase
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

// Hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Redux Actions
import { setCurrentUser } from "./store/user/user.action";

// Components
import { Routes, Route } from "react-router-dom";

// Routes
import { Home, Authentication, Shop, Checkout } from "./routes";

// Layouts
import { LandingLayout } from "./layouts";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(async (user) => {
      dispatch(setCurrentUser(user));
      user && (await createUserDocumentFromAuth(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
