import React from "react";
import Card from "react-credit-cards";
import "./PaymentTab.css";
import { useNavigate } from "react-router-dom";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
//   formatFormData,
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: "",
    token: "",
   
  };
 
  // componentDidMount() {
  //   const tok = sessionStorage.getItem("authToken");
  //   const decoded = jwt_decode(tok);
  //   this.setState({ token: decoded.user });
  // }

  // handleCallback = ({ issuer }, isValid) => {
  //   if (isValid) {
  //     this.setState({ issuer });
  //   }
  // };

  // handleInputFocus = ({ target }) => {
  //   this.setState({
  //     focused: target.name,
  //   });
  // };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();

  };

  moveToTicketPage = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentData", JSON.stringify(this.state.token));
    window.alert('Payment Confirmed.')
    window.location="/ticket"
  };

  renderNamesOfPassenger = () => {
    let passArray = localStorage.getItem("nameData");
    if (passArray) {
      let nameArray = JSON.parse(passArray) || [];
      console.log(nameArray)
      return nameArray.map((name, idx) => {
        return <p key={idx}> {name} </p>;
      });
    }
  };
  
  // localff = () => {
  //   let passArray = localStorage.getItem("nameData");
  //   if (passArray) {
  //     let nameArray = JSON.parse(passArray);
     
  //       return nameArray[0];
      
  //   }
  // };

  renderSeatNumbers = () => {
    let seatArray = localStorage.getItem("reservedSeats");
    if (seatArray) {
      let seaArr = JSON.parse(seatArray);
      return seaArr.map((seat, idx) => {
        return <p key={idx}> {seat} </p>;
      });
    }
  };

  getSumTotal = () => {
    let count = 0;
    let tax = 15;
    let seatArray = localStorage.getItem("reservedSeats");
    if (seatArray) {
      let seaArr = JSON.parse(seatArray);
      for (let i = 0; i < seaArr.length; i++) {
        count++;
      }
      return (
        <div>
          <div className="hr3" />
          <div> ${100 * count} </div> <div> +{tax} </div> <div>${100 * count + tax} </div>{" "}
        </div>
      );
    }
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer } =
      this.state;
    //   formData, token
    return (
      <div className="paym">
        <div className="row">
          <div key="Payment">
            <div className="App-payment cl-1">
              <p className="Payment"> Enter Credit card details </p>{" "}
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={this.handleCallback}
              />{" "}
              <form
                className="credit-form"
                ref={(c) => (this.form = c)}
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="tel"
                    name="number"
                    className="frm-ctrl"
                    placeholder="Card Number"
                    pattern="[\d| ]{16,22}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="frm-ctrl"
                    placeholder="Name"
                    autoComplete="off"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  <input
                    type="tel"
                    name="expiry"
                    className="frm-ctrl"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  <input
                    type="tel"
                    name="cvc"
                    className="frm-ctrl cvc"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />{" "}
                </div>{" "}
                <input type="hidden" name="issuer" value={issuer} />{" "}
                <div className="">
                  <button
                    onClick={(e) => this.moveToTicketPage(e)}
                    className="btn btn-light btCustom"
                  >
                    PAY{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "}
            </div>{" "}
          </div>{" "}
          <div className="columnTwo">
            <h3> Let's Travels </h3>{" "}
            <div>
              <p> BOOKING DETAILS </p>{" "}
              <br></br>
              <div className="row">
                <div className="col-6 pt">
                  <p className="hdng"> Passengers </p>{" "}
                  {this.renderNamesOfPassenger()} <hr className="hr3" />
                  <p className="hdng"> Ticket price </p>{" "}
                  <p className="hdng"> Tax </p>{" "}
                  <p className="hdng"> Total Sum </p>{" "}
                </div>{" "}
                <div className="col-6">
                  <hr className="hr3" />
                  <p className="hdng">Seat No. </p> {this.renderSeatNumbers()}
                  <div> {this.getSumTotal()} </div>
                </div>{" "}


              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}