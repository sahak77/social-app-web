import React from 'react'

const AboutaUser = (props) => {
    return (
        <div className="about" style={{zIndex: 77}}>
            <div className="info text-light" >
                <h1 align="center" style={{ border: 1, borderTopRightRadius: 10, borderTopLeftRadius: 10, }} className="bg-success">ABOUT USER</h1>
                <div className="m-3">
                    <p className="text-secondary"><em className="text-white font-weight-bold">email:</em> {props.email}</p>
                    <p className="text-secondary"><em className="text-white font-weight-bold">page created:</em> {props.date}</p>
                    <h3 className="text-secondary"><em className="text-white font-weight-bold">About me</em></h3>
                    <p className="text-secondary m-auto pb-4 pt-2">
                        {props.info ? props.info : "no information about user"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutaUser