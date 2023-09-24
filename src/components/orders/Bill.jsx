import React from "react";
import NumberFormat from "react-number-format";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { order } = props;
  return (
    <div ref={ref} className="print-source">
      <div className="d-flex justify-content-between">
        <div>
          <h3>ຮ້ານຄ້າທີ່ໃຫ້ບໍລິການ</h3>
          <p>ຮ້ານຄ້າບຸນນະວັດ</p>
          <p>ບ້ານທ່າງອນ,ເມືອງໄຊທານີ,ນະຄອນຫຼວງວຽງຈັນ</p>
          <p>ຕິດຕໍ່ +85620 93043691</p>
        </div>
        <div>
          <h3>ລາຍລະອຽດລູກຄ້າ</h3>
          <p>{order.user.name}</p>
          <p>ຕິດຕໍ່ {order.shippingAddress.postalCode}</p>
          <p>ສະຖານທີ່ສົ່ງ: {order.shippingAddress.city}</p>
          <p>ຊຳລະຜ່ານ {order.paymentMethod}</p>
        </div>
        <div></div>
      </div>
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
          {order.orderItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="info">{item.name}</div>
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
          ))}

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
      <p style={{ textAlign: "center" }}>ຂອບໃຈທີ່ໃຊ້ບໍລິການ</p>
    </div>
  );
});
