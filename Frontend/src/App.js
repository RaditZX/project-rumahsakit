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
import pasien from "./pages/pasien";
import penyakit from "./pages/penyakit";
import kamar from "./pages/kamar";
import biaya from "./pages/biaya";
import profile from "./pages/profile";
import t_pasien from "./pages/post/t_pasien";
import t_penyakit from "./pages/post/t_penyakit";
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
        <Route exact path="/pasien" component={pasien} />
        <Route exact path="/penyakit" component={penyakit} />
        <Route exact path="/kamar" component={kamar} />
        <Route exact path="/biaya" component={biaya} />
        <Route exact path="/profile" component={profile} />
        <Route exact path="/t_pasien" component={t_pasien} />
        <Route exact path="/t_penyakit" component={t_penyakit} />
        <Route exact path="/t_kamar" component={t_kamar} />
        <Route exact path="/t_biaya" component={t_biaya} />
      </Switch>
    </div>
  );
}

export default App;
