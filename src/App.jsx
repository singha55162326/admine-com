import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/productScreen";
import CategoriesScreen from "./screen/CategoriesScreen";
import OrderScreen from "./screen/OrderScreen";
import OrderDetailScreen from "./screen/OrderDetailScreen";
import AddProduct from "./screen/AddProduct";
import Login from "./screen/LoginScreen";
import UsersScreen from "./screen/UsersScreen";
import ProductEditScreen from "./screen/ProductEditScreen";
import NotFound from "./screen/NotFound";
import PrivateRouter from "./PrivateRouter";
import CategoryEditScreen from "./components/Categories/CategoryEditScreen";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/products" element={<ProductScreen />} />
            <Route path="/category" element={<CategoriesScreen />} />
            <Route path="/orders" element={<OrderScreen />} />
            <Route path="/order/:id" element={<OrderDetailScreen />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route
              path="/category/:idCategory/edit"
              element={<CategoryEditScreen />}
            />
            <Route path="/users" element={<UsersScreen />} />
            <Route path="/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
