import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../components/product-card";
import request from "../server/request";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import productSchema from "../schemas/productSchema";

const Products = () => {
  const { categoryId } = useParams();
  const [id, setId] = useState(categoryId);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesId, setCategoriesId] = useState([]);
  const [refetch, setRefetch] = useState(false)
  const [submitLoading, setSumbitLoading] = useState(false);
  const [selected, setSelected] = useState(null)

  const refreshFetch = () =>{
    setRefetch(!refetch)
  }
  useEffect(() => {
    const getData = async () => {
      try {
        
        refetch
        setLoading(true);
        const { data } = await request(`categories/${id}/products`);
        setData(data);
        const { data: res } = await request("categories");
        setCategoriesId(res);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, refetch]);

  const handleSelect = (e) => {
    setId(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(
    {
        resolver: yupResolver(productSchema),
      }
  )

  const onSubmit = async(data) => {
    try {
        setSumbitLoading(true)
        if(selected === null){
            await request.post(`categories/${id}/products`, data)
        }else{
            await request.put(`categories/${id}/products/${selected}`, data)
        }
        reset({
            name: '',
            description: '',
            avatar: ''
        })
        setSelected(null)
        refreshFetch()
    } catch (error) {
        toast.error(error)
    }finally{
        setSumbitLoading(false)
    }
  }

  const editProduct = async(productId) =>{
    let {data} = await request(`categories/${id}/products/${productId}`)
    setSelected(productId)
    reset({
        name: data.name,
        description: data.description,
        avatar: data.avatar
    })
  }
  const deleteProduct = async(productId) =>{
    let checkDelete = window.confirm()
    if(checkDelete){
        await request.delete(`categories/${id}/products/${productId}`)
        refreshFetch()
    }
  }

  return (
    <div className="container">
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Product..."
          />
          <span className="input-group-text">
            <select className="form-select" onChange={handleSelect} value={id}>
              {categoriesId.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.name} {el.id}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 w-50 mx-auto">
          <input
            type="text"
            className="form-control my-2"
            id="name"
            placeholder="Product Name"
            {...register("name")}
          />
          <p className="text-danger">{errors.name?.message}</p>
          <input
            type="text"
            className="form-control my-2"
            id="description"
            placeholder="Product description"
            {...register("description")}
          />
          <p className="text-danger">{errors.description?.message}</p>
          <input
            type="url"
            className="form-control my-2"
            id="avatar"
            placeholder="Product Img"
            {...register("avatar")}
          />
          <p className="text-danger">{errors.avatar?.message}</p>

            <button type="submit" className="btn btn-primary w-100">
            {submitLoading ? <span className="spinner-border spinner-border-sm text-start"></span> : null}
                {selected === null ? "Add Product" : "Save Product" }
            </button>
        </div>
        </form>
      <div className="row">
        
        {loading ? (
          <h1 className="text-center">
            <div className="spinner-border text-primary">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading..
          </h1>
        ) : (
          data.map((el) => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={el.id}>
                <ProductCard editProduct={editProduct} deleteProduct={deleteProduct} {...el} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;
