import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory, listCategories } from "../../Redux/Actions/CategoryActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

export const CategoriesTable = () => {

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList )
  const {loading,error, categories } = categoryList

  const categoryCreate = useSelector((state) => state.categoryCreate );

  const { error:errorCreate, success:successCreate } = categoryCreate

  const categoryDelete = useSelector((state) => state.categoryDelete );

  const { error:errorDelete, success:successDelete } = categoryDelete

  const deletehandler = (id) => {
    if(window.confirm("ທ່ານໝັ້ນໃຈບໍທີ່ຈະລົບປະເພດສິນຄ້ານີ້?")) {
      dispatch(deleteCategory(id))
    }
  }

  useEffect(()=>{
    dispatch(listCategories())
  },[dispatch,successCreate,successDelete])

  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
      { errorDelete && (
        <Message variant="alert-danger" >{errorDelete}</Message>
      )}
      { errorCreate && (
        <Message variant="alert-danger" >{errorCreate}</Message>
      )}
      { loading ? (<Loading/>) 
          : error ? (<Message variant="alert-danger" >{error}</Message>)
          : (
            <>
            <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ໄອດີ</th>
            <th>ຊື່ປະເພດສິນຄ້າ</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
            { categories.map((category) => (
              <tbody>
              <tr>
              <td>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" />
                </div>
              </td>
              <td>{category._id}</td>
              <td>
                <b>{category.name}</b>
              </td>
              <td className="text-end">
                <div className="dropdown">
                  <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </Link>
                  <div className="dropdown-menu">
                    <Link 
                    to={`/category/${category._id}/edit`}
                    className="dropdown-item"
                    >
                      ແກ້ໄຂ
                    </Link>
                    <Link 
                    onClick={() => deletehandler(category._id)}
                    className="dropdown-item text-danger" 
                    to="#">
                      ລົບ
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
            ))}
            </>
          ) 
        }
      </table>
    </div>
  );
};

export default CategoriesTable;
