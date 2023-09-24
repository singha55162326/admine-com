import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editCategory, updateCategory } from '../../Redux/Actions/CategoryActions';
import { CATEGORY_UPDATE_RESET } from '../../Redux/Constants/CategoryContants';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

export const EditcategoryMain = () => {
  const params = useParams();
  const categoryId =  params.idCategory



  const [name,setName] = useState("");

  const dispatch = useDispatch();

  const categoryEdit = useSelector((state) => state.categoryEdit )
  const {loading, error, category} = categoryEdit

  const categoryUpdate = useSelector((state) => state.categoryUpdate )
  const {
    loading:loadingUpdate, 
    error:errorUpdate, 
    success:successUpdate
  } = categoryUpdate

  useEffect(()=> {

    if (successUpdate) {
      dispatch({type: CATEGORY_UPDATE_RESET})
      toast.success("ແກ້ໄຂປະເພດສິນຄ້າເປັນທີ່ຮຽບຮ້ອຍ",ToastObjects)
    } else {
      if (!category.name || category._id !== categoryId) {
        dispatch(editCategory(categoryId))
      }
      else{
        setName(category.name)
      } 
    }
  },[category,dispatch,categoryId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory({
      _id: categoryId,
      name,
    }))
  }

  return (
    <>
    <Toast/>
        <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler} >
          <div className="content-header">
            <Link to="/category" className="btn btn-danger text-white">
              ໄປທີ່ໜ້າປະເພດສິນຄ້າ
            </Link>
            <h2 className="content-title">ແກ້ໄຂຂໍ້ມູນປະເພດສິນຄ້າ</h2>
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
                { errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message> }
                {loadingUpdate && <Loading/>}
                {
                    loading ? <Loading/> : error ? <Message variant="alert-danger" >{error}</Message> 
                    :
                    (
                      <>
                                        <div className="mb-4">
                  <label htmlFor="product_name" className="form-label">
                    ຊື່ປະເພດສິນຄ້າ
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control py-3"
                    id="product_name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                      </>
                      )
                      }
                </div>
              </div>
            </div>
          </div>
        </form>
        </section>
    </>
  )
}

export default EditcategoryMain;