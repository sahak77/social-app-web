import React from 'react'

const GuestHead = (props) => {
    return (
        <div className="d-flex justify-content-center w-100" style={{zIndex: 200}}>
            <div style={{ position: "relative", width: "860px" }}>
                <img alt="" src={props.coverImgUrl ? props.coverImgUrl : null} style={{ width: "100%", height: 450, borderRadius: 20, backgroundColor: "#1b1e2b" }} />
                <img alt="" src={props.avatar} className="avatar" />
                <h3 align="center" className="text-light" style={{ position: "absolute", left: 220, bottom: 20 }} >{props.firstname} {props.lastname}</h3>
                <br />
            </div>
        </div>
    )
}

export default GuestHead
