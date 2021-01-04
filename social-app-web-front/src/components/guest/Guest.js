import React, { Component } from "react";
import Head from "../head/Head"
import Post from '../post/post'
import GuestHead from "./guestHead/GuestHead"
import AboutUser from "./aboutUser/AboutUser";
import "./Guest.css"
import "../profile/Profile.css"

class Guest extends Component {
    state = {
        avatar: '',
        firstname: '',
        lastname: '',
        coverImgUrl: '',
        email: '',
        info: '',
        date: '',
        postData: [],
        noPost: false,
        id:"",
    }


    fetchUserId = async () => {
        try {
            const token = localStorage.getItem('token')
            const fetchedData = await fetch('https://ancient-hollows-53837.herokuapp.com/auth/profile', {
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            })
            const userData = await fetchedData.json()
            this.setState({ id: userData._id })

        } catch (error) {
            console.log(error);
        }
    }

    fetchUserPost = async () => {
        try {
            const token = localStorage.getItem("token")
            const fetchData = await fetch(`https://ancient-hollows-53837.herokuapp.com/posts/user/${this.props.match.params.id}`, {
                method: "GET",
                headers: {
                    "auth-token": token
                }
            })
            const userData = await fetchData.json()
            this.setState({
                postData: [...userData].reverse(),
            })
            if (this.state.avatar === undefined) {
                this.setState({ avatar: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png" })
            }
            if (!this.state.postData.length) {
                this.setState({ noPost: true })
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser = async () => {
        try {
            const token = localStorage.getItem("token")
            const fetchData = await fetch(`https://ancient-hollows-53837.herokuapp.com/auth/user/${this.props.match.params.id}`, {
                method: "GET",
                headers: {
                    "auth-token": token
                }
            })
            const userData = await fetchData.json()
            this.setState({
                firstname: userData.firstname,
                lastname: userData.lastname,
                coverImgUrl: userData.coverImgUrl,
                avatar: userData.avatar,
                info: userData.info,
                date: userData.date,
                email: userData.email,
            })
            if (this.state.avatar === undefined) {
                this.setState({ avatar: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png" })
            }
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        this.fetchUserPost()
        this.fetchUser()
        this.fetchUserId()
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="d-flex flex-column w-100">
                <Head />
                <GuestHead
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    avatar={this.state.avatar}
                    coverImgUrl={this.state.coverImgUrl}
                />
                <div className="app d-flex flex-row pt-4 justify-content-center">
                    <AboutUser email={this.state.email} date={this.state.date} info={this.state.info} />
                    <div className="d-flex flex-column">
                        {this.state.noPost ?
                            <div style={{ width: 600, height: "auto" }}>
                                <h3 className="no_post">post not found</h3>
                            </div>
                            : this.state.postData.map((i, index) => {
                                i.userId.avatar = this.state.avatar
                                if (index % 2 === 1) {
                                    return (
                                        <Post key={index}
                                            width={600}
                                            post={i}
                                            imgStyle={"skewy(1deg)"}
                                            del={false}
                                            fetchUserPost={this.fetchUserPost}
                                            id={this.state.id}
                                        />
                                    )
                                }
                                else {
                                    return (
                                        <Post key={index}
                                            width={600}
                                            post={i}
                                            imgStyle={"skewy(-1deg)"}
                                            del={false}
                                            fetchUserPost={this.fetchUserPost}
                                            id={this.state.id}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Guest;