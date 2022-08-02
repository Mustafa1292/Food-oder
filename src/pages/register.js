// import React from "react";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Avatar from "@mui/material/Avatar";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";

// class Register extends React.Component {
//   render() {
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Register
//           </Typography>
//           <Box component="form" noValidate sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="fname"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="lname"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     );
//   }
// }
// export { Register };

import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  height: 50px;
  width: 180px;
  color: whitesmoke;
  background-color: #1864ab;
  border-radius: 10px;
  font-size: 20px;
`;

const Label = styled.label`
  margin-left: 40%;
  margin-bottom: 60px;
  font-size: 35px;
  font-weight: bold;
  color: #1864ab;
`;

const TRshape = styled.div`
  width: 35%;
  height: 40%;
  position: absolute;
  top: 0;
  left: 65%;
  z-index: -1;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  background-color: #e3fafc;
`;

const TLshape = styled.div`
  clip-path: polygon(0 100%, 0 0, 100% 0);
  width: 35%;
  height: 40%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: #e3fafc;
`;

const BLshape = styled.div`
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
  width: 35%;
  height: 40%;
  position: absolute;
  top: 60%;
  left: 0;
  z-index: -1;
  background-color: #e3fafc;
`;

const BRshape = styled.div`
  clip-path: polygon(0 100%, 100% 100%, 100% 0);
  width: 35%;
  height: 40%;
  position: absolute;
  top: 60%;
  left: 65%;
  z-index: -1;
  background-color: #e3fafc;
`;

export function createUser(user) {
  console.log(user);
  return fetch("http://localhost:5000/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

const Register = () => {
  const [first, setEnteredFirstName] = useState("");
  const [last, setEnteredLastName] = useState("");
  const [email, setEnteredEmail] = useState("");
  const [password, setEnteredPassword] = useState("");
  const [validFields, setValidFields] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const [pwdLengthCheck, setPwdLengthCheck] = useState(true);

  const FirstNameInput = (event) => {
    setEnteredFirstName(event.target.value);
  };
  const LastNameInput = (event) => {
    setEnteredLastName(event.target.value);
  };
  const EmailInput = (event) => {
    setEnteredEmail(event.target.value);
  };
  const PasswordInput = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (first === "") {
      setPwdLengthCheck(false);
      return;
    }
    if (last === "") {
      setValidFields(false);
      return;
    }
    if (
      email === "" ||
      !email.includes("@") ||
      !email.includes(".com")
    ) {
      setValidFields(false);
      return;
    }
    if (password === "") {
      setPwdLengthCheck(false);
      return;
    }
    if (password < 5) {
      setValidFields(false);
      setPwdLengthCheck(false);
      return;
    }

    const collectedData = {
      First: first,
      Last: last,
      Email: email,
      Password: password,
    };
    console.log(collectedData);
    setPwdLengthCheck(true);
    setEmailCheck(true);
    setValidFields(true);
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const handleSubmit = (e) => {
    console.log("calling to send to api, create user");
    e.preventDefault();
    const NewUser = {
      first,
      last,
      email,
      password
    };
    console.log(NewUser);
    createUser(NewUser);
  };

  return (
    <>
      <TRshape />
      <TLshape />
      <BLshape />
      <BRshape />
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={submitHandler}>
        <div>
          <Label> First Name </Label> <br />
          <input
            className={"inputs"}
            type="text"
            onChange={FirstNameInput}
            value={first}
          />
        </div>
        <div>
          <Label> Last Name </Label> <br />
          <input
            className={"inputs"}
            type="text"
            min="0.01"
            step="0.01"
            onChange={LastNameInput}
            value={last}
          />
        </div>
        <div>
          <Label> Email Address </Label> <br />
          <input
            className={"inputs"}
            type="text"
            onChange={EmailInput}
            value={email}
          />
        </div>
        <div>
          <Label> Password </Label> <br />
          <input
            className={"inputs"}
            type="password"
            onChange={PasswordInput}
            value={password}
          />
        </div>
        {!validFields && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Please complete all inormation!{" "}
          </p>
        )}
        {!emailCheck && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Invalid Email{" "}
          </p>
        )}
        {!pwdLengthCheck && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Please make password 5 or more characters{" "}
          </p>
        )}
        <Button style={{ marginLeft: 600 }} type="submit" onClick={ (e) => handleSubmit(e)}>
          {" "}
          Submit{" "}
        </Button>
      </form>
    </>
  );
};

export default Register;
