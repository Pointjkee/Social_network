import React from 'react';
import {Formik} from "formik";
import * as yup from 'yup'
import {connect} from 'react-redux';
import {login} from "../../Redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../Redux/storeRedux";

type LoginPropsType = {
    login: any
    isAuth?: boolean
}
const Login = (props: LoginPropsType) => {
    if (props.isAuth){
        return <Redirect to={'/profile/20082'}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginForm login={props.login}/>
    </div>
}

const validationSchema = yup.object().shape({
    login: yup.string().required('Напишите что-нибудь').max(20, 'Слишком много!'),
    password: yup.string().required('Напишите что-нибудь').max(20, 'Слишком много!')
})

export const LoginForm = (props: LoginPropsType) => (
    <Formik
        initialValues={{
            login: '',
            password: '',
            rememberMe: false,
        }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            setTimeout(() => {
                props.login(values.login, values.password, values.rememberMe)
                resetForm()
                setSubmitting(false)
            }, 500)
        }}
    >
        {props => (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <input
                        id="login"
                        placeholder="Login"
                        {...props.getFieldProps("login")}
                    />
                    {props.errors.login && props.touched.login ? (
                        <div style={{color: 'red'}}>{props.errors.login}</div>
                    ) : null}
                </div>
                <div>
                    <input
                        id="password"
                        placeholder="Password"
                        type={'password'}
                        {...props.getFieldProps("password")}
                    />
                    {props.errors.password && props.touched.password ? (
                        <div style={{color: 'red'}}>{props.errors.password}</div>
                    ) : null}
                </div>
                <div>
                    <input type="checkbox"
                           id="rememberMe"
                           onChange={props.handleChange}
                           defaultChecked={props.values.rememberMe}
                    />
                    <label htmlFor="rememberMe">
                        Remember me
                    </label>

                </div>
                <button type="submit"
                        disabled={props.isSubmitting || !!props.errors.login || !!props.errors.password}
                >Send
                </button>
            </form>
        )}
    </Formik>
)

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)


/*
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
}*/
