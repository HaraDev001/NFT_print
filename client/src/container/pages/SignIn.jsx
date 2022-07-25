import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import validator from "validator";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { login } from "../../actions/authActions";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
      email: "",
      password: ""
  });

  const onSignin = (e) => {
    e.preventDefault()
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
    setErrors(errors);
    if (isErr === true) {
      return;
    }
    const data = {
      email: email,
      password: password
    }
    props.login(data, props.history);
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to="/" className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded p-4 p-lg-5 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} name="email" onChange={(e) => {setEmail(e.target.value); setErrors({...errors, email: ""})}}/>
                    </InputGroup>
                    {
                      errors.email === "" ? "" : <span className="text-red">{errors.email}</span>
                    }
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-3">
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
                      {
                        <span className="text-red">{props.error.err}</span>
                      }
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4 ml-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" onClick={(e) => onSignin(e)}>
                    Sign in
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

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  wallet: state.wallet
});

export default connect(mapStateToProps, {login})(withRouter(SignIn));