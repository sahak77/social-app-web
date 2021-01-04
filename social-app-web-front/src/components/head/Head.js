import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import "./head.css"

const Head = () => {
    const [data, setData] = useState([])
    const [arrayholder, sethol] = useState([]);
    const [val, changeval] = useState("")
    const [sty, setSty] = useState("sty_false")

    const fetchData = async () => {
        try {
            const fetchedData = await fetch('https://ancient-hollows-53837.herokuapp.com/auth')
            const data = await fetchedData.json()
            setData(data)
            sethol(data)
        } catch (error) {
            console.log("error");
        }
    }
    const searchFilterFunction = (value) => {
        if (value === "") {
            setSty("sty_false")
        }
        else if (value) {
            setSty("sty_true")
        }
        changeval(value);
        const newData = arrayholder.filter(item => {
            const itemData = `${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()} ${item.email.toUpperCase()}`;
            const textData = value.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setData(newData);
    }
    useEffect(
        () => {
            let a = setTimeout(() => {
                fetchData()
            }, 0); return () => {                                                              
                clearTimeout(a);
            };
        }, []
    )


    return (
        <>
            {localStorage.token ?
                <div className="head1">
                    <nav className="menu d-flex flex-row text-light mt-2">
                        <a style={{ textDecoration: "none", color: "white" }} href="/newsfeed"> <div className="ml-4 p-2 anim_line"><h3>NewsFeed</h3></div></a>
                        <span className="line ml-4 mt-2">&nbsp;</span>
                        <NavLink style={{ textDecoration: "none", color: "white" }} to="/profile"> <div className="ml-4 p-2 anim_line" > <h3>Profile</h3></div></NavLink>
                        <span className="line ml-4 mt-2">&nbsp;</span>
                        <div className='search ml-4'>
                            <div className={sty} >
                                {data.map((i, index) => {
                                    return (
                                        <a style={{ textDecoration: "none", display: "flex", flexDirection: "row" }} href={`/guest/${i._id}`} key={index}>
                                            <div className="d-flex flex-row m-0 p-2 d-flex align-items-center">
                                                {i.avatar ? <img alt="" src={i.avatar} style={{ width: 40, height: 40, borderRadius: "50%" }} /> : <img alt="" src="https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png" style={{ width: 40, height: 40 }} />}
                                            </div>
                                            <div className="mt-2">
                                                <p className="m-0 "> {i.firstname} {i.lastname}</p>
                                                <p className="m-0" style={{ fontSize: 9, textDecoration: "none", color: "black" }}> {i.email}</p>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                            <input type="text" placeholder="Search Users..." value={val} onChange={(event) => searchFilterFunction(event.target.value)} />
                            <span>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                </svg>
                            </span>
                        </div>
                        <div className="ml-3">
                            <a href="/signin" onClick={() => window.localStorage.removeItem('token')} style={{ textDecoration: "none", color: "white" }}>
                                <div className="ml-4 p-2 d-flex flex-row anim_line" >
                                    <img alt="" src={require("../../icons/exit.png")} className="mr-3 mt-1" width="32px" height="32px" />
                                    <h3>Log Out</h3>
                                </div>
                            </a>
                        </div>

                    </nav>
                </div>
                :
                <div className="head2">
                    <nav className="menu d-flex flex-row text-light mt-2">
                        <NavLink style={{ textDecoration: "none", color: "white" }} to="/"> <div className="ml-4 p-2 anim_line"><h3>Home</h3></div></NavLink>
                    </nav>
                </div>
            }
        </>
    );
}

export default Head;