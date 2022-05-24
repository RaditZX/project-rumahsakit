import React from "react";

//import react-router-dom
import { Switch, Route } from "react-router-dom";

//import login
import login from "./pages/login";

//import reset
import reset from "./pages/reset";

//import register
import register from "./pages/register";

//import pages
import home from "./pages/home";
import Pasien from "./pages/pasien";
import Penyakit from "./pages/penyakit";
import Kamar from "./pages/kamar";
import Biaya from "./pages/biaya";
import profile from "./pages/profile";
import T_pasien from "./pages/post/t_pasien";
import T_penyakit from "./pages/post/t_penyakit";
import t_kamar from "./pages/post/t_kamar";
import t_biaya from "./pages/post/t_biaya";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={login} />
        <Route exact path="/reset" component={reset} />
        <Route exact path="/register" component={register} />
        <Route exact path="/home" component={home} />
        <Route exact path="/pasien" component={Pasien} />
        <Route exact path="/penyakit" component={Penyakit} />
        <Route exact path="/kamar" component={Kamar} />
        <Route exact path="/biaya" component={Biaya} />
        <Route exact path="/profile" component={profile} />
        <Route exact path="/t_pasien" component={T_pasien} />
        <Route exact path="/t_penyakit" component={T_penyakit} />
        <Route exact path="/t_kamar" component={t_kamar} />
        <Route exact path="/t_biaya" component={t_biaya} />
      </Switch>
    </div>
  );
}

export default App;
