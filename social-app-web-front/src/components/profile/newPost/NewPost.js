import React, { useState } from "react"
import isImageUrl from "is-image-url";
import "./NewPost.css"

const NewPost = (props) => {
    const [text, setText] = useState("")
    const [textRequire, setTextRequire] = useState(false)
    let [imgUrl, setImgUrl] = useState("")
    const [imgUrlRequire, setImgUrlRequire] = useState(false)

    const fetchs = async () => {
        if (text === "" && imgUrl === "") {
            setTextRequire(true)
        }
        else {
            try {
                if (!isImageUrl(imgUrl) && imgUrl.length > 0) {
                    setImgUrlRequire(true)
                }
                else {
                    if (imgUrl === "") {
                        imgUrl = null
                    }
                    await fetch("https://ancient-hollows-53837.herokuapp.com/posts/add", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': localStorage.token
                        },
                        body: JSON.stringify({
                            text: text,
                            imgUrl: imgUrl
                        })
                    })
                    props.fetchUserPost()
                    props.addButtonClick()
                    setTextRequire(false)
                    setImgUrlRequire(false)
                    setImgUrl("")
                    setText("")
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <form className="addpost pb-2 form-group" style={{ width: props.width, zIndex: 66 }} >
            <div className="ml-3 p-2 title"><h3>Add New Posts</h3></div>
            <div className="d-flex flex-row bg-white mr-3 ml-3 newPostCont">
                <img alt="" src={props.img} className="addPostAvatar border rounded-circle" />
                <textarea
                    style={{ borderRadius: "10px" }}
                    placeholder="type something here :)"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                >
                </textarea >
                {textRequire ? <p className="required">required</p> : null}
            </div>
            <div className="row mt-3">
                <div className="col ml-3" >
                    <input type="text"
                        className="form-control imgUrl"
                        placeholder="Image Url"
                        value={imgUrl}
                        onChange={(event) => setImgUrl(event.target.value)}
                    />
                    {
                        imgUrlRequire ? <span style={{ color: "red" }}>invalid image url</span> : null
                    }
                </div>
            </div>
            <br />
            <button type="button" onClick={() => fetchs()} className="btn btn-primary btn-lg btn-block ml-3 mr-3" style={{ width: "94%" }}>ADD POST</button>
            <br />
        </form>
    )
}

export default NewPost
