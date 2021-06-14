import {NavLink} from 'react-router-dom';
import '../CSS-Layout/Header.css';

export default function HeaderComp(props){
        return(
            <div className="header">
                <div className="header-wrapper">
                    <img src={process.env.PUBLIC_URL + "./images/vietjet-air.png"} alt="Đây là logo"/>
                    <ul className="menu">
                        <NavLink to = '/' activeStyle={{color: "red"}} exact={true}> 
                            <li>Trang chủ </li>
                        </NavLink>
                        <NavLink to = '/myFlight' activeStyle={{color: "red"}}>
                            <li>Chuyến bay của tôi</li>
                        </NavLink>
                        <NavLink to = '/checkIn' activeStyle={{color: "red"}}>
                            <li>Check - in</li>
                        </NavLink>
                        <NavLink to = '/flightServices' activeStyle={{color: "red"}}>
                            <li>Dịch vụ chuyến bay</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        )
}



