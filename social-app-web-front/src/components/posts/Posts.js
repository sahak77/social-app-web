import React from "react"
import Head from "../head/Head"
import Post from "../post/post"

class Posts extends React.Component {
    state = {
        data: [],
        postData: [],
        id: "",
        a: true,
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

    componentDidMount() {
         this.q = window.setTimeout(() => {
            this.props.fetchData()
            this.fetchUserId()
        }, 0);
    }
    componentWillUnmount(){
        window.clearTimeout(this.q)
    }
    render() {
        return (
            <div className="d-flex flex-column" style={{ width: "100%" }}>
                <Head />
                <div className="d-flex flex-column">
                    <div className="app d-flex flex-row pt-3">
                        <div className="d-flex flex-column">
                            {!this.props.data.length ? <div className="text-center">
                                <br /><br /><br />
                                <div className="spinner-border text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div> : null}
                            {
                                [...this.props.data].reverse().map((i, index) => {
                                    if (i.userId.avatar === undefined) {
                                        i.userId.avatar = "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"
                                    }
                                    if (index % 2 === 0) {
                                        return (
                                            <Post 
                                                key={index}
                                                width={900}
                                                post={i}
                                                imgStyle={"skewy(-1.5deg)"}
                                                del={false}
                                                fetchUserPost={this.props.fetchData}
                                                id={this.state.id}
                                            />
                                        )
                                    }
                                    else {
                                        return (
                                            <Post
                                                key={index}
                                                width={900}
                                                post={i}
                                                imgStyle={"skewy(1.5deg)"}
                                                del={false}
                                                fetchUserPost={this.props.fetchData}
                                                id={this.state.id}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts


