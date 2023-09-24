import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderDetailProducts from "./OrderDetailProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getOrderDetails,
  notpaidOrder,
} from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./Bill";

export const OrderDetailmain = (props) => {
  const componentRef = useRef();
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

  const orderNotpaid = useSelector((state) => state.orderNotpaid);
  const { loading: loadingNotpaid, success: successNotpaid } = orderNotpaid;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered, successNotpaid]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const notpaidHandler = () => {
    dispatch(notpaidOrder(order));
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          ກັບໄປທີ່ໜ້າລາຍການສັ່ງຊື້ສິນຄ້າ
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              {/* <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div> */}
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isDelivered ? (
                    <>
                      <button className="btn btn-success col-12">
                        ຈັດສົ່ງແລ້ວເມື່ອວັນທີ ({" "}
                        {moment(order.isDeliveredAt).format("MMM Do YY")} )
                      </button>{" "}
                      <br />
                      <br />
                      <ReactToPrint
                        trigger={() => {
                          return (
                            <button className="btn btn-info col-12">
                              <i className="fas fa-print"></i>
                              ປິ້ນໃບບິນ
                            </button>
                          );
                        }}
                        content={() => componentRef.current}
                        documentTitle="ໃບບິນ"
                        pageStyle="print"
                      />
                      <ComponentToPrint order={order} ref={componentRef} />
                    </>
                  ) : (
                    <>
                      {loadingDelivered && <Loading />}
                      <button
                        onClick={deliverHandler}
                        className="btn btn-dark col-12"
                      >
                        ຢືນຢັນການຈັດສົ່ງ
                      </button>
                    </>
                  )}
                </div>
                {!order.isDelivered && (
                  <div className="box shadow-sm bg-light">
                    {loadingNotpaid && <Loading />}
                    <button
                      onClick={notpaidHandler}
                      className="btn btn-danger col-12"
                    >
                      ບໍ່ພົບຂໍ້ມູນການຊຳລະເງິນ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
