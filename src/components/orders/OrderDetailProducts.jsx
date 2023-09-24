import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

export const OrderDetailProducts = (props) => {
  const { order,loading } = props

  if(!loading){
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num*100) / 100)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0)
    )

  }

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "30%" }}>ສິນຄ້າ</th>
          <th style={{ width: "20%" }}>ລາຄາສິນຄ້າ</th>
          <th style={{ width: "20%" }}>ຈຳນວນສິນຄ້າ</th>
          <th style={{ width: "30%" }} className="text-end">
          ລວມລາຄາສິນຄ້າທັງໝົດ
          </th>
        </tr>
      </thead>
      <tbody>
        {
          order.orderItems.map((item,index) => (
            <tr key={index}>
          <td>
            <Link className="itemside" to="#">
              <div className="left">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "40px", height: "40px" }}
                  className="img-xs"
                />
              </div>
              <div className="info">
              {item.name}
              </div>
            </Link>
          </td>
          <td>
            <NumberFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₭"}
              />
            </td>
          <td>{item.qty}</td>
          <td className="text-end"> 
          <NumberFormat
              value={item.qty * item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₭"}
            />
          </td>
        </tr>
          ))
        }
        

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>ລວມລາຄາສິນຄ້າທັງໝົດ:</dt> 
                <dd>
                <NumberFormat
                  value={order.itemsPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₭"}
                />
                </dd>
              </dl>
              <dl className="dlist">
                <dt>ຄ່າສົ່ງ:</dt> 
                <dd>
                <NumberFormat
                  value={order.shippingPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₭"}
                />
                </dd>
              </dl>
              <dl className="dlist">
                <dt>ລວມເປັນເງິນທັງໝົດ:</dt>
                <dd>
                  <b className="h5">
                  <NumberFormat
                    value={order.totalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₭"}
                  />
                  </b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">ສະຖານະການຊຳລະເງິນ:</dt>
                <dd>
                  {
                    order.isPaid ? (
                      <span className="badge rounded-pill alert alert-success text-success">
                        ຈ່າຍແລ້ວ
                      </span>
                    )
                    :
                    (
                      <span className="badge rounded-pill alert alert-danger text-danger">
                        ຍັງບໍ່ທັນຈ່າຍ
                      </span>
                    )
                  }
                  
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
