import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Pasien from './module/pasien/pasien'
import TambahPasien from './module/pasien/TambahPasien'
import EditPasien from './module/pasien/editPasien'
import Login from './module/Auth/login'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/pasien" element={<Pasien/>} />
        <Route path="/tambah" element={<TambahPasien/>} />
        <Route path="/edit/:Id" element={<EditPasien/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
