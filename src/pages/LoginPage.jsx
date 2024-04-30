import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

import loginSchema from "../schemas/loginSchema";

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    handleSubmit,
    handleChange,
    values: { email, password },
    touched,
    errors
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async(values) => {
      try {
        setLoading(true)
        await axios.post('https://reqres.in/api/login', values)
        navigate('/home')
        toast.success("Success",{autoClose: 1000})
      } catch (error) {
        toast.error(error.response.data.error,{autoClose: 1000})
      }finally{
        setLoading(false)
      }
    },
  });
  return (
    <div className="container flex-column d-flex justify-content-center align-items-center vh-100">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={handleChange}
            value={email}
            type="email"
            className="form-control"
            id="email"
            placeholder="@example.com"
          />
          {touched.email && errors.email ? (
            <p className="text-danger">{errors.email}</p>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
          {touched.password && errors.password ? (
            <p className="text-danger">{errors.password}</p>
          ) : null}
        </div>
        <button disabled={loading} type="submit" className="btn btn-primary w-100 ">
          {loading ? <span className="spinner-border spinner-border-sm text-start" aria-hidden="true"></span> : null}
          Send
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
