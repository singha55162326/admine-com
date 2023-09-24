import React from "react";

export const OrderDetailInfo = (props) => {
  const {order} = props
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">ຂໍ້ມູນສະມາຊິກ</h6>
            <p className="mb-1">
            {order.user.name} <br />
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">ຂໍ້ມູນການສັ່ງຊື້</h6>
            <p className="mb-1">
            ເລກບັນຊີສະມາຊິກ: {order.shippingAddress.country} <br /> ຊຳລະຜ່ານ:{" "}
            {order.paymentMethod}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">ສະຖານທີ່ສົ່ງ</h6>
            <p className="mb-1">
            ສະຖານທີ່: {order.shippingAddress.city}
              <br />
              {order.shippingAddress.address}
              <br /> ເບີໂທ: {order.shippingAddress.postalCode}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
