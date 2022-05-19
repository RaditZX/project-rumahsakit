import { useState,useEffect} from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';



function Pasien(){
    const [data,setData] = useState([]);
    


    useEffect(()=>{
        axios.get('http://localhost:3000/pasien')
        .then(res=>{
            setData(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const deleteById = (id) => {
        axios.delete(`http://localhost:3000/pasien/${id}`)
        .then(res=>{
            console.log(res);
            console.log(res.data);
            window.location.reload();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nama</th>
      <th scope="col">alamat</th>
      <th scope="col">tanggal_lahir</th>
      <th scope="col">golonganDarah</th>
      <th scope="col">jenisKelamin</th>
      <th scope="col">No_Telp</th>
    </tr>
  </thead>
  <tbody>
    {data.map((pasien,index)=>{
        return(
            <tr key={pasien._id}>
                <th scope="row">{index+1}</th>
                <td>{pasien.nama}</td>
                <td>{pasien.alamat}</td>
                <td>{pasien.tanggal_lahir}</td>
                <td>{pasien.Golongan_darah}</td>
                <td>{pasien.jenis_kelamin}</td>
                <td>{pasien.no_telp}</td>
                <td><Link to={`/edit/${pasien._id}`} className="btn btn-outline-warning"><MdIcons.MdEdit /></Link>
              <button type="submit" onClick={() => deleteById(pasien._id)} className="btn btn-outline-danger"><MdIcons.MdDelete /></button></td>
            </tr>
        )
    })}
  </tbody>
</table>
    )
}
export default Pasien;