import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Container from "@material-ui/core/Container";
// import Button from "@material-ui/core/Button";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import "./reservation.css";
import Animation from "./Icons/Animation";
import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from "@material-ui/core/Button";

// const UserInputs
const Label = styled.label`
  margin-left: 37%;
  margin-bottom: 60px;
  font-size: 23px;
  font-weight: bold;
  color: #1864ab;
`;

/*const Button = styled.button`
  height: 50px;
  width: 180px;
  color: whitesmoke;
  background-color: #1864ab;
  border-radius: 10px;
  font-size: 20px;
`;*/

const Shape = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  clip-path: polygon(100% 0%, 60% 0%, 45% 100%, 100% 100%);
  background-color: #e3fafc;
`;

const Marquee = keyframes`
  from {
    transform: translateX(-630px);
  }
  to {
    transform: translateX(-50px);
  }
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-left: 100px;
  margin-top: 200px;
  z-index: -1;
  animation: ${Marquee} 50s linear infinite;
`;

//const DateCheck = new Date().toLocaleDateString;

export function getAvaTables(date) {
  return fetch(`http://localhost:5000/resv/tables_date/${date}`).then((data) =>
    data.json()
  );
}

export function createResv(event) {
  console.log(event);
  return fetch("http://localhost:5000/resv/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((data) => data.json());
}

const Reservations = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredGuest, setEnteredGuest] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [date_resv, setEnteredDate] = useState("");
  const [res_cost, setCost] = useState(0);

  const [validFields, setValidFields] = useState(true);
  const [OpenModal, setOpenModal] = useState(true);

  const [numberLength, setNumberLength] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  // const [verifyDate, setVerifyDate] = useState(true);

  const [avaTables, setAvaTables] = useState({table_size_1:0,table_size_2:0,table_size_3:0,table_size_4:0, table_size_5:0, table_size_6:0, table_size_7:0, table_size_8:0});
  const [count, setCount] = useState([0,0,0,0,0,0,0,0]);
  const [tablesP, setTablesP] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [holiday] = useState(['2022-01-17','2022-05-30', '2022-09-05','2021-12-24', '2021-12-31','2022-01-01']);
  const [errorT, setErrorT] = useState(true);
  
  const NameInput = (event) => {
    setEnteredName(event.target.value);
  };

  const PhoneInput = (event) => {
    setEnteredPhone(event.target.value);
  };

  const GuestInput = (event) => {
    setEnteredGuest(event.target.value);
  };

  const EmailInput = (event) => {
    setEnteredEmail(event.target.value);
  };
  const DateInput = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredPhone.length < 8 || enteredGuest < 1) {
      setNumberLength(false);
      return;
    }
    if (enteredName === "") {
      setValidFields(false);
      return;
    }
    if (enteredPhone === "") {
      setValidFields(false);
      return;
    }
    if (enteredGuest === "") {
      setValidFields(false);
      return;
    }
    if (
      enteredEmail === "" ||
      !enteredEmail.includes("@") ||
      !enteredEmail.includes(".com")
    ) {
      setEmailCheck(false);
      // setValidFields(false);
      return;
    }
    if (date_resv === "") {
      setValidFields(false);
      return;
    }
    // if (DateInput < DateCheck) {
    //   setVerifyDate(false);
    // }
    const collectedData = {
      name: enteredName,
      phone: enteredPhone,
      guest: enteredGuest,
      email: enteredEmail,
      date: date_resv,
    };
    setCost(5);
console.log(date_resv);
    if(holiday.includes(date_resv) ){
      setCost(7);
    }

    GetAvaTablesSubmit();
    console.log(avaTables);
    console.log(collectedData);
    setNumberLength(true);
    // setVerifyDate(true);
    setValidFields(true);
    setEmailCheck(true);

  };

  const ShowModal = () => {
    setOpenModal(false);
  };

  const submitResv = (event) => {
    event.preventDefault();
    console.log(enteredGuest);
    console.log(totalSize);

    if(totalSize >= enteredGuest && enteredGuest !== ""){
    const client = {
      name: enteredName,
      email: enteredEmail,
    };
    const tables = tablesP;
    const resv = {client, tables, res_cost, date_resv}
    console.log(resv);
    console.log("sending to api, create");
    setErrorT(true);  
    createResv(resv);
    //window.location.reload(false);
  }
  else{
    console.log("Sorry you have more guest, please pick a bigger table or more tables");
    setErrorT(false);
  }
  };

  const IncCount = (event, i) => {
    event.preventDefault();
    console.log(totalSize);
    let newArr = [...count];
    var temp = count[i] +1;
    newArr[i] = temp;
    setTotalSize(totalSize+i+1);
    setCount(newArr);
    setTablesP(oldValues => [...oldValues, i+1]);
    console.log(newArr);
    console.log(tablesP);
    console.log(totalSize);
  };

  const DecCount = (event, i) => {
    event.preventDefault();
    let newArr = [...count];
    if(newArr[i] !== 0 ){
    var temp = count[i] -1;
    newArr[i] = temp;
    let Tablespicked = [...tablesP]; 
    let indexR = Tablespicked.indexOf(i+1);
    Tablespicked.splice(indexR, 1);
    setTotalSize(totalSize-i-1);
    setCount(newArr);
    setTablesP(Tablespicked);
    console.log(newArr);
    console.log(tablesP);
    console.log(totalSize);
    }
  };

  const GetAvaTablesSubmit = () => {
    let mounted = true;
    getAvaTables(date_resv).then((tables) => {
      if (mounted) {
        setAvaTables(tables);
      }
    });
    return () => (mounted = false);
  };

  return (
    <div>
      <Icons>
        {" "}
        <Animation />{" "}
      </Icons>
      <Shape />
      {OpenModal && (
        <div className={"backdrop"} onClick={ShowModal}>
          <p className={"modal"}>
            For awesome deals <br /> Don't forget to{" "}
            <span style={{ color: "red" }}>
              {" "}
              register! <br />
            </span>
            <Link href="/register" variant="body2">
            <button className={"btn"} onClick={ShowModal} >
              {"I Love Coupons!"}
            </button></Link>
          </p>
        </div>
      )}

      <form onSubmit={submitHandler}>
        <div>
          <br /> {/*idk why margin top isn't working for label so I used br*/}
          <br />
          <br />
          <br />
          <br />
          <Label> Name </Label> <br />
          <input
            className={"inputs"}
            type="text"
            onChange={NameInput}
            value={enteredName}
          />
        </div>

        <div>
          <Label> Phone </Label> <br />
          <input
            className={"inputs"}
            type="number"
            min="0.01"
            step="0.01"
            onChange={PhoneInput}
            value={enteredPhone}
          />
        </div>
        <div>
          <Label> Email </Label> <br />
          <input
            className={"inputs"}
            type="text"
            onChange={EmailInput}
            value={enteredEmail}
          />
        </div>

        <div>
          <p className="amounts"> Enter the amount of guests </p>
          <input
            className={"inputs"}
            type="number"
            onChange={GuestInput}
            value={enteredGuest}
          />
        </div>

        <div>
          <Label> Please a select Date </Label> <br />
          <input
            className={"inputs"}
            // type="date"
            // min="2017-04-01"
            onChange={DateInput}
            value={date_resv}
            type="date"
            min="2021-12-01"
            max="2023-06-30"
            required
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
        {!numberLength && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Please check your phone number and guest amount again{" "}
          </p>
        )}
        {/* {!verifyDate && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Please check your reservation date{" "}
          </p>
        )} */}

        <Button style={{ marginLeft: 650 }} type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>

        <Box sx={{mb:20}}> 
      <TableContainer component={Paper} sx={{ maxWidth: 900, mt: 10 , ml:25,}}>
      <Table sx={{ maxWidth: 900 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Tables size</TableCell>
            <TableCell>Avaliable Tables</TableCell>
            <TableCell align="left">Add/Subtract</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/*{avaTables.map((event) => {
          const { table_size_1, table_size_2, table_size_3, table_size_4, table_size_5, table_size_6, table_size_7, table_size_8 } = event;*/}

            <TableRow>
            <TableCell >1</TableCell>
              <TableCell>{avaTables.table_size_1}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 0)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 0)} >Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[0]}</TableCell>
              </TableRow>

              <TableRow>
            <TableCell >2</TableCell>
              <TableCell>{avaTables.table_size_2}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 1)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 1)}>Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[1]}</TableCell>
              </TableRow>

              <TableRow>
            <TableCell >3</TableCell>
              <TableCell>{avaTables.table_size_3}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 2)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 2)}>Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[2]}</TableCell>
              </TableRow>

              <TableRow>
            <TableCell >4</TableCell>
              <TableCell>{avaTables.table_size_4}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 3)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 3)}>Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[3]}</TableCell>
              </TableRow>

              <TableRow>
            <TableCell >5</TableCell>
              <TableCell>{avaTables.table_size_5}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 4)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 4)}>Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[4]}</TableCell>
              </TableRow>

              <TableRow>
            <TableCell >6</TableCell>
              <TableCell>{avaTables.table_size_6}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 5)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 5)}>Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[5]}</TableCell>
              </TableRow>

              <TableRow>
            <TableCell >7</TableCell>
              <TableCell>{avaTables.table_size_7}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 6)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 6)}>Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[6]}</TableCell>
              </TableRow>

              <TableRow>
            <TableCell >8</TableCell>
              <TableCell>{avaTables.table_size_8}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="contained">
                  <Button size="small" onClick={ (e) => DecCount(e, 7)}>Subtract</Button>
                  <Button size="small" onClick={ (e) => IncCount(e, 7)}>Add</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell align="right">{count[7]}</TableCell>
              </TableRow>

        </TableBody>
      </Table>
    </TableContainer>

    {!errorT && (
          <p style={{ color: "red", marginLeft: 600, fontSize: 25 }}>
            {" "}
            Sorry you have more guest, please pick a bigger table or more tables{" "}
          </p>
        )}

    <p style={{ marginLeft: 630, marginTop: 15  }}> Total cost: ${res_cost}.00</p>
    <Button style={{ marginLeft: 600, marginTop: 15  }} color="primary" variant="contained" onClick={ (e) => submitResv(e)}>Reserve Table(s)</Button>
    </Box>
    </div>
  );
};

export default Reservations;
