import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "../Images/logo.png";
import CSlogo from "../Images/cs-logo.png";

export function NavigationBar() {
  let history = useHistory();
  return (
    <Navbar
      className="shadow"
      collapseOnSelect
      expand="lg"
      bg="*"
      variant="dark"
      style={{ backgroundColor: "#FF6B6B" }}
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <img className="mx-5" src={logo} alt="" width="40" height="40" />
          <img src={CSlogo} alt="" width="auto" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <div
              className="btn d-flex align-items-center text-light"
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              <img
                className="mx-2"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAABmJLR0QA/wD/AP+gvaeTAAADLElEQVRoge2aX4tVVRiHn3capaDESKMgitSLitKiwhKKcDIvJG+9ixCCCL3uoi+QH8AL7wujvkA0aYQQSZSB/RMqEKwG/zSDDjkT1uPF3mdmeZwzZ4azlrNne56bs1l7r99+f2e9e+93rb1hyJBVSaj7gAPAXSsdTBczwOGIOJpDLNTLwD05xAowDayLCAcVCnVgkcKsiYhrg4qMJtv/AjsGFczECXJfSs4zk1V4ANTpJK7R/j36M5JDZDUwNNo2hkbbxtBo22iq0av17wzwf7pDXavGshUbWjDsV0+rB7raX1f/Uc+ojy5XtHFGe6EeTeI9q25aat+mpm4v0nLwYeBLdctSOq42o908BJxQH+934Go3CvAAcFx9YrGDsswMeqFupEqxXNybbL8PvAOsozI7ru6MiDO9gilyM1K3qFcsx171BXUqaftTfWyheEqm7g7g7oL6UxHxNbAbmKrbHgS+WCiNS6Zu+if+AfycUfsk1SoEEXFSfQ34DFjP/DU7FhE/zvUomLpvJtpHcmr3ON8z6sXknOfVpzr723DXBSAiTgGvApfqpo3AMXUrtMgoQER8D+ziZrPbWmUUbhjZi3XTBuDj1hmt+Q9I16tHWmdU3QYcp0pbgL+Bfa0yqj4NfE6VrgCTwO6I+K5oCXgrSUzeVzdNArsi4lsoXOsm7FHHM+p9A7zXefmkPkdVMHRq4QvAWEScnutRsGB4I0M9uxgv1+d5Xp1M2ifUJ7vjKXmNfgVcKai/Xt0OjFOVfgATwM6I+KH74GKpGxG/Wi11PJJR9hAwVm+/yPw0DeAvKpO/LNizVOqWQP2kRxpP2Gfi3YbHSyddf1rsoEYatZpUf2D1fcVinANe6meyI9qo1FXvV2frmK6ZrN+qHybxnlU3L1W3iSM6CtxRb48Aa5J9HwGzwCnglYj4bcmqTRtRmHsGf6q+vcC+5b+OqDs2zmgJmpi6RRgaXUnUg+rv6rs5RRt3jTq/mjerZhmMRo4ocGf9u5ZMMTbVaHZuG6PpNC3UZ1cskhvJPgC3zWesI8DlDMGUYppqjXZgRoG3gIM071Pzq1Sfmjc944YMKcl1LQ3hcctdX0QAAAAASUVORK5CYII="
                width="20"
                alt=""
              />
              Logout
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
