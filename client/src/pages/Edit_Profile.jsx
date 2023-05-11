import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginCSS from "../css/LoginUI.module.css";
import { Row, Col, Container } from "react-bootstrap";

const Edit_Profile = ({ userid }) => {
  const navigate = useNavigate();

  const handleToDashBoard = () => {
    navigate.push("/dashboard");
  };

  const routeHTTP = "http://localhost:8000";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_staff: userType === "staff",
      salt: "salt",
      password_hash: password,
    };

    fetch(`${routeHTTP}/user/${userid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        alert("Thank you for updating your data!");
      })
      .catch((error) => console.error(error));
  };

  const getUserData = () => {
    fetch(`${routeHTTP}/user/${userid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        if (data.is_staff) {
          setUserType("staff");
        } else {
          setUserType("student");
        }
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={LoginCSS.formbg}>
      <div>
        <h2 className={LoginCSS.headers}>Update your user account!</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-left" controlId="formBasicFirstName">
            <Row>
              <Form.Label column sm={4}>
                First Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="Enter your first name"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="formBasicLastName">
            <Row>
              <Form.Label column sm={4}>
                Last Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="Enter your last name"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
            <Row>
              <Form.Label column sm={4}>
                Email address
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  Please use the email that you check most often.
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="formBasicPassword">
            <Row>
              <Form.Label column sm={4}>
                Password:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                />
                <Form.Text className="text-muted">
                  Password must be 8 characters long.<br></br>
                  Must have a special character eg., @$#! <br></br>
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="formBasicUserType">
            <Row>
              <Form.Label column sm={4}>
                Student or Staff member?
              </Form.Label>
              <br />
              <Col sm={8}>
                <Form.Check
                  type="radio"
                  label="Student"
                  name="userType"
                  value="student"
                  checked={userType === "student"}
                  onChange={handleUserTypeChange}
                />
                <Form.Check
                  type="radio"
                  label="Staff"
                  name="userType"
                  value="staff"
                  checked={userType === "staff"}
                  onChange={handleUserTypeChange}
                />
              </Col>
            </Row>
          </Form.Group>
          <Container className={LoginCSS.btnwrap}>
            <Button className={LoginCSS.btn} variant="primary" type="submit">
              Submit
            </Button>
          </Container>
          <Container className={LoginCSS.btnwrap}>
            <Button
              as={Link}
              to="/dashboard"
              onClick={handleToDashBoard}
              variant="primary"
              type="cancel"
            >
              Cancel
            </Button>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default Edit_Profile;
