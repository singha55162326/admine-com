import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { editProduct, updateProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

export const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("ແກ້ໄຂສິນຄ້າເປັນທີ່ຮຽບຮ້ອຍ", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
        setCategory(product.category);
      }
    }
    dispatch(listCategories());
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
        category,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              ໄປທີ່ໜ້າປະເພດສິນຄ້າ
            </Link>
            <h2 className="content-title">ແກ້ໄຂສິນຄ້າ</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                ຢືນຢັນການແກ້ໄຂ
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
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
                          onChange={(e) => setName(e.target.value)}
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
                          onChange={(e) => setPrice(e.target.value)}
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
                          onChange={(e) => setCountInStock(e.target.value)}
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
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          ປະເພດສິນຄ້າ
                        </label>
                        <select
                          className="form-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories &&
                            categories.map((category) => (
                              <option>{category.name}</option>
                            ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">ຮູບພາບ</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
