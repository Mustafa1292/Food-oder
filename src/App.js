import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage/homepage";
import Reservations from "./pages/Reservation/reservations";
import User from "./pages/user";
import Register from "./pages/register";
import { Login } from "./pages/login";
import styled from "styled-components";
import "./pages/HomePage/home.css";

const Menu = styled.ul`
  //The different options on the navbar
  display: flex;
  list-style: none; //removes the bullet points
`;

// const MenuItem = styled.li`
// indivdual list items
/* margin-right: 30px;
  font-weight: bold;
  /* font-size: 20px; */
/* color: gray; */
// `;

// const NavContainer = styled.div`
//   margin-left: 50px;
//   margin-top: 35px;
//   position: absolute;
//   z-index: 2;
// `;
export default function App() {
  return (
    <>
      <Router>
        <div>
          <div className={"Navcontainer"}>
            <Menu>
              <div className={"MenuItem"}>
                <Link to="/" className={"links"}>
                  HomePage
                </Link>
              </div>{" "}
              <div className={"MenuItem"}>
                <Link to="/reservations" className={"links"}>
                  Reservations
                </Link>
              </div>
              <div className={"MenuItem"}>
                <Link to="/user" className={"links"}>
                  User
                </Link>
              </div>
              <div className={"MenuItem"}>
                <Link to="/register" className={"links"}>
                  Register
                </Link>
              </div>
              <div className={"MenuItem"}>
                <Link to="/login" className={"links"}>
                  Login
                </Link>
              </div>
            </Menu>
          </div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/reservations" component={Reservations} />
            <Route exact path="/user" component={User} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
