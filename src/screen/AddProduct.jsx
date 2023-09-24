import React from "react";
import Header from "../components/Header";
import AddProductMain from "../components/products/AddProductMain";
import Sidebar from "../components/sidebar";

export const AddProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};
export default AddProduct;
