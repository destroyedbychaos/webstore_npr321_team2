import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const navigate = useNavigate();
    const { isAuth } = useSelector((store) => store.auth);
    const { signIn } = useActions();
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    const validationSchema = Yup.object({
        email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
        password: Yup.string().min(6, "Повинно бути 6 і більше символів").required("Обов'язкове поле"),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            const response = await signIn({ ...values, rememberMe });
            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                navigate("/");
            }
        },
    });

    return (
        <div className="container d-flex flex-column align-items-center my-4">
            <div className="login-box w-50">
                <form onSubmit={formik.handleSubmit} className="form d-flex flex-column gap-3 text-start align-items-center">
                    <h1>Sign In</h1>
                    <div className="form-group w-50">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="form-group w-50">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        )}
                    </div>
                    <div className="form-check w-50">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-25">Sign In</button>
                    <div className="register-link">
                        <Link to="/register">Don't have an account? Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
