import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import { yupResolver } from "@hookform/resolvers/yup";

import CategoryCard from "../components/category-card";
import request from "../server/request";
import { LIMIT } from "../consts";
import categorySchema from "../schemas/categorySchema";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSumbitLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [res, setRes] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [selected, setSelected] = useState(null)

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const refreshFetch = () => {
    setRefetch(!refetch);
  };

  

  useEffect(() => {
    const getData = async () => {
      const params = { search, page: page + 1, limit: LIMIT };
      try {
        refetch;
        setLoading(true);
        let { data } = await request("categories", { params });
        let { data: res } = await request("categories", { params: { search } });
        setData(data);
        setRes(res);
        setPages(Math.ceil(res.length / LIMIT));
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [search, page, refetch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    try {
      setSumbitLoading(true)
      if(selected === null){
        await request.post("categories", data);
        toast.success("Category added successfully");
      }else{
        await request.put(`categories/${selected}`, data);
        toast.success("Category refresh successfully");
      }
      refreshFetch();
      setPage(0);
      reset({
        name: '',
        avatar: ''
      });
      setSelected(null)
    } catch (error) {
      toast.error(error);
    } finally {
      setSumbitLoading(false);
    }
  };

  const editCategory = async(id) =>{
    setSelected(id)
    let {data} = await request.put(`categories/${id}`)
    reset({
      name: data.name,
      avatar: data.avatar
    })
  }

  const deleteCategory = async(id) =>{
    let checkDelete = window.confirm()
    if(checkDelete){
    await request.delete(`categories/${id}`)}
    refreshFetch()
    setPage(0)
  }

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const pagination = (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageCount={pages}
      forcePage={page}
      className="pagination"
      activeClassName="active"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      previousLabel="Previous"
      renderOnZeroPageCount={null}
    />
  );

  return (
    <div className="container">
      <div className="input-group my-3 w-75 mx-auto">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="form-control "
          placeholder="Search Category"
        />
      </div>
      <div className="mb-3 w-50 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-control my-3"
            id="text"
            placeholder="Category Name"
            {...register("name")}
          />
          <p className="text-danger">{errors.name?.message}</p>
          <input
            type="url"
            className="form-control"
            id="url"
            {...register("avatar")}
            placeholder="Url Img"
          />
          <p className="text-danger">{errors.avatar?.message}</p>
          <button className="btn btn-primary mt-2 w-100" type="submit">
            {submitLoading ? <span className="spinner-border spinner-border-sm text-start"></span> : null}
            {selected === null ? "Add Category" : "Save Category"}
          </button>
        </form>
      </div>
      <div className="alert alert-success">
        <h1>Categories quantity: {res?.length}</h1>
      </div>
      {res.length <= 6 ? null : <div>{pagination}</div>}
      <div className="row">
        {loading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          data?.map((el) => {
            return (
              <div
                key={el.id}
                className=" col-sm-12 col-md-6 col-lg-4 col-xl-3"
              >
                <CategoryCard {...el}  editCategory={editCategory} deleteCategory={deleteCategory}/>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
