import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";

import CompleteModal from "../../component/modal/CompleteModal";

const serverURL = require("../../config.js").serverURL;

const ConfirmForgotPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
      password: "",
      confirmPassword: ""
  });
  const [modal, setModal] = useState(false);

  const toogleModal = () => {
    setModal(!modal);
  };

  const onReset = (e) => {
    let isErr = false;
    const errors = {};
    e.preventDefault();
    if ( password === "" ) {
      errors.password = "Password is required";
      isErr = true;
    }
    if ( confirmPassword !== password) {
        errors.confirmPassword = "Confirmpassword should be same as password.";
        isErr = true;
    }
    if ( confirmPassword === "" ) {
      errors.confirmPassword = "Confirmpassword is required";
      isErr = true;
    }
    setErrors(errors);
    if (isErr === true) {
        return;
    }
    const data = {
      password: password,
      token: props.match.params.token
    }
    axios
        .post(serverURL + "/users/updatepassword", data)
        .then(res => {
            console.log(res.data)
            if(res.data.status === "success") {
              setModal(!modal);
            }
        })
        .catch(err =>{
              console.log(err);
        });
  }

  useEffect(() => {
    const data = {
        token: props.match.params.token
    }
    axios
        .post(serverURL + "/users/getbyresetpasswordtoken", data)
        .then(res => {
            if (res.data.status === "failed") {
                props.history.push("/");
            }
        })
        .catch(err =>{
          console.log(err);
        });
}, []);

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <CompleteModal toogleModal={toogleModal} modal={modal} title="Password changed" content="Your change has been completed. Lorem ipsum dolor sit amet, corsectetur adipiscing elit, sed do elusmod tempor incididunt ut et dolore magna aliqua."></CompleteModal>
            <p className="text-center">
              <Card.Link as={Link} to="/admin" className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to admin page
            </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded w-50 p-4 p-lg-5 fmxw-500">
                <h3>Reset your password?</h3>
                <Form>
                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
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
                  <Button variant="primary" type="submit" className="w-100" onClick={(e) => onReset(e)}>
                    Change password
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

export default withRouter(ConfirmForgotPassword);
