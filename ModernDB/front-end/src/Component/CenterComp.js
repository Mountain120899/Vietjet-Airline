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
                <Route path="/bookcar"  component={BookCar}/>
                <Route path="/searchInformation"  component={SearchInformation}/>
                <Route path="/buyInsurance"  component={BuyInsurance}/>
                <Route path="/buyTicket/:id"    component={BuyTicket} />
                <Route path="/buyLuggage"    component={BuyLuggage} />
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
                                    LamThuTucNhanh: "Co",
                                    TienVe:0,
                                };

        var hoten = document.getElementsByClassName('hoten');
        var ngaysinh = document.getElementsByClassName('ngaysinh');
        var quoctich = document.getElementsByClassName('quoctich');
        var diachi = document.getElementsByClassName('diachi');
        var gioitinh = document.getElementsByName('gender');
        var xuatan = document.getElementsByName('XuatAn');
        var hanhly = document.getElementsByClassName('HanhLy');
        var lamthutucnhanh = document.getElementsByClassName('LamThuTucNhanh');

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
        ThongTinKhachHang.TienVe = GiaVe;
        ThongTinKhachHang.LamThuTucNhanh = lamthutucnhanh[1].value;

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
                                    <input type="radio" name="gender" value="Nam" defaultChecked/>
                                    <label >Nam</label><br></br>
                                    <input style={{marginLeft:"65px"}} type="radio" name="gender" value="Nu"/>
                                    <label >Nữ</label> <br></br>
                                </span>
                                <br></br>
                                <span className="XuatAn">
                                    <label>Xuất ăn</label>
                                    <input type="radio" name="XuatAn" value="Co" defaultChecked/>
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
    var [ChuyenBay, setChuyenBay] = useState([]);
    var [VeMayBay, setVeMayBay] = useState([]);
    var [HanhKhach, setHanhKhach] = useState([]);

    async function getVeMayBay(MaDatCho) {
        try{
            const response = await fetch(`http://localhost:7000/DatCho/${MaDatCho}`);
            const json = await response.json();
            setVeMayBay(json);
          }
          catch{
            console.log("Lỗi URL");
        }
    }

    async function getChuyenBay(MaChuyenBay) {
        try{
            const response = await fetch(`http://localhost:8000/ChuyenBay/${MaChuyenBay}`);
            const json = await response.json();
            setChuyenBay(json);
          }
          catch{
            console.log("Lỗi URL");
        }
    }

    const TraCuu = (e) => {
        e.preventDefault();
        var MaDatCho = document.getElementById("MaDatCho").value;
        if (MaDatCho === '') {
            window.alert('Qúy khách chưa nhập mã đặt chỗ!')
            return;
        }
        getVeMayBay(MaDatCho);
    }
    
    useEffect(() => {
        if (VeMayBay.length === 1 ){
            getChuyenBay(VeMayBay[0].MaChuyenBay);
        }
        else
            return null; 
        var HanhKhach = [];
        for (let i in VeMayBay[0]) {
            HanhKhach.push(VeMayBay[0][i]);
        }
        HanhKhach = HanhKhach.slice(5);
        setHanhKhach(HanhKhach);
    },[VeMayBay]);

    return (
        <div className = "MyFlight">
            <form style = {{marginTop:"10px"}}>
                <label style = {{marginRight:"5px"}}>Nhập mã đặt chỗ:</label>
                <input type="text" id = "MaDatCho"/>
                <button id = "TraCuu" onClick={(e) => TraCuu(e)}>Tra cứu</button>
            </form>
            <div className = "Flight">
                <h3>Thông tin chuyến bay của bạn</h3>
                <table>
                    <thead>
                        <tr>
                            <th style = {{width:"60px"}}>Số hiệu chuyến bay</th>
                            <th style = {{width:"60px"}}>Sân bay đi</th>
                            <th style = {{width:"60px"}}>Giờ bay</th>
                            <th style = {{width:"60px"}}>Sân bay đến</th>
                            <th style = {{width:"60px"}}>Giờ hạ cánh</th>
                            <th style = {{width:"50px"}}>Loại máy bay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ChuyenBay.map((item) =>
                            <tr key = {item.id}>
                                <td>{item.SoHieuChuyenBay}</td>
                                <td>{item.SanBayDi}</td>
                                <td>{item.GioBay}</td>
                                <td>{item.SanBayDen}</td>
                                <td>{item.GioHaCanh}</td>
                                <td>{item.MayBay}</td>
                            </tr> 
                            ) 
                        }
                    </tbody>
                </table>
            </div>
            <div className = "Ticket">
                <h3>Thông tin vé của bạn</h3>
                <table>
                    <thead>
                        <tr>
                            <th style = {{width:"30px"}}>Hành khách</th>
                            <th style = {{width:"60px"}}>Họ tên</th>
                            <th style = {{width:"30px"}}>Ngày sinh</th>
                            <th style = {{width:"60px"}}>Địa chỉ</th>
                            <th style = {{width:"60px"}}>Giới tính</th>
                            <th style = {{width:"50px"}}>Xuất ăn</th>
                            <th style = {{width:"50px"}}>Hành lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            HanhKhach.map((item, index) =>
                                <tr key = {index}>
                                    <td>Hành khách {index + 1}</td>
                                    <td>{item.HoTen}</td>
                                    <td>{item.NgaySinh}</td>
                                    <td>{item.DiaChi}</td>
                                    <td>{item.GioiTinh}</td>
                                    <td>{item.XuatAn}</td>
                                    <td>{item.HanhLy}</td>
                                </tr> 
                            )  
                        }
                    </tbody>
                </table>
            </div>
            <button style={{fontSize:"20px", margin:"20px"}}>Đổi vé</button>
            <NavLink to='/buyLuggage'>
                <button style={{fontSize:"20px", margin:"20px"}}>Mua thêm hành lý</button>
            </NavLink>
        </div>
    )
}

export function BuyLuggage(){
    var [HanhKhach, setHanhKhach] = useState([]);
    var [VeMayBay, setVeMayBay] = useState([]);

    async function getHanhKhach(MaDatCho) {
        try{
            const response = await fetch(`http://localhost:7000/DatCho/${MaDatCho}`);
            const json = await response.json();
            var HanhKhach = [];
            for (let i in json[0]) {
                HanhKhach.push(json[0][i]);
            }
            HanhKhach = HanhKhach.slice(5);

            setHanhKhach(HanhKhach);
          }
          catch{
            console.log("Lỗi URL");
        }
    }

    async function getVeMayBay(MaDatCho) {
        try{
            const response = await fetch(`http://localhost:7000/DatCho/${MaDatCho}`);
            const json = await response.json();
            setVeMayBay(json);
          }
          catch{
            console.log("Lỗi URL");
        }
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

    async function DeleteDatCho(url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
    }

    const TraCuu = (e) => {
        e.preventDefault();
        var MaDatCho = document.getElementById("MaDatCho").value;
        if (MaDatCho === '') {
            window.alert('Qúy khách chưa nhập mã đặt chỗ!')
            return;
        }
        getHanhKhach(MaDatCho);
        getVeMayBay(MaDatCho);
    }

    const ChangeMoney = (index) => {
        var HanhLy = document.getElementsByClassName("HanhLy");
        var kh = "Kh" + (index + 1);
        HanhLy = HanhLy[index].value;
        var HanhLyHienTai = parseInt(HanhKhach[index].HanhLy);
        var money = 50000 * (HanhLy - HanhLyHienTai);
        var temp =[...VeMayBay];
        temp[0].TienVe += money;
        temp[0][kh].HanhLy = HanhLy + 'kg';
        delete temp[0]._id;
        setVeMayBay(temp);
    }

    const MuaThemHanhLy = () => {
        DeleteDatCho(`http://localhost:7000/DatCho/${VeMayBay[0].MaDatCho}`)
        .then(data => {
            console.log(data);
        }); 

        createDatCho('http://localhost:7000/DatCho', VeMayBay[0])
        .then(data => {
            console.log(data);
        });
        window.alert("Qúy khách đã mua hành lý thành công!") 
    }

    return(
        <div className = "BuyLuggage">
            <form style = {{marginTop:"10px"}}>
                <label style = {{marginRight:"5px"}}>Nhập mã đặt chỗ:</label>
                <input type="text" id = "MaDatCho"/>
                <button id = "TraCuu" onClick = {(e) => TraCuu(e)}>Tra cứu</button>
            </form>
            {
                HanhKhach.map((item, index) => {
                    return (
                        <div key={index} style={{margin:"10px"}}>
                            <span style={{marginRight:"10px"}}>{item.HoTen}</span> 
                            <input className = "HanhLy" style={{width:"50px"}} type="number" placeholder={item.HanhLy} onChange={() => ChangeMoney(index)}/>
                        </div>
                    )
                })
            }
            <h3>Tiền vé {VeMayBay.length === 0 ? 0 : VeMayBay[0].TienVe}</h3>
            <button onClick={() => MuaThemHanhLy()} id = "MuaThemHanhLy">Xác nhận mua thêm hành lý</button>
        </div>
    )
}

export function CheckIn(){
    return (
        <div>
            Check in trực tuyến
        </div>
    )
}

export function FlightServices(){
    return (
        <div>
            <ul className = "FlightServices">
                <NavLink to="/bookcar">Đặt xe đưa đón</NavLink>
                <NavLink to="/searchInformation">Tra cứu thông tin</NavLink>
                <NavLink to="/buyInsurance">Mua bảo hiểm</NavLink>
            </ul>
            <img id = "promote" src={process.env.PUBLIC_URL + "./images/promote.jpg"} alt="Đây là logo"/>
        </div>
    )
}

export function SearchInformation(){
    return (
        <div>
            Tra cứu thông tin
        </div>
    )
}

export function BuyInsurance(){
    return (
        <div>
            Mua bảo hiểm
        </div>
    )
}

export function BookCar(){
    var [ChuyenXe, setChuyenXe] = useState([]);
    var [NoiDi, setNoiDi] = useState([]);
    var [NoiDen, setNoiDen] = useState([]);
    var [activeChuyenXe, setactiveChuyenXe] = useState({});
    var [GiaVe, setGiaVe] = useState();

    async function getChuyenXe(url = '', data = {}) {
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

    async function getDiaDiem() {
        try{
            const response = await fetch("http://localhost:8000/DiaDiem/1");
            const json = await response.json();
            setNoiDi(json);
          }
          catch{
            console.log("Lỗi URL");
        }
        try{
            const response = await fetch("http://localhost:8000/DiaDiem/2");
            const json = await response.json();
            setNoiDen(json);
          }
          catch{
            console.log("Lỗi URL");
        }  
    }

    async function createDatXe(url = '', data = {}) {
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

    useEffect(() => {
        getDiaDiem();
    }, []); 

    const TimXe = () =>{
        var NoiDi = document.getElementById("NoiDi").value;
        var NoiDen = document.getElementById("NoiDen").value;
        var ThoiGian = document.getElementById("ThoiGian").value; 
        var input = {
            NoiDi: NoiDi,
            NoiDen: NoiDen,
            ThoiGian: ThoiGian
        };
        getChuyenXe('http://localhost:8000/ChuyenXe',input )
        .then(data =>{
            setChuyenXe(data);
        }); 
    }

    const DatXe = (index) => {
        var rowArray = document.getElementsByClassName("row");
        for (let i = 0; i < index; i++) {
            rowArray[i].style.opacity = 0.3;
        }
        for (let i = index + 1; i < rowArray.length; i++) {
            rowArray[i].style.opacity = 0.3;
        }
        rowArray[index].style.opacity = 1;
        setactiveChuyenXe(ChuyenXe[index]);
        setGiaVe(ChuyenXe[index].Gia);
    }

    const XacNhanDatXe = () => {
        var HoTen = document.getElementById("HoTen").value;
        var SoDienThoai = document.getElementById("SoDienThoai").value;
        var SoLuong = document.getElementById("SoLuong").value;
        var id = activeChuyenXe.id;
        var Gia = activeChuyenXe.Gia;
        var MaDatXe = HoTen.slice(0,3) + id + SoDienThoai;
        if (HoTen === "" || SoDienThoai === "")
        {
            window.alert("Qúy khách chưa nhập đầy đủ thông tin");
            return;
        }
        var data = {
            id: id,
            TenHanhKhach: HoTen,
            MaDatXe: MaDatXe,
            SoDienThoai: SoDienThoai,
            SoLuong: SoLuong,
            Gia: Gia
        }
        createDatXe("http://localhost:8000/DatXe", data);
        window.alert("Mã đặt xe của bạn là: " + MaDatXe);
    }

    const ThayDoiTienVe = () => {
        var SoLuong = document.getElementById("SoLuong").value;
        var Gia = activeChuyenXe.Gia;
        var temp = Gia * SoLuong;
        setGiaVe(temp);
    }

    return(
        <div className = "bookcar">
            <form>
                <label>Chọn nơi đi</label>
                <select id="NoiDi" name="NoiDi">
                    {
                        NoiDi.map((item, index) => {
                            return (
                                <option value={item.NoiDi} key={index}>{item.NoiDi}</option>
                            )
                        })
                    }
                </select>
                <span className="NoiDen">
                    <label>Chọn nơi đến</label>
                    <select id="NoiDen" name="NoiDen">
                    {
                        NoiDen.map((item, index) => {
                            return (
                                <option value={item.NoiDen} key={index}>{item.NoiDen}</option>
                            )
                        }) 
                    } 
                    </select>
                </span>
                <span className="ThoiGian">
                    <label >Thời gian</label>
                    <input id="ThoiGian" type="date" name="ThoiGian" data-date-format="MM DD YYYY"/>
                </span>
                <input type="button" value="Tìm xe" onClick={() => TimXe()}/>
            </form>

            <form className="ThongTinDatXe">
                <input id = "HoTen" style = {{marginRight:"10px", fontSize:"15px"}} type="text" placeholder="Họ tên"/>
                <input id = "SoDienThoai" style = {{marginRight:"10px", fontSize:"15px"}} type="text" placeholder="Số điện thoại"/>
                <span style = {{marginRight:"10px", fontSize:"15px"}}>
                    <label>Số khách</label>
                    <input id = "SoLuong" style = {{width:"35px"}} type="number" min="1" placeholder="1" onChange={() => ThayDoiTienVe()}/>
                </span>
                <span>Số Tiền: {GiaVe === undefined ? 0 : GiaVe}</span>
                <input type="button" value="Đặt xe" onClick={() => XacNhanDatXe()}/>
            </form>

            <table className="KetQuaDatXe">
                <thead>
                    <tr style={{color: 'black', backgroundColor:'white'}}>
                        <th style={{width:'170px'}}>Nơi đi</th>
                        <th style={{width:'200px'}}>Nơi đến</th>
                        <th style={{width:'200px'}}>Thời gian</th>
                        <th style={{width:'200px'}}>Giá vé</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ChuyenXe.map((item, index) => {
                            return (
                                    <tr key={index} className = {"row"}>
                                        <td style={{textAlign: 'center'}}>{item.NoiDi}</td>
                                        <td style={{textAlign: 'center'}}>{item.NoiDen}</td>
                                        <td style={{textAlign: 'center'}}>{item.ThoiGian}</td>
                                        <td style={{textAlign: 'center'}}>{item.Gia}</td>
                                        <td>
                                            <input type="button" value="Chọn" onClick ={() => DatXe(index)}/>
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











