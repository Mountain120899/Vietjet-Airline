import {Switch, Route, NavLink} from "react-router-dom";
import '../CSS-Layout/Center.css';
import { useState, useEffect } from "react";

export default function CenterComp(){
    return(
        <div className="center-wrapper">
            <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/myFlight" exact component={MyFlight}/>
                <Route path="/checkIn"  component={CheckIn}/>
                <Route path="/flightServices"  component={FlightServices}/>
                <Route path="/buyTicket/:id"    component={BuyTicket} />
            </Switch>
        </div>
    )
}

export function Home(){

    var [ChuyenBay, setChuyenBay] = useState([]);
    var [SanBayDi, setSanBayDi] = useState([]);
    var [SanBayDen, setSanBayDen] = useState([]);

    async function getChuyenBay(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached// include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    async function getSanBay() {
        try{
            const response = await fetch("http://localhost:8000/SanBay/1");
            const json = await response.json();
            setSanBayDi(json);
          }
          catch{
            console.log("Lỗi URL");
        }
        try{
            const response = await fetch("http://localhost:8000/SanBay/2");
            const json = await response.json();
            setSanBayDen(json);
          }
          catch{
            console.log("Lỗi URL");
        }  
    }

    useEffect(() => {
        getSanBay();
    }, []);

    const TimChuyenBay = () =>{
        var SBDi = document.getElementById("SanBayDi").value;
        var SBDen = document.getElementById("SanBayDen").value;
        var GB = document.getElementById("NgayDi").value; 
        var input = {
            SanBayDi: SBDi,
            SanBayDen: SBDen,
            GioBay: GB
        };
         getChuyenBay('http://localhost:8000/ChuyenBay',input )
        .then(data =>{
            setChuyenBay(data);
        }); 
    }

    return(
        <div className = "home">
            <form>
                <label>Chọn sân bay đi</label>
                <select id="SanBayDi" name="SanBayDi">
                    {
                        SanBayDi.map((item, index) => {
                            return (
                                <option value={item.SanBayDi} key={index}>{item.SanBayDi}</option>
                            )
                        })
                    }
                </select>
                <span className="NgayDi">
                    <label >Ngày đi</label>
                    <input id="NgayDi" type="date" name="NgayDi" data-date-format="MM DD YYYY"/>
                </span>
                <span className="SanBayDen">
                    <label>Chọn sân bay đến</label>
                    <select id="SanBayDen" name="SanBayDen">
                    {
                        SanBayDen.map((item, index) => {
                            return (
                                <option value={item.SanBayDen} key={index}>{item.SanBayDen}</option>
                            )
                        })
                    }
                    </select>
                </span>
                <input type="button" value="Tìm chuyến" onClick={() => TimChuyenBay()}/>
            </form>

            <table className="KetQua">
                <thead>
                    <tr>
                        <th style={{width:'170px'}}>Số hiệu chuyến bay</th>
                        <th style={{width:'200px'}}>Sân bay đi</th>
                        <th style={{width:'200px'}}>Sân bay đến</th>
                        <th style={{width:'200px'}}>Giờ bay</th>
                        <th style={{width:'200px'}}>Giờ hạ cánh</th>
                        <th style={{width:'100px'}}>Máy bay</th>
                        <th style={{width:'100px'}}>Số chỗ còn lại</th>
                        <th style={{width:'100px'}}>Giá vé</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ChuyenBay.map((item) => {
                            return (
                                    <tr key={item.id}>
                                        <td style={{textAlign: 'center'}}>{item.SoHieuChuyenBay}</td>
                                        <td style={{textAlign: 'center'}}>{item.SanBayDi}</td>
                                        <td style={{textAlign: 'center'}}>{item.SanBayDen}</td>
                                        <td>{item.GioBay}</td>
                                        <td>{item.GioHaCanh}</td>
                                        <td>{item.MayBay}</td>
                                        <td>{item.SoGheConLai}</td>
                                        <td>{item.GiaVe}</td>
                                        <td>
                                        <NavLink to={`/buyTicket/${item.id}`}>
                                            <input type="button" value="Mua vé"/>
                                        </NavLink>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export function BuyTicket({match}){
    var [SoHanhKhach, setSoHanhKhach] = useState([]);
    var [ChuyenBay, setChuyenBay] = useState({});
    var [GiaVe, setGiaVe] = useState(0);

    async function getChuyenBay() {
        // Default options are marked with *
        try{
            const response = await fetch(`http://localhost:8000/ChuyenBay/${match.params.id}`);
            const json = await response.json();
            setChuyenBay(json);
          }
          catch{
            console.log("Lỗi URL");
        }
    }

    useEffect(() => {
        getChuyenBay();
    }, [SoHanhKhach]);


    const NhapThongTin = () => {
        var NumberHanhKhach = document.getElementById("SoHanhKhach").value;
        var tempArray = [];
        for (let i = 1; i <= NumberHanhKhach; i++) {
            tempArray.push(i);
        }
        setSoHanhKhach(tempArray);
        setGiaVe(NumberHanhKhach * ChuyenBay[0].GiaVe + NumberHanhKhach * 100000);
    }

    async function createDatCho(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
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

    async function updateChuyenBay(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
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

    const XacNhanMuaVe = () => {
        if (SoHanhKhach.length === 0) {
            window.alert("Bạn chưa nhập thông tin hành khách!!!")
            return;
        }

        var ThongTinKhachHang = {
                                    MaDatCho: "",
                                    MaChuyenBay: match.params.id,
                                    LamThuTucNhanh: 1,
                                };

        var hoten = document.getElementsByClassName('hoten');
        var ngaysinh = document.getElementsByClassName('ngaysinh');
        var quoctich = document.getElementsByClassName('quoctich');
        var diachi = document.getElementsByClassName('diachi');
        var gioitinh = document.getElementsByName('gender');
        var xuatan = document.getElementsByName('XuatAn');
        var hanhly = document.getElementsByClassName('HanhLy');

        var arrayGioiTinh = [];
        var arrayXuatAn = [];

        for (let j = 0 ; j < SoHanhKhach.length * 2; j++) {
            if (gioitinh[j].checked) {
                arrayGioiTinh.push(gioitinh[j].value);
            }
        }
        for (let j = 0 ; j < SoHanhKhach.length * 2; j++) {
            if (xuatan[j].checked) {
                arrayXuatAn.push(xuatan[j].value);
            }
        } 

        for (let i = 0; i < SoHanhKhach.length; i++) {
            let kh = {
                HoTen: hoten[i].value,
                NgaySinh: ngaysinh[i].value,
                DiaChi: diachi[i].value,
                QuocTich: quoctich[i].value,
                GioiTinh: arrayGioiTinh[i],
                XuatAn: arrayXuatAn[i],
                HanhLy: hanhly[i].value
            }                 

            let temp = "Kh" + (i + 1);
            ThongTinKhachHang[temp] = {...kh};
        }
        var randomNumber = Math.floor(Math.random() * (100) ) + 1;
        var khHo = hoten[0].value;
        var khNgaySinh = ngaysinh[0].value;
        var madatcho = match.params.id + khHo.slice(0,2) + khNgaySinh.slice(6) + "VJ" + randomNumber;
        ThongTinKhachHang.MaDatCho = madatcho;

        createDatCho('http://localhost:7000/DatCho', ThongTinKhachHang)
        .then(data => {
            console.log(data);
        });
        var notice = "Mã đặt chỗ của bạn là";
        window.alert(notice.concat("  ", madatcho));
        
        var SoGhe = parseInt(ChuyenBay[0].SoGheConLai) - parseInt(document.getElementById("SoHanhKhach").value);

        var SoGheConLai = {SoGheConLai: SoGhe};
        
        updateChuyenBay(`http://localhost:8000/ChuyenBay/${match.params.id}`, SoGheConLai)
        .then(data => {
            console.log(data);
        });
    }

    const ToggleTienVe = () => {
        var NumberHanhKhach = document.getElementById("SoHanhKhach").value;
        var LamThuTucNhanh = document.getElementsByClassName('LamThuTucNhanh');
        var tien = NumberHanhKhach * 100000;
        if (LamThuTucNhanh[1].value === "Co") {
            GiaVe += tien;
            setGiaVe(GiaVe);
        }
        else{
            GiaVe -= tien;
            setGiaVe(GiaVe);
        }
    }

    return(
        <div className="buyTicket">
            <span className="SoHanhKhach">
                <label>Số hành khách</label>
                <input style={{width:"35px"}} type="number" id="SoHanhKhach" min="0" placeholder="0"/>
                <button style={{marginLeft:"10px"}} onClick={() => NhapThongTin()}>Nhập thông tin chi tiết</button>
                <label className="LamThuTucNhanh">Làm thủ tục nhanh</label>
                <select className="LamThuTucNhanh" name="LamThuTucNhanh" style={{marginLeft:"190px", marginTop:"-20px"}} onChange={() => ToggleTienVe()}>
                    <option value="Co">Có</option>
                    <option value="Khong">Không</option>
                </select>
                <h3>Tổng tiền vé: {GiaVe} VND</h3>
            </span>
            {
                SoHanhKhach.map((item, key) => {
                    return (
                        <form className="Information" key= {key} name = {"form" + item}>
                            <h3>Hành khách {item}</h3>
                            <span>
                                <input style={{marginRight:"50px",width:"300px"}} class="hoten" type="text" placeholder="Họ và tên"/> 
                                <span>
                                    <label style={{marginRight:"10px"}}>Ngày sinh</label>
                                    <input class="ngaysinh" type="date" placeholder="Ngày sinh"/> 
                                </span>
                                <input style={{marginLeft:"50px", width:"150px"}} class="quoctich" type="text" placeholder="Quốc tịch"/>
                                <input style={{marginLeft:"50px", width:"350px"}} class="diachi" type="text" placeholder="Địa chỉ"/>
                                <br></br>
                                <span className="GioiTinh">
                                    <label>Giới tính</label>
                                    <input type="radio" name="gender" value="Nam"/>
                                    <label >Nam</label><br></br>
                                    <input style={{marginLeft:"65px"}} type="radio" name="gender" value="Nu"/>
                                    <label >Nữ</label> <br></br>
                                </span>
                                <br></br>
                                <span className="XuatAn">
                                    <label>Xuất ăn</label>
                                    <input type="radio" name="XuatAn" value="Co"/>
                                    <label >Có</label><br></br>
                                    <input style={{marginLeft:"59px"}} type="radio" name="XuatAn" value="Khong"/>
                                    <label >Không</label> <br></br>
                                </span>
                                <br></br>
                                <label style={{marginRight:"5px"}}>Hành lý</label>
                                <select class="HanhLy" name="HanhLy">
                                    <option value="7kg">7kg</option>
                                    <option value="15kg">15kg</option>
                                    <option value="30kg">30kg</option>
                                </select>
                            </span>
                        </form>
                    )
                })
            }
            <button id="XacNhanMuaVe" onClick={() => XacNhanMuaVe()}>Xác nhận mua vé</button>           
        </div>
    )
}

export function MyFlight(){

}

export function CheckIn(){

}

export function FlightServices(){

}









