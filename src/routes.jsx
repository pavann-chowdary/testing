import React from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "./admin";
import Kitchen from "./kitchen";
import Order from "./Order"
import OrderConfirmationpage from "./OrderConfirmationpage";
import Request from "./Request";

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
      <Route path="/request" element={<Request/>}/>
      <Route path="/kitchen" element={<Kitchen/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  );
};
