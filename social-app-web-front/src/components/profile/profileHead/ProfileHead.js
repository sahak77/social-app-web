import React, { useState } from 'react'
import "./ProfileHead.css"

const ProfileHead = (props) => {
    const [avatar, setAvatar] = useState(false)
    const [coverImg, setCoverImg] = useState(false)
    const [avatarValue, setAvatarValue] = useState("")
    const [coverImgValue, setCoverImgValue] = useState("")

    return (
        <div className="d-flex flex-column justify-content-center w-100">
            <div className="coverImgCont" style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                    <img alt="" src={props.coverImgUrl ? props.coverImgUrl : null} className="coverImg" />
                    <div className="coverImgArea">
                        <div>
                            <img className="addCoverImg" alt="" src={require("../../../icons/photo.png")} onClick={() => setCoverImg(!coverImg)} />
                        </div>
                        {coverImg ? <div className="d-flex flex-column">
                            <div className="form-group d-flex m-auto">
                                <input type="text" className="form-control" placeholder="cover image url" value={coverImgValue} onChange={(event) => { setCoverImgValue(event.target.value) }} />
                                <button type="button" className="btn btn-primary" onClick={() => props.fetchCoverImgUpdate(coverImgValue, setCoverImg)}>Save</button>
                            </div>
                            <div>
                                {props.invalidCoverImgValue ? <p className="invalidImg">invalid image url</p> : null}

                            </div>
                        </div> : null}
                    </div>
                </div>
                <div className="d-flex flex-column" style={{ position: "relative" }}>
                    <img alt="" src={props.avatar} className="avatar" />
                    <div className="add_avatar" onClick={() => setAvatar(!avatar)} >
                        <img alt="" className="avatar_img" src={require("../../../icons/add.png")} />
                    </div>
                </div>
                <div className="fullname">
                    <h3 align="center" className="text-light" >{props.firstname} {props.lastname}</h3>
                </div>
            </div>
            {avatar ?
                <div className="form-group addAvatar">
                    <div className="d-flex mt-3" style={{ width: 400 }}>
                        <input type="text" className="form-control" placeholder="cover miage url" value={avatarValue} onChange={(event) => { setAvatarValue(event.target.value) }} />
                        <button className="btn btn-primary ml-2" type="button" onClick={() => props.fetchAvatarUpdate(avatarValue, setAvatar)}>Save</button>
                        <button className="btn btn-danger ml-2" type="button" onClick={() => setAvatar(false)}>X</button>
                    </div>
                    <div className="d-flex" style={{ width: 400 }}>
                        {props.invalidAvatarValue ? <p className="invalidImg">invalid image url</p> : null}
                    </div>
                </div> : null}
        </div>
    )
}

export default ProfileHead
