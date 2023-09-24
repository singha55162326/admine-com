import React from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import EditProductMain from "../components/products/EditproductMain";
import Sidebar from "../components/sidebar";

export const ProductEditScreen = () => {
  const params = useParams();
  const productId =  params.id
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};

export default ProductEditScreen;
