import React from "react";

// import Homelogo from "./Home_Plate1.png";
import HomeScreen from "./home_screen1.png";
import styled from "styled-components";

const Image = styled.img`
  position: absolute;
  height: 100vh;
  width: 1500px;
  position: absolute;
  @media only screen and (max-width: 675px) {
    height: 912px;
    width: 750px;
    position: absolute;
  }
`;

//could add right side of page (continue as guest and redirect to reservations, left side of page login or register)
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Image src={HomeScreen} alt="home plate" />
      </div>
    );
  }
}
export { HomePage };
