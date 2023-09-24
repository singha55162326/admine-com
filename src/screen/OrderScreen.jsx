import React from "react";
import Header from "../components/Header";
import OrderMain from "../components/orders/OrderMain";
import Sidebar from "../components/sidebar";

export const OrderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain />
      </main>
    </>
  );
};

export default OrderScreen;
