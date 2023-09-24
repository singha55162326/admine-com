import React from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";
import Sidebar from "../components/sidebar";

export const OrderDetailScreen = () => {
  const params = useParams();
  const orderId = params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
