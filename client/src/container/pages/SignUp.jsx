
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import validator from "validator";

import BgImage from "../../assets/img/illustrations/signin.svg";
const serverURL = require("../../config.js").serverURL;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onSignup = (e) => {
    e.preventDefault();
    let isErr = false;
    const errors = {
      email: "",
      password: "",
      confirmPassword: ""
    }
    if ( email === "" ) {
      errors.email = "Email is required";
      isErr = true;
    }
    else if ( !validator.isEmail(email) ) {
      errors.email = "Invalid Email";
      isErr = true;
    }
    if ( password === "" ) {
      errors.password = "Password is required";
      isErr = true;
    }
    if ( confirmPassword === "" ) {
      errors.confirmPassword = "Confirmpassword is required";
      isErr = true;
    }
    else if ( password !== confirmPassword) {
      errors.confirmPassword = "Confirmpassword is different from password";
      isErr = true;
    }
    setErrors(errors);
    if (isErr === true) {
      return;
    }
    const data = {
      email: email,
      password: password
    }
    axios
        .post(serverURL + "/users/register", data)
        .then(res => {
          if ( res.data.status === "error") {
            setError(res.data.msg);
          }
          else {
            setError("SUCCESS");
          }
        })
        .catch(err =>{
              console.log(err);
        });
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to="/admin" className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to admin page
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} onChange={(e) => {setEmail(e.target.value); setErrors({...errors, email: ""})}}/>
                    </InputGroup>
                    {
                      errors.email === "" ? "" : <span className="text-red">{errors.email}</span>
                    }
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); setErrors({...errors, password: ""})}}/>
                    </InputGroup>
                    {
                      errors.password === "" ? "" : <span className="text-red">{errors.password}</span>
                    }
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); setErrors({...errors, confirmPassword: ""})}}/>
                    </InputGroup>
                    {
                      errors.confirmPassword === "" ? "" : <span className="text-red">{errors.confirmPassword}</span>
                    }
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>
                  <div className="mb-2">
                    <span className="text-red">{error}</span>
                  </div>
                  <Button variant="primary" type="submit" className="w-100" onClick={(e) => onSignup(e)}>
                    Sign up
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

export default SignUp;