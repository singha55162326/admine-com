import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NumberFormat from "react-number-format";

export const Orders = (props) => {
  const { orders } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ຊື່</th>
          <th scope="col">ອີ່ເມວ</th>
          <th scope="col">ຍອດລວມລາຄາ</th>
          <th scope="col">ຈ່າຍແລ້ວ</th>
          <th scope="col">ວັນທີ</th>
          <th>ສະຖານະ</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>
              <b>{order.user.name}</b>
            </td>
            <td>{order.user.email}</td>
            <td>
            <NumberFormat
              value={order.totalPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₭"}
            />
              </td>
            <td>
              {order.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  ຈ່າຍເມື່ອວັນທີ {moment(order.paidAt).format("MMM Do YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  ຍັງບໍ່ທັນຈ່າຍ
                </span>
              )}
            </td>
            <td>{moment(order.createdAt).format("MMM Do YY")}</td>
            <td>
            {order.isDelivered ? (
                <span className="badge btn-success">ກຳລັງຈັດສົ່ງ</span>
              ) : (
                <span className="badge btn-dark">ລໍຖ້າການກວດສອບການຊຳລະເງິນ</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}

        {/* Not paid Not delivered */}
        {/* <tr>
          <td>
            <b>ເກີບ ແບນ Nikie</b>
          </td>
          <td>user@example.com</td>
          <td>₭45,000</td>
          <td>
            <span className="badge rounded-pill alert-danger">ບໍ່ທັນຈ່າຍ</span>
          </td>
          <td>ເດືອນ 12 2021</td>
          <td>
            <span className="badge btn-dark">ຍັງບໍ່ທັນໄດ້ຈັດສົ່ງ</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/order`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default Orders;
