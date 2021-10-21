import { Navbar, Container } from "react-bootstrap";
import "./navbar.css";

export default function NavigationBar() {
  return (
    <div className="navbar">
      <Navbar
        bg="*"
        variant="dark"
        expand="lg"
        style={{ backgroundColor: "black" }}
      >
        <Container>
          <Navbar.Brand Style="Color : white ; Font-size : 30px">
            'C' for Error
          </Navbar.Brand>
          <Navbar.Brand href="/" Style="Color : white ; Font-size : 20px">
            Logout
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
