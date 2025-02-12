import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);
  const { signUp } = useActions();  

  const [formValues, setFormValues] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.userName) newErrors.userName = "Обов'язкове поле";
    if (!formValues.firstName) newErrors.firstName = "Обов'язкове поле";
    if (!formValues.lastName) newErrors.lastName = "Обов'язкове поле";
    if (!formValues.email) {
      newErrors.email = "Обов'язкове поле";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Некоректний емайл";
    }
    if (!formValues.password || formValues.password.length < 8) {
      newErrors.password = "Повинно бути 8 і більше символів";
    }
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await signUp(formValues);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className="container align-items-center d-flex flex-column my-4">
      <div className="register-box w-50">
        <form onSubmit={handleSubmit} className="form d-flex flex-column gap-3 text-start align-items-center">
          <h1>Sign Up</h1>
          {[
            { label: "User Name", name: "userName" },
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
          ].map(({ label, name, type = "text" }) => (
            <div className="form-group w-50" key={name}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                onChange={handleChange}
                value={formValues[name]}
                className={`form-control ${errors[name] ? "is-invalid" : ""}`}
              />
              {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-25">
            Sign Up
          </button>
          <div className="login-link">
            <Link to="/login">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
