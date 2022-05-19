import {useState, useEffect} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function TambahPasien() {
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jenis_kelamin, setJenisKelamin] = useState('');
    const [tanggal_lahir, setTanggal_lahir] = useState('');
    const [Golongan_darah, setGolonganDarah] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/adduser', {
            nama,
            alamat,
            jenis_kelamin,
            tanggal_lahir,
            Golongan_darah
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            Navigate('/pasien');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div ClassName="Container">
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <Form.Control placeholder="" type="textl" class="form-control" id="exampleInputEmail1" value={nama} onChange={(e) => setNama(e.target.value)} aria-describedby="emailHelp"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <Form.Control placeholder="" type="text" class="form-control" id="exampleInputEmail1" value={alamat} onChange={(e) => setAlamat(e.target.value)} aria-describedby="emailHelp"/>
                </div>
                <div class="form-group">
                  <Form.Select class="form-control" value={jenis_kelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Pria" >Pria</option>
                  </Form.Select>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <Form.Select class="form-control" value={Golongan_darah} onChange={(e) => setGolonganDarah(e.target.value)}>
                        <option value="">Pilih Golongan Darah</option>
                        <option value="A" >A</option>
                    </Form.Select>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <Form.Control placeholder="" type="date" class="form-control" id="exampleInputEmail1" value={tanggal_lahir} onChange={(e) => setTanggal_lahir(e.target.value)} aria-describedby="emailHelp"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )


}
export default TambahPasien;