import React from 'react';
import { NavLink } from 'react-router-dom';
import Head from '../head/Head';

const Home = (props) => {
    return (
        <>
            <Head />
            <div className="form-div">
                <br /><br /><br />
                <h1 className="d-flex justify-content-center mt-5" align="center"><span className="text-light">HELLO</span>&nbsp;&nbsp;<span className="text-success">  WORLD !!!</span></h1>
                {
                    props.deleteAcc ? <>
                        {setTimeout(() => {
                            props.setDeleteAcc(false)
                        }, 2000)
                        }
                        <div className="accDelete_alert" ><p className="text-light m-0">your account was successfully deleted</p></div>
                    </>
                    : null
                }
                <br /><br />
                <p className="p-4 text-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cur igitur, inquam, res tam dissimiles eodem nomine appellas? Duo Reges: constructio interrete. Non autem hoc: igitur ne illud quidem. Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Haec dicuntur fortasse ieiunius; Piso, familiaris noster, et alia multa et hoc loco Stoicos irridebat: Quid enim? Cenasti in vita numquam bene, cum omnia in ista Consumis squilla atque acupensere cum decimano. Nemo nostrum istius generis asotos iucunde putat vivere. Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Id enim volumus, id contendimus, ut officii fructus sit ipsum officium. </p>
                <div className="d-flex justify-content-center">
                    <NavLink to="/signin" className="btn btn-success btn-lg mr-4">sign in</NavLink>
                    <NavLink to="/signup" className="btn btn-success btn-lg">sign up</NavLink>
                </div>
            </div>
        </>
    )
}

export default Home;