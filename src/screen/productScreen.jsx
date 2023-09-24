import React from "react";
import Header from "../components/Header";
import MainProducts from "../components/products/MainProducts";
import Sidebar from "../components/sidebar";

export const ProductScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts />
      </main>
    </>
  );
};

export default ProductScreen;
