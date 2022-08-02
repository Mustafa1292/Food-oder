// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Container from "@material-ui/core/Container";
// import Button from "@material-ui/core/Button";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// class User extends React.Component {
//     render() {
//       return (
//         <Container component="main" maxWidth="xs">
//         <React.Fragment>
//           <Typography variant="h6" gutterBottom>
//             Profile Management
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 variant="outlined"
//                 id="fullName"
//                 name="fullName"
//                 label="Full name"
//                 fullWidth
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 variant="outlined"
//                 id="mailing_address"
//                 name="mailing_address"
//                 label="Mailing Address"
//                 fullWidth
//                 autoComplete="shipping mailing_address"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 variant="outlined"
//                 id="billing_address"
//                 name="billing_address"
//                 label="Billing Address"
//                 fullWidth
//                 autoComplete="shipping billing_address"
//               />
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Billing Address is the same as Mailing Address" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 variant="outlined"
//                 id="pref_diner"
//                 name="pref_diner"
//                 label="Preferred Diner #"
//                 fullWidth
//                 autoComplete="shipping pref_diner"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl >
//                 <InputLabel id="demo-simple-select-required-label" >
//                   Payment Method
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-required-label"
//                   id="demo-simple-select-required"
//                   name="payment_method"
//                 >
//                   <MenuItem value="">
//                     <em>Select Preferred Payment Method</em>
//                   </MenuItem>
//                   <MenuItem value={"cash"}>Cash</MenuItem>
//                   <MenuItem value={"credit"}>Credit</MenuItem>
//                   <MenuItem value={"check"}>Check</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 id="earned_points"
//                 name="earned_points"
//                 label="Earned points"
//                 fullWidth
//                 disabled = "true"
//               />
//             </Grid>
//           </Grid>
//         </React.Fragment>
//         <React.Fragment>
//           <div>
//               <br></br>
//             <Button
//                 type="button"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 >
//                 Save
//             </Button>
//           </div>
//         </React.Fragment>
//       </Container>
//         );
//     }
// }
// export { User };

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

const Shape = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  clip-path: polygon(0% 0%, 45% 0%, 33% 100%, 0% 100%);
  background-color: #e3fafc;
`;

const User = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredBill, setEnteredBill] = useState("");
  const [enteredNumber, setEnteredNumber] = useState("");

  const [validFields, setValidFields] = useState(true);
  const [numberLength, setNumberLength] = useState(true);

  const NameInput = (event) => {
    console.log(event.target.value);
    setEnteredName(event.target.value);
  };
  const MailInput = (event) => {
    setEnteredMail(event.target.value);
  };
  const BillInput = (event) => {
    setEnteredBill(event.target.value);
  };
  const NumberInput = (event) => {
    setEnteredNumber(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredName === "") {
      setValidFields(false);
      return;
    }
    if (enteredMail === "") {
      setValidFields(false);
      return;
    }
    if (enteredBill === "") {
      setValidFields(false);
      return;
    }
    if (enteredNumber.length < 8 || enteredNumber < 1) {
      setNumberLength(false);
      return;
    }
    if (enteredNumber === "") {
      setValidFields(false);
      return;
    }

    const collectedData = {
      name: enteredName,
      mail: enteredMail,
      bill: enteredBill,
      number: enteredNumber,
    };
    console.log(collectedData);
    setNumberLength(true);
    setValidFields(true);
    setEnteredName("");
    setEnteredMail("");
    setEnteredNumber("");
    setEnteredBill("");
  };

  return (
    <>
      <Shape />
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={submitHandler}>
        <div>
          <Label> Name </Label> <br />
          <input
            className={"inputs"}
            type="text"
            onChange={NameInput}
            value={enteredName}
          />
        </div>
        <div>
          <Label> Mailing address </Label> <br />
          <input
            className={"inputs"}
            type="text"
            min="0.01"
            step="0.01"
            onChange={MailInput}
            value={enteredMail}
          />
        </div>
        <div>
          <Label> Billing Address </Label> <br />
          <input
            className={"inputs"}
            type="text"
            onChange={BillInput}
            value={enteredBill}
          />
        </div>
        <div>
          <Label> Enter Number </Label> <br />
          <input
            className={"inputs"}
            type="number"
            onChange={NumberInput}
            value={enteredNumber}
          />
        </div>
        {!validFields && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Please complete all inormation!{" "}
          </p>
        )}

        {!numberLength && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Please check your phone number and guest amount again{" "}
          </p>
        )}
        <Button style={{ marginLeft: "40%" }} type="submit">
          {" "}
          Submit{" "}
        </Button>
      </form>
    </>
  );
};

export default User;
