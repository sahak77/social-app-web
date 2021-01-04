import React from 'react';
import { NavLink, withRouter } from "react-router-dom"
import { Formik } from 'formik';
import * as Yup from 'yup'
import Error from '../Error';
import Head from '../../head/Head';
import '../auth.css'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email adress')
        .max(30, 'Must be shorter than 30')
        .required('email required'),
    password: Yup.string()
        .min(6, 'Must be more than 6 letters')
        .required('password required')
})

const SignIn = (props) => {
    const [errorMessage, setErrorMessage] = React.useState(null)

    const signIn = async (value) => {
        try {
            const fetchSignIn = await fetch('https://ancient-hollows-53837.herokuapp.com/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            const data = await fetchSignIn.json()
            if (data.error) {
                setErrorMessage(data.error)
            }
            else {
                localStorage.setItem('token', data.auth_token)
                props.setProfile()
                props.history.push('/profile')
            }
        }
        catch (error) {
            setErrorMessage('something went wrong');
        }
    }
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                signIn(values)
                resetForm()
                setSubmitting(false)
            }}
        >
            {(
                {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }
            ) => {
                return (
                    <>
                    <Head />
                    <div style={{height: "100%", width: "100%"}}>
                         
                        <div className="form-div">
                            <div style={{ marginLeft: 500 }} className="pt-2">
                                <h1 className="text-light">WELCOME </h1>
                                <h1 className="text-success" style={{ marginLeft: 95 }}>
                                    BACK
                                </h1>
                            </div>
                            {props.signUpSuccess ? <><div className="signUp_alert" ><p className="text-light m-0">your account was successfully created</p></div> {
                                setTimeout(() => {
                                    props.setSignUpSuccess(false)
                                }, 2000)
                            }</> : null}
                            <form className="form d-flex flex-column m-auto"  onSubmit={handleSubmit} >
                            <h1 className="log-in mt-5">sign in</h1>
                                <div className="d-flex flex-row">
                                    <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-envelope-fill mt-4 mr-2 d-inline" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                    </svg>
                                    <input id='email'
                                        type='email'
                                        name='email'
                                        placeholder='Enter your email'
                                        value={values.email}
                                        className={touched.email && errors.email ? 'has-error' : null}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </div>
                                <Error touched={touched.email} message={errors.email} />
                                <div className="d-flex flex-row">
                                    <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-lock-fill mt-4 mr-2" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                                        <path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
                                    </svg>
                                    <input
                                        id='password'
                                        type='password'
                                        name='password'
                                        placeholder='Enter your password'
                                        value={values.password}
                                        className={touched.password && errors.password ? 'has-error' : null}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <Error touched={touched.password} message={errors.password} />
                                <button type="submit" className="btn btn-success btn-lg mt-5" >
                                    LOG IN
                                        <svg width="40px" height="40px" viewBox="0 0 16 16" className="bi bi-arrow-right pl-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z" />
                                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z" />
                                    </svg>
                                </button>
                                <p className="mt-2 text-danger">{errorMessage}</p>
                                <br /><br /><br />
                                <p style={{ color: "#bac1d0" }}>&nbsp;&nbsp;&nbsp;&nbsp; Don't have an account &nbsp;<NavLink style={{ textDecoration: "underline", color: "#00d48f" }} to="/signup"> sign up </NavLink>&nbsp; now.</p>
                            </form>
                        </div> 
                    </div>
                    </>
                )
            }}
        </Formik>
    );
}

export default withRouter(SignIn)
