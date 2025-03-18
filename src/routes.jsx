import React from "react";
import { Routes, Route } from "react-router-dom";

import Order from "./Order"
import OrderConfirmationpage from "./OrderConfirmationpage";

export default function AppRoutes () {
  return (
    <Routes>
      <Route
        path="/welcome"
        element={
          <Order/>
        }
      />
      <Route path="/confirm" element={<OrderConfirmationpage />} />
    </Routes>
  );
};
