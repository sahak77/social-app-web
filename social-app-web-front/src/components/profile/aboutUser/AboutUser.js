import React from 'react'
import { withRouter } from 'react-router-dom';

const AboutaUser = (props) => {
    const deleteAccount = async () =>{
            try {
                const token = localStorage.getItem('token')
                await fetch(`https://ancient-hollows-53837.herokuapp.com/auth/del`, {
                    method: "DELETE",
                    headers: {
                        'auth-token': token
                    }
                })
                window.localStorage.removeItem('token')
                props.history.push('/newsfeed')
                props.setDeleteAcc(true)
            } catch (error) {
                console.log(error);
            }
        }
    
    return (
        <div className="about" style={{zIndex: 77}}>
            <div className="info text-light" >
                <h1 align="center" style={{ border: 1, borderTopRightRadius: 10, borderTopLeftRadius: 10, }} className="bg-success">ABOUT USER</h1>
                <div className="m-3">
                    <p className="text-secondary"><em style={{ fontWeight: "bold", color: "white" }}>email:</em> {props.email}</p>
                    <p className="text-secondary"><em style={{ fontWeight: "bold", color: "white" }}>page created:</em> {props.date}</p>
                    <h3  style={{ fontWeight: "bold", color: "white" }}><em style={{ fontWeight: "bold", color: "white" }}>About me</em></h3>
                    <p className="text-secondary m-auto pb-4 pt-2">
                        {props.info ? props.info : "no information about user"}
                    </p>
                    <hr />
                    <button type="button" className="btn btn-warning btn-lg btn-block mb-3" onClick={() => props.editInfo()}>edit user information</button>
                    <button type="button" className="btn btn-danger btn-lg btn-block" onClick={()=>deleteAccount()}>delete user account</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(AboutaUser)