import React from "react"
import isImageUrl from 'is-image-url'
import Head from "../head/Head"
import NewPost from "./newPost/NewPost"
import Post from '../post/post'
import ProfileHead from './profileHead/ProfileHead'
import AboutaUser from "./aboutUser/AboutUser"
import "./Profile.css"


class Profile extends React.Component {
    state = {
        // user
        avatar: '',
        username: '',
        firstname: '',
        lastname: '',
        coverImgUrl: '',
        email: '',
        info: '',
        date: '',
        _id: '',
        //user posts
        postData: [],
        //edit posts
        text: "",
        imgUrl: "",
        postId: "",
        // error
        invalidAvatarValue: false,
        invalidCoverImgValue: false,
        invalidUserInfo: false,
        invalidPostUpdate: false,
        noPost: false,
        // alert
        massage: false,
        massageValue: "",
        massageColor: "",
        // other
        updateDiv: false,
        editInfo: false,
        addButton: false,
        postDelButton: false
    }

    addButtonClick = () => {
        this.setState({ addButton: !this.state.addButton })
    }
    postDelButtonClick = () => {
        this.setState({ postDelButton: !this.state.postDelButton })
    }
    editInfo = () => {
        this.setState({ editInfo: !this.state.editInfo })
    }
    massage = (massage, massageValue, massageColor) => {
        this.setState({
            massage, massageValue, massageColor
        })
        this.msg = window.setTimeout(() => {
            this.setState({ massage: false })
        }, 2000);
    }
    fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token')
            const fetchedData = await fetch('https://ancient-hollows-53837.herokuapp.com/auth/profile', {
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            })
            const userData = await fetchedData.json()
            this.setState({
                firstname: userData.firstname,
                lastname: userData.lastname,
                coverImgUrl: userData.coverImgUrl,
                avatar: userData.avatar,
                username: userData.username,
                info: userData.info,
                date: userData.date,
                email: userData.email,
                _id: userData._id,
            })
        } catch (error) {
            console.log(error);
        }
    }
    fetchUserPost = async () => {
        try {
            const token = localStorage.getItem('token')
            const fetchedData = await fetch('https://ancient-hollows-53837.herokuapp.com/posts/profile', {
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            })
            let postData = await fetchedData.json()
            postData = [...postData].reverse();
            this.setState({ postData })
            if (!this.state.postData.length) {
                this.setState({ noPost: true })
            }
            else {
                this.setState({ noPost: false })
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchPostUpdate = async () => {
        if ((!this.state.text.length && !isImageUrl(this.state.imgUrl)) || (!isImageUrl(this.state.imgUrl) && this.state.imgUrl)) {
            this.setState({ invalidPostUpdate: true })
        }
        else {
            try {
                const token = localStorage.getItem('token')
                await fetch(`https://ancient-hollows-53837.herokuapp.com/posts/update/${this.state.postId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },
                    body: JSON.stringify({
                        text: this.state.text,
                        imgUrl: this.state.imgUrl
                    })
                })
                this.setState({ updateDiv: false, invalidPostUpdate: false })
                this.fetchUserPost()
                this.massage(true, "post was edited", "#ffc107")
            } catch (error) {
                console.log(error);
            }
        }
    }
    fetchInfoUpdate = async () => {
        if (!this.state.firstname.length || !this.state.lastname.length) {
            this.setState({ invalidUserInfo: true })
        }
        else {
            try {
                const token = localStorage.getItem('token')
                await fetch(`https://ancient-hollows-53837.herokuapp.com/auth/updateinfo/${this.state._id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },
                    body: JSON.stringify({
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        email: this.state.email,
                        username: this.state.username,
                        info: this.state.info,
                    })
                })
                this.setState({ editInfo: false, invalidUserInfo: false })
                this.massage(true, "user data was updated", "#ffc107")
                this.fetchUserPost()
            } catch (error) {
                console.log(error);
            }
        }
    }

    fetchAvatarUpdate = async (avatar, setAvatar) => {
        try {
            if (!isImageUrl(avatar)) {
                this.setState({ invalidAvatarValue: true })
            }
            else {
                setAvatar(false)
                this.setState({ avatar })
                const token = localStorage.getItem('token')
                await fetch(`https://ancient-hollows-53837.herokuapp.com/auth/updateavatar/${this.state._id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },
                    body: JSON.stringify({
                        avatar: avatar,
                    })
                })
                this.fetchUserPost()
                this.massage(true, "avatar was changed", "#29a744")
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    fetchCoverImgUpdate = async (coverImgUrl, setCoverImg) => {
        try {
            if (!isImageUrl(coverImgUrl)) {
                this.setState({ invalidCoverImgValue: true })
            }
            else {
                setCoverImg(false)
                this.setState({ coverImgUrl, invalidCoverImgValue: false })
                const token = localStorage.getItem('token')
                await fetch(`https://ancient-hollows-53837.herokuapp.com/auth/updatecoverimg/${this.state._id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },
                    body: JSON.stringify({
                        coverImgUrl: coverImgUrl,
                    })
                })
                this.massage(true, "cover image was updated", "#29a744")
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchPostDel = async (id) => {
        try {
            const token = localStorage.getItem('token')
            await fetch(`https://ancient-hollows-53837.herokuapp.com/posts/del/${id}`, {
                method: "DELETE",
                headers: {
                    'auth-token': token
                }
            })
            this.fetchUserPost()
            this.postDelButtonClick()
            this.massage(true, "post was deleted", "#dc3545")
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.prof = window.setTimeout(() => {
            this.fetchUserData()
            this.fetchUserPost()
        }, 0);
    }
    componentWillUnmount() {
        window.clearTimeout(this.prof)
        window.clearTimeout(this.msg)
    }
    render() {
        return (
            <div className="d-flex flex-column" style={{ width: "100%" }}>
                {this.state.massage ? <div align="center" style={{ zIndex: 99, position: "fixed", margin: "auto", left: "calc(50% - 150px)", top: 70, width: 300, height: "auto", padding: 20, backgroundColor: this.state.massageColor, opacity: 0.899, borderRadius: 10 }}>
                    <i> <p style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{this.state.massageValue}</p></i>
                </div> : null}
                {this.state.updateDiv ?
                    <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", zIndex: 99, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="editInfoDiv position-relative" >
                            <button className="btn btn-danger " style={{ position: "absolute", right: 15, top: 15 }} onClick={() => this.setState({ updateDiv: !this.state.updateDiv })}>X</button>
                            <h2 className="p-3" align="center">edit post</h2>
                            <div className="editInfo form-group ">
                                <div>
                                    <span>content: </span><textarea rows="6" type="text" placeholder="content" className="form-control mb-2" value={this.state.text} onChange={(event) => { this.setState({ text: event.target.value }) }}></textarea>
                                    {!this.state.text.length && !isImageUrl(this.state.imgUrl) ? <p style={{ color: "red", fontSize: 9, position: "absolute", right: 40, top: 80 }}>required</p> : null}
                                </div>

                                <div>
                                    <span>image url: </span><input type="text" placeholder="image" className="form-control" value={this.state.imgUrl ? this.state.imgUrl : ""} onChange={(event) => { this.setState({ imgUrl: event.target.value }) }} />
                                    {!isImageUrl(this.state.imgUrl) && this.state.imgUrl ? <p style={{ color: "red", fontSize: 9, position: "absolute", right: 40, top: 246 }}>invalid image url</p> : null}
                                </div>
                                <hr style={{ border: "1px solid #6c757d", width: "100%" }} />
                                <button type="button" className="btn btn-primary btn-lg mb-3" onClick={() => { this.fetchPostUpdate() }} >update</button>
                                {this.state.invalidPostUpdate ? <p style={{ color: "red" }}>fill in all required fields</p> : null}
                            </div>
                        </div>
                    </div> : null}
                    
                {this.state.editInfo ?
                    <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", zIndex: 99, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="editInfoDiv position-relative" >
                            <button className="btn btn-danger " style={{ position: "absolute", right: 15, top: 15 }} onClick={() => this.setState({ editInfo: !this.state.editInfo })}>X</button>
                            <h2 className="p-3" align="center">edit user information</h2>
                            <div className="editInfo form-group ">
                                <div>
                                    <span>firstname: </span><input type="text" placeholder="firstname" className="form-control" value={this.state.firstname} onChange={(event) => { this.setState({ firstname: event.target.value }) }} />
                                    {!this.state.firstname.length ? <p style={{ color: "red", fontSize: 9, position: "absolute", right: 40, top: 80 }}>required</p> : null}
                                </div>
                                <div>
                                    <span>lastname: </span><input type="text" placeholder="lastname" className="form-control" value={this.state.lastname} onChange={(event) => { this.setState({ lastname: event.target.value }) }} />
                                    {!this.state.lastname.length ? <p style={{ color: "red", fontSize: 9, position: "absolute", right: 40, top: 128 }}>required</p> : null}
                                </div>
                                <div>
                                    <span>info:</span><textarea rows="5" type="text" placeholder="info" className="form-control" value={this.state.info} onChange={(event) => { this.setState({ info: event.target.value }) }}></textarea>
                                </div>
                                <hr style={{ border: "1px solid #6c757d", width: "100%" }} />
                                <button type="button" className="btn btn-primary btn-lg mb-3" onClick={() => this.fetchInfoUpdate()} >update</button>
                                {
                                    this.state.invalidUserInfo ? <p style={{ color: "red" }}>fill in all required fields</p> : null
                                }
                            </div>
                        </div>
                    </div> : null}
                <div style={{ width: "100%", margin: "auto" }}>
                    <Head />
                </div>
                <ProfileHead
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    coverImgUrl={this.state.coverImgUrl}
                    fetchCoverImgUpdate={this.fetchCoverImgUpdate}
                    avatar={this.state.avatar}
                    fetchAvatarUpdate={this.fetchAvatarUpdate}
                    invalidAvatarValue={this.state.invalidAvatarValue}
                    invalidCoverImgValue={this.state.invalidCoverImgValue}
                />
                <div className="app d-flex flex-row pt-4 justify-content-center">
                    <AboutaUser
                        username={this.state.username}
                        email={this.state.email}
                        date={this.state.date}
                        info={this.state.info}
                        editInfo={this.editInfo}
                        setDeleteAcc={this.props.setDeleteAcc}
                    />
                    <div className="d-flex flex-column">
                        <NewPost width={600} fetchUserPost={this.fetchUserPost} img={this.state.avatar} addButtonClick={this.addButtonClick} />
                        {
                            this.state.noPost ?
                                <div style={{ width: 600, height: "auto" }}>
                                    <h3 className="no_post">post not found</h3>
                                </div>
                                :
                                this.state.postData.map((i, index) => {
                                    if (!i.userId.avatar) {
                                        i.userId.avatar = "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"
                                    }
                                    if (index % 2 === 0) {
                                        return (
                                            <Post key={index}
                                                width={600}
                                                post={i}
                                                imgStyle={"skewy(1deg)"}
                                                del={true}
                                                fetchUserPost={this.fetchUserPost}
                                                editPage={(text, imgUrl, postId) => this.setState({
                                                    updateDiv: true,
                                                    text, imgUrl, postId
                                                })}
                                                fetchPostDel={this.fetchPostDel}
                                                fetchPostUpdate={this.fetchPostUpdate}
                                                id={this.state._id}
                                                addButton={this.state.addButton}
                                                addButtonClick={this.addButtonClick}
                                                postDelButton={this.state.postDelButton}
                                                postDelButtonClick={() => this.postDelButtonClick()}
                                            />
                                        )
                                    }
                                    else {
                                        return (
                                            <Post key={index}
                                                width={600}
                                                post={i}
                                                imgStyle={"skewy(-1deg)"}
                                                del={true}
                                                fetchUserPost={this.fetchUserPost}
                                                editPage={(text, imgUrl, postId) => this.setState({
                                                    updateDiv: true,
                                                    text, imgUrl, postId
                                                })}
                                                fetchPostDel={this.fetchPostDel}
                                                fetchPostUpdate={this.fetchPostUpdate}
                                                id={this.state._id}
                                                addButton={this.state.addButton}
                                                addButtonClick={() => this.addButtonClick()}
                                                postDelButton={this.state.postDelButton}
                                                postDelButtonClick={() => this.postDelButtonClick()}
                                            />
                                        )
                                    }
                                })
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile