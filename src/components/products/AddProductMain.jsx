import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import axios from "axios";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

export const AddProductMain = () => {
  const [name,setName] = useState("");
  const [price,setPrice] = useState(0);
  const [image,setImage] = useState("");
  const [countInStock,setCountInStock] = useState(0);
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [loadingImg, setLoadingImg ] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate )
  const {loading, error, product} = productCreate

  const categoryList = useSelector((state) => state.categoryList )
  const {categories } = categoryList

  useEffect(()=> {
    if (product) {
      toast.success("ເພີ່ມສິນຄ້າເປັນທີ່ຮຽບຮ້ອຍ",ToastObjects)
      dispatch({type:PRODUCT_CREATE_RESET})
      setName("")
      setDescription("")
      setCountInStock(0)
      setImage("")
      setPrice(0)
      setCategory("")
    }
    dispatch(listCategories())
  },[product,dispatch])

  console.log(image);

  const submitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append('file', image);
    data.append("upload_preset", "upload");
    setLoadingImg(true)
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqficij3m/image/upload",
        data
      );

      const { url } = uploadRes.data;

      dispatch(createProduct(name, price, description, url, countInStock, category))
      setLoadingImg(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Toast/>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler} >
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              ກັບໄປທີ່ໜ້າສິນຄ້າ
            </Link>
            <h2 className="content-title">ເພີ່ມສິນຄ້າ</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                ວາງຈຳໜ່າຍ
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  { error && <Message variant="alert-danger" >{error}</Message> }
                  { loading && <Loading/> }
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      ຫົວຂໍ້ສິນຄ້າ
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value) }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      ລາຄາ
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value) }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      ຈຳນວນສິນຄ້າໃນສາງ
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value) }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">ຄຳອະທິບາຍ</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value) }
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      ປະເພດສິນຄ້າ
                    </label>
                    <select className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value) }
                    >
                      {categories &&
                        categories.map((category) => (
                          <option>{category.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">ຮູບພາບສິນຄ້າ</label>
                    <input
                      className="form-control"
                      type="file"
                      required
                      onChange={(e) => setImage(e.target.files[0]) }
                    />
                    {/* <input className="form-control mt-3" type="file" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;