import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { createCategory } from "../../Redux/Actions/CategoryActions";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryContants";
// import Message from "../LoadingError/Error";
// import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

export const CreateCategory = () => {

  const [name,setName] = useState("");

  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate );

  const { category } = categoryCreate



  useEffect(()=>{
    if (category) {
      toast.success("ເພີ່ມປະເພດສິນຄ້າເປັນທີ່ຮຽບຮ້ອຍ",ToastObjects)
      dispatch({ type: CATEGORY_CREATE_RESET })
      setName(" ")
    }
  },[category,dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory(name))
  }

  return (
    <>
    <Toast/>
    <div className="col-md-12 col-lg-4">
      <form onSubmit={submitHandler} >
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            ຊື່ປະເພດສິນຄ້າ
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={name}
            onChange={(e) => setName(e.target.value) }
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3">ສ້າງປະເພດສິນຄ້າໃໝ່</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateCategory;
