import React from 'react';
import Login from "./login.component";
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegisterBuyer from "./RegisterBuyer";
import RegisterSeller from "./RegisterSeller";
import AdminLayout from "./layouts/Admin/Admin";
import LI from "./layouts/Admin/LI";
import Seller from "./layouts/Admin/Seller";
import "./assets/css/black-dashboard-react.css";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Test from './Test';

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/RegisterBuyer" component={RegisterBuyer} />
          <Route path="/RegisterSeller" component={RegisterSeller} />
          <Route path="/test" component={Test} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/LI" render={(props) => <LI {...props} />} />
          <Route path="/Seller" render={(props) => <Seller {...props} />} />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById('root')
);
