import React from "react";
import { Route, Routes } from "react-router-dom";
import AdAdd from "../pages/adAdd";
import AdEdit from "../pages/adEdit";
import AdManagement from "../pages/adManagement";
import Dashboard from "../pages/dashboard";
import DefaultLayout from "../layouts/DefaultLayout";

function DefaultRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ad" element={<AdManagement />} />
      </Route>
      <Route path="/ad/add" element={<AdAdd />} />
      <Route path="/ad/edit" element={<AdEdit />} />
    </Routes>
  );
}

export default DefaultRouter;
