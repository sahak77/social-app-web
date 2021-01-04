import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import './SinglePage.css';

const SinglePage = (props) => {
    const [comment, showComment] = useState(false)
    return (
        <>
            <div className="single_page_cont">
                <div className="close_single_page" onClick={() => props.setSinglePageView()}>X</div>
                <div className="page">
                    <div align="center" className="img_cont">
                        <img alt="post" src={props.post.imgUrl} className="postImg" />
                    </div>
                    <div className="side">
                        <div className="d-flex flex-row">
                            <img alt="" src={props.post.userId.avatar} className="user_avatar" />
                            <div className="d-flex flex-column">
                                <p style={{ fontWeight: 600, paddingLeft: 15, margin: 0 }}>{props.post.userId.lastname}&nbsp;{props.post.userId.firstname}</p>
                                <span style={{ paddingLeft: 15, fontSize: 11, color: "gray" }} >posted: {props.post.date}</span>
                            </div>
                        </div>
                        <br />

                        <div className="text_cont">
                            <span style={{ fontSize: 14 }}>{props.post.text}</span>
                        </div>
                        <div className="d-flex justify-content-around mt-3 mb-3">
                            {
                                props.post.like.filter(id => id.includes(props.id)).length ?
                                    <div style={{ cursor: "pointer", color: "#19c13f" }} onClick={() => { props.fetchUserDislike() }} ><img alt="" src={require('../../../icons/liked.png')} width="20px" height="20px" className="mb-1 mr-2" />liked</div>
                                    : <div style={{ cursor: "pointer" }} onClick={() => { props.fetchUserLike() }} ><img alt="" src={require("../../../icons/like.png")} width="20px" height="20px" className="mb-1 mr-2" /> like</div>
                            }
                            <div style={{ cursor: "pointer" }} onClick={() => showComment(!comment)}>comment</div>
                        </div>
                        {comment ? <div>
                            <div className=" justify-content-center bg-white" style={{ width: "100%" }}>
                                <div className="d-flex">
                                    <input type="text" className={`comment_input ${props.invalidComment ? " com_error" : null}`} placeholder={`${props.invalidComment ? "you must write something" : "type comment"}`} value={props.comment} onChange={(event) => props.setComment(event.target.value)} />
                                    <button className="add_comment" onClick={() => props.fetchComment()}><img alt="" src="https://image.flaticon.com/icons/svg/1069/1069159.svg" style={{ width: 25, height: 25, color: "#0EC431" }} /></button>
                                </div>
                            </div>
                        </div> : null}
                        <div style={{ overflow: "scroll", marginTop: 7 }} >
                            {[...props.commentData].reverse().map((i, index) => {
                                return (
                                    <div key={index} >
                                        <div className="d-flex flex-row">
                                            <div>
                                                <img alt="" src={i.userId.avatar} style={{ width: 35, height: 35, marginTop: 4, borderRadius: "50%" }} />
                                            </div>
                                                &nbsp;
                                                <div className="com_box" >
                                                <p style={{ margin: 0 }}> <NavLink className="com_link" to={`/guest/${i.userId._id}`}>{i.userId.firstname}&nbsp;
                                                    {i.userId.lastname}</NavLink><span style={{ fontSize: 13, fontWeight: 500 }}> {i.comment} </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePage