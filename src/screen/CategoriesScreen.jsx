import React from "react";
import MainCategories from "../components/Categories/MainCategories";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";

export const CategoriesScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainCategories />
      </main>
    </>
  );
};

export default CategoriesScreen;
