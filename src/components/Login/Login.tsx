import React from 'react';
import {useFormik} from "formik";

export const Login = () => {
    return <div>
        <h1>Login</h1>
        <LoginForm/>
    </div>
}
type initialValuesFormikType = {
    login: string,
    password: string,
    rememberMe: boolean,
}

export const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true)
            setTimeout(() => {
                console.log(values)
                setSubmitting(false)
            }, 1000)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    id="login"
                    placeholder="Login"
                    {...formik.getFieldProps("login")}
                />
            </div>

            <div>
                <input
                    id="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                />

            </div>
            <div>
                <input type="checkbox"
                       id="rememberMe"
                       onChange={formik.handleChange}
                       defaultChecked={formik.values.rememberMe}
                />
                <label htmlFor="rememberMe">
                    Remember me
                </label>

            </div>
            <button type="submit" disabled={formik.isSubmitting}>Submit</button>
        </form>
    );
}