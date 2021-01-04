import React, { useState } from 'react';
import { withRouter, NavLink } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup'
import Error from '../Error';
import Head from '../../head/Head';
import '../auth.css'

const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('firstname and lastname required'),
    lastname: Yup.string()
        .required('firstname and lastname required'),
    email: Yup.string()
        .email('Must be a valid email adress')
        .max(30, 'Must be shorter than 30')
        .required('email required'),
    password: Yup.string()
        .min(6, 'Must be more than 6 letters')
        .required('password required')
})

const SignUp = (props) => {
    const [err, setErr] = useState("")

    const signUp = async (value) => {
        try {
            const fetchSignUp = await fetch("https://ancient-hollows-53837.herokuapp.com/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            const data = await fetchSignUp.json()
            setErr(data.error);
            if (!data.error) {
                props.setSignUpSuccess(true)
                props.history.push("/signin");
            }
        }
        catch (error) {
            setErr(error);
        }
    }
    return (
        <Formik
            initialValues={{ firstname: '', lastname: '', email: '', password: '', avatar: 'https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                signUp(values)
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
                        <div className="d-flex justify-content-center" style={{ height: "100%", width: "100%" }}>

                            <div className="form-div">
                                <div style={{ marginLeft: 500 }} className="pt-2">
                                    <h1 className="text-light">DON'T HAVE</h1>
                                    <h1 className="text-success" style={{ marginLeft: 40 }}>
                                        ACCOUNT?
                                </h1>
                                </div>
                                <form className="form" onSubmit={handleSubmit} >
                                    <h1 className="log-in mt-5" align="center">sign up</h1>
                                    <div className="d-flex flex-row">
                                        <span style={{ color: "white", marginTop: 21, width: 30 }}>___</span>
                                        <input id='firstname'
                                            type='text'
                                            name='firstname'
                                            placeholder='Enter your firstname'
                                            value={values.firstname}
                                            className={touched.firstname && errors.firstname ? 'has-error' : null}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {/* :) */}
                                    <div style={{width: 20,height: 115,position: "absolute",top: 226,left: 243 }}>
                                        <span style={{ position: "absolute", color: "white", top: 39, left: 5 }}>|</span>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" style={{ position: "absolute", top: 70, left: 0 }} className="bi bi-person-square" fill="white" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path fillRule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                        <span style={{ position: "absolute", color: "white", top: 91, left: 5 }}>|</span>
                                    </div>
                                    {/* :) */}
                                    <div className="d-flex flex-row">
                                        <span style={{ color: "white", marginTop: 21, width: 30 }}>___</span>
                                        <input id='lastname'
                                            type='text'
                                            name='lastname'
                                            placeholder='Enter your lastname'
                                            value={values.lastname}
                                            className={touched.lastname && errors.lastname ? 'has-error' : null}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        {
                                            touched.firstname || touched.lastname ? <Error touched={touched.firstname || touched.lastname} message={errors.firstname || errors.lastname} /> : null
                                        }
                                    </div>
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
                                    <input id='avatar'
                                        type='hidden'
                                        name='avatar'
                                        value={"https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"}
                                    />
                                    <button type="submit" className="btn btn-success btn-lg mt-5">
                                        SIGN UP
                                    <svg width="40px" height="40px" viewBox="0 0 16 16" className="bi bi-arrow-right pl-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z" />
                                            <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z" />
                                        </svg>
                                    </button>
                                    {
                                        err ? <p style={{ color: "#ff4242", marginBottom: 0 }}>{err}</p> : null
                                    }
                                    <br /><br />
                                    <p style={{ color: "#bac1d0" }}>&nbsp;&nbsp;&nbsp;&nbsp; Already have an account &nbsp;<NavLink style={{ textDecoration: "underline", color: "#00d48f" }} to="/signin"> sign in </NavLink>&nbsp; now.</p>
                                </form>
                            </div>
                        </div>

                    </>
                )
            }}
        </Formik>
    )
}

export default withRouter(SignUp);