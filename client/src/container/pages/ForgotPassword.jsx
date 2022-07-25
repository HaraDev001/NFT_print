import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import validator from "validator";
import axios from "axios";
import emailjs from "emailjs-com";


import CompleteModal from "../../component/modal/CompleteModal";
const isEmpty = require("is-empty");
const serverURL = require("../../config.js").serverURL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [err_email, setErr_email] = useState("");
  const [modal, setModal] = useState(false);

  const toogleModal = () => {
    setModal(!modal);
  };

  const onRecover = (e) => {
    let isRecover = true;
    e.preventDefault();
    if (isEmpty(email)) {
      setErr_email("Email is required")
      isRecover = false;
    }
    if (isRecover === false || err_email !== "") {
      return;
    }
    axios
        .post(serverURL + "/users/forgotpassword", { email: email })
        .then(res => {
          if(res.data.status === "success") {
            // setModal(!modal);

            const data = {
              service_id: 'service_0k4j6j1',
              template_id: 'template_p685n5g',
              user_id: 'user_CIZByJ3eqvzoMTm2hlNRW',
              params: {
                to_name: res.data.user.email,
                from_name: "NFT Print Site",
                message: 'You are receiving this because you ( or someone else) have requested the reset of the password for your account.\n\n'
                    + 'Please click on the following link, or paste this into your browser to complete the process: \n\n'
                    + `${process.env.REACT_APP_URL}reset/${res.data.token} \n\n`
                    + "If you did not request this, please ignore this email and your password will remain unchanged.\n"
              }
            };
            emailjs.send(
              data.service_id,
              data.template_id,
              data.params,
              data.user_id
            ).then(res => {
              console.log("successfully sent");
            }).catch(err => {
              console.log("err:", err)
            })
          }
        })
        .catch(err =>{
          console.log(err);
        });
  }

  const onBlur = (e) => {
    if (!validator.isEmail(e.target.value)) {
      setErr_email("Enter valid Email");
    }
    else {
      setErr_email("");
    }
  }

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
            <CompleteModal toogleModal={toogleModal} modal={modal} title="Mail sending" content="Mail is sending to your email. Lorem ipsum dolor sit amet, corsectetur adipiscing elit, sed do elusmod tempor incididunt ut et dolore magna aliqua."></CompleteModal>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to="/admin" className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to admin page
            </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded w-50 p-4 p-lg-5 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                <Form>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control required autoFocus type="email" placeholder="john@company.com" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => onBlur(e)}/>
                    </InputGroup>
                    {
                        err_email === "" ? "" : <span className="font__size--14 text-red ml-1">{err_email}</span>
                    }
                  </div>
                  <Button variant="primary" type="submit" className="w-100" onClick={(e) => onRecover(e)}>
                    Recover password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default ForgotPassword;