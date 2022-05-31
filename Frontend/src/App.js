import React from "react";

//import react-router-dom
import { Switch, Route } from "react-router-dom";

//import login
import Login from "./pages/login";

//import reset
import reset from "./pages/reset";

//import register
import Register from "./pages/register";

//import pages
import Home from "./pages/home";
import Pasien from "./pages/pasien";
import Penyakit from "./pages/penyakit";
import Kamar from "./pages/kamar";
import Biaya from "./pages/biaya";
import profile from "./pages/profile";
import Data from "./pages/data";
import T_pasien from "./pages/post/pasien/t_pasien";
import T_penyakit from "./pages/post/penyakit/t_penyakit";
import T_kamar from "./pages/post/kamar/t_kamar";
import T_biaya from "./pages/post/biaya/t_biaya";
import U_pasien from "./pages/post/pasien/updatePasien";
import U_penyakit from "./pages/post/penyakit/updatePenyakit";
import U_kamar from "./pages/post/kamar/updateKamar";
import U_biaya from "./pages/post/biaya/updateBiaya";
import U_profile from "./pages/UpdateProfile";
import U_data from "./pages/UpdateData";
import Rincian from "./pages/Rincian";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/reset" component={reset} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/pasien" component={Pasien} />
        <Route exact path="/penyakit" component={Penyakit} />
        <Route exact path="/kamar" component={Kamar} />
        <Route exact path="/biaya" component={Biaya} />
        <Route exact path="/profile" component={profile} />
        <Route exact path="/data" component={Data} />
        <Route exact path="/t_pasien" component={T_pasien} />
        <Route exact path="/t_penyakit" component={T_penyakit} />
        <Route exact path="/t_kamar" component={T_kamar} />
        <Route exact path="/t_biaya" component={T_biaya} />
        <Route exact path="/pasien/edit/:Id" component={U_pasien} />
        <Route exact path="/penyakit/edit/:Id" component={U_penyakit} />
        <Route exact path="/kamar/edit/:Id" component={U_kamar} />
        <Route exact path="/biaya/edit/:Id" component={U_biaya} />
        <Route exact path="/u_profile" component={U_profile} />
        <Route exact path="/u_data" component={U_data} />
        <Route exact path="/rincian" component={Rincian} />
      </Switch>
    </div>
  );
}

export default App;
