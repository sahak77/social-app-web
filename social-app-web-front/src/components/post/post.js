import React from "react"
import ReadMoreAndLess from 'react-read-more-less';
import { NavLink } from "react-router-dom";
import SinglePage from "./singlePage/SinglePage";
import "./post.css"

class Post extends React.Component {
    state = {
        id: "",
        more: false,
        singlePageView: false,
        com: false,
        comment: "",
        invalidComment: false,
        commentData: [],
        profileUser: false,
        loadComment: false,
        num:3

    }
    setSinglePageView = () => {
        this.setState({ singlePageView: !this.state.singlePageView })
        this.fetchPostComment()
    }
    setComment = (value) => {
        this.setState({ comment: value })
    }
    fetchUserLike = async () => {
        try {
            const token = localStorage.getItem('token')
            await fetch(`https://ancient-hollows-53837.herokuapp.com/posts/add/like/${this.props.post._id}`, {
                method: "POST",
                headers: {
                    'auth-token': token
                },
            })
            this.props.fetchUserPost()
        } catch (error) {
            console.log(error);
        }
    }

    fetchUserDislike = async () => {
        try {
            const token = localStorage.getItem('token')
            await fetch(`https://ancient-hollows-53837.herokuapp.com/posts/del/like/${this.props.post._id}`, {
                method: "POST",
                headers: {
                    'auth-token': token
                },
            })
            this.props.fetchUserPost()
        } catch (error) {
            console.log(error);
        }
    }
    fetchComment = async () => {
        if (this.state.comment === '') {
            this.setState({ invalidComment: true })
        }
        else {
            try {
                const token = localStorage.getItem('token')
                console.log(token);
                await fetch(`https://ancient-hollows-53837.herokuapp.com/comment/add`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },
                    body: JSON.stringify({
                        comment: this.state.comment,
                        postId: this.props.post._id
                    })
                })
                this.fetchPostComment()
                this.setState({
                    comment: "",
                    invalidComment: false,
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
    fetchPostComment = async () => {
        try {
            const token = localStorage.getItem('token')
            const comment = await fetch(`https://ancient-hollows-53837.herokuapp.com/comment/${this.props.post._id}`, {
                method: "GET",
                headers: {
                    'auth-token': token
                },
            })
            const commentData = await comment.json()
            this.setState({ commentData: commentData })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.postCom = window.setTimeout(() => {
            this.fetchPostComment()
        }, 0);
    }
    componentDidUpdate() {
        if (this.props.addButton) {
            this.postComBtn = window.setTimeout(() => {
                this.fetchPostComment()
            }, 500);
            this.props.addButtonClick()
            this.setState({com: false})
        }
        if (this.props.postDelButton) {
            this.postDelBtn = window.setTimeout(() => {
                this.fetchPostComment()
            }, 500);
            this.props.postDelButtonClick()
            this.setState({com: false})
        }
    }
    componentWillUnmount() {
        window.clearInterval(this.postDelBtn)
        window.clearTimeout(this.postCom)
        window.clearTimeout(this.postComBtn)
    }
    render() {
        return (
            <>
                {this.state.singlePageView ? <SinglePage
                    commentData={this.state.commentData}
                    setSinglePageView={this.setSinglePageView}
                    post={this.props.post}
                    fetchPostComment={this.fetchPostComment}
                    fetchComment={this.fetchComment}
                    setComment={this.setComment}
                    comment={this.state.comment}
                    invalidComment={this.state.invalidComment}
                    fetchUserDislike={this.fetchUserDislike}
                    fetchUserLike={this.fetchUserLike}
                    id={this.props.id}
                /> : null}
                <div className="posts pb-2" style={{ width: this.props.width }}>
                    <div className="about_author d-flex flex-row p-3">
                        <img alt="" src={this.props.post.userId.avatar} width="90px" height="90px" className="rounded-circle p-3" />
                        <div className="p-2">
                            {
                                !this.props.del ?
                                    <NavLink to={"guest/" + this.props.post.userId._id}> <h3 className="text-light text-bold">{this.props.post.userId.firstname} {this.props.post.userId.lastname}</h3></NavLink>
                                    : <h3 className="text-light text-bold">{this.props.post.userId.firstname} {this.props.post.userId.lastname}</h3>}
                            <p className="text-muted">posted: {this.props.post.date}</p>
                            {this.props.del ?
                                <svg style={{ transform: this.props.imgStyle }} width="30px" height="30px" viewBox="0 0 16 16" className="bi bi-three-dots dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => this.setState({ more: !this.state.more })}>
                                    <path fillRule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                </svg>
                                : null}
                        </div>
                        {this.state.more ? <div className="more" style={{ transform: this.props.imgStyle }}>
                            <button className="rounded-0 btn btn-warning btn-lg btn-block" type="button" onClick={() => { this.props.editPage(this.props.post.text, this.props.post.imgUrl, this.props.post._id); this.setState({ more: !this.state.more }) }}>edit post</button>
                            <button className="rounded-0 btn btn-danger btn-lg btn-block" type="button" onClick={() => { this.props.fetchPostDel(this.props.post._id); this.setState({ more: !this.state.more }) }}>delete post</button>
                        </div> : null}
                    </div>
                    <hr />

                    <div>
                        <img alt="" onClick={() => this.setSinglePageView()} src={this.props.post.imgUrl} style={{ transform: this.props.imgStyle }} align="center" className="post_img" />
                        <div style={{ transform: this.props.imgStyle, wordBreak: "break-word"}} className="post_content pt-3 pr-4 pl-4 pb-1">
                            <ReadMoreAndLess
                                ref={this.props.post.text}
                                className="read-more-content"
                                charLimit={720}
                                readMoreText={"Read more"}
                                readLessText="Read less"
                            >
                                {this.props.post.text}
                            </ReadMoreAndLess>
                        </div>
                    </div>
                    <hr />
                    <div >
                        <p className="pl-4">likes : {this.props.post.like.length}&nbsp;&nbsp; comments : {this.state.commentData.length}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-around text-light">
                        {
                            this.props.post.like.filter(id => id.includes(this.props.id)).length ?
                                <div style={{ cursor: "pointer", color: "#fff085" }} onClick={() => { this.fetchUserDislike() }} ><img alt="" src={require("../../icons/liked.png")} width="20px" height="20px" className="mb-1 mr-2" />liked</div>
                                : <div style={{ cursor: "pointer" }} onClick={() => { this.fetchUserLike() }} ><img alt="" src={require("../../icons/like.png")} width="20px" height="20px" className="mb-1 mr-2" /> like</div>
                        }
                        <div style={{ cursor: "pointer" }} onClick={() => { this.setState({ com: !this.state.com }); this.fetchPostComment() }}><img alt="" src={require("../../icons/comment.png")} width="20px" height="20px" className="mb-1 mr-2" />comment</div>
                    </div>
                    <hr />
                    {
                        this.state.com ?
                            <div>
                                <div className="d-flex justify-content-center bg-white mb-3 mt-2" style={{ transform: this.props.imgStyle, margin: "auto", width: "92%", position: "relative" }}>
                                    <input type="text" className="comment_input" placeholder="type comment" value={this.state.comment} onChange={(event) => this.setState({ comment: event.target.value })} />
                                    {this.state.invalidComment ? !this.state.comment.length ? <p className="com_valid">you must write something</p> : null : null}
                                    <button className="add_comment" onClick={() => this.fetchComment()}>add comment</button>
                                </div>
                                {
                                  [...this.state.commentData].reverse().slice(0, this.state.num).map((i, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="d-flex flex-row m-3">
                                                    <div style={{ paddingLeft: 10 }}>
                                                        <img alt="" src={i.userId.avatar} className="com_avatar" />
                                                    </div>
                                                    <div className="guest_cont">
                                                        <p style={{ margin: 0 }}> <NavLink to={`/guest/${i.userId._id}`}>{i.userId.firstname}&nbsp;
                                                    {i.userId.lastname}</NavLink> {i.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            {
                            this.state.commentData.length > 3 ?
                                <>
                                   { 
                                    this.state.num >= this.state.commentData.length
                                        ? <p align="center" onClick={()=>this.setState({num: 3})} className="com_load_more">hide lodaing comment</p>
                                        : <p align="center" onClick={()=>this.setState({num: this.state.num + 3})} className="com_load_more">load more comments</p>
                                    }
                                </>
                            :null
                            }
                            </div>
                            : null
                    }
                </div>
            </>
        )
    }
}

export default Post