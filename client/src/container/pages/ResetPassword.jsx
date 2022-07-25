import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import validator from "validator";
import CompleteModal from "../../component/modal/CompleteModal";

const serverURL = require("../../config.js").serverURL;

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [modal, setModal] = useState(false);

  const toogleModal = () => {
    setModal(!modal);
  };

  const onResetPassword = (e) => {
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
    setErrors(errors);
    if (isErr === true) {
      return;
    }
    const data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    axios
        .post(serverURL + "/users/resetpassword", data)
        .then(res => {
          if ( res.data.status === "error") {
            setError(res.data.msg);
          }
          else {
            setError("");
            setModal(!modal);
          }
        })
        .catch(err =>{
              console.log(err);
        });
  }

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
        <CompleteModal toogleModal={toogleModal} modal={modal} title="Password Changed" content="Your password changed. Lorem ipsum dolor sit amet, corsectetur adipiscing elit, sed do elusmod tempor incididunt ut et dolore magna aliqua."></CompleteModal>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to="/admin" className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to admin page
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded p-4 p-lg-5 fmxw-500 w-50">
                <h3 className="mb-4">Reset password</h3>
                <Form>
                  <Form.Group id="email" className="mb-2">
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
                  <div className="mb-2">
                    <span className="text-red">{error}</span>
                  </div>
                  <Button variant="primary" type="submit" className="w-100" onClick={(e) => onResetPassword(e)} >
                    Reset password
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

export default ResetPassword;