import {Switch, Route} from "react-router-dom";
import '../CSS-Layout/Center.css';
import { useState } from "react";

export default function CenterComp(){
    return(
        <div className="center-wrapper">
            <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/myFlight" exact component={MyFlight}/>
                <Route path="/checkIn"  component={CheckIn}/>
                <Route path="/flightServices"  component={FlightServices}/>
            </Switch>
        </div>
    )
}

export function Home(){

    var [ChuyenBay, setChuyenBay] = useState([]);

    async function getChuyenBay(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached// include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

    var input = {
        SanBayDi: "Sân bay Tân Sơn Nhất",
        SanBayDen: "Sân bay Nội Bài",
        GioBay: "2021/06/16"
    }

    const TimChuyenBay = () =>{
        getChuyenBay('http://localhost:8000/ChuyenBay',input )
        .then(data =>{
            setChuyenBay(data);
        })
    }

    return(
        <div className = "home">
            <form>
                <label for="SanBayDi">Chọn sân bay đi:</label>
                <select id="SanBayDi" name="SanBayDi">
                    <option value="Sân bay Tân Sân Nhất">Sân bay Tân Sân Nhất</option>
                    <option value="Sân bay Nội Bài">Sân bay Nội Bài</option>
                </select>
                <span className="NgayDi">
                    <label for="NgayDi">Ngày đi</label>
                    <input id="NgayDi" type="date" name="NgayDi" data-date-format="MM DD YYYY"/>
                </span>
                <span className="SanBayDen">
                    <label for="SanBayDen">Chọn sân bay đếm:</label>
                    <select id="SanBayDen" name="SanBayDen">
                        <option value="Sân bay Tân Sân Nhất">Sân bay Tân Sân Nhất</option>
                        <option value="Sân bay Nội Bài">Sân bay Nội Bài</option>
                    </select>
                </span>
                <input type="button" value="Tìm chuyến" onClick={() => TimChuyenBay()}/>
            </form>

            <table>
                <tr>
                    <th>Số hiệu chuyến bay</th>
                    <th>Sân bay đi</th>
                    <th>Sân bay đến</th>
                    <th>Giờ bay</th>
                    <th>Giờ hạ cánh</th>
                    <th>Máy bay</th>
                    <th>Giá vé</th>
                </tr>
                {
                    ChuyenBay.map((item) => {
                        return (
                                <tr key={item.id}>
                                    <td>{item.SoHieuChuyenBay}</td>
                                    <td>{item.SanBayDi}</td>
                                    <td>{item.SanBayDen}</td>
                                    <td>{item.GioBay}</td>
                                    <td>{item.GioHaCanh}</td>
                                    <td>{item.MayBay}</td>
                                    <td>{item.GiaVe}</td>
                                </tr>
                            )
                        }
                    )
                }
            </table>
        </div>
    )
}

export function MyFlight(){

}

export function CheckIn(){

}

export function FlightServices(){

}










