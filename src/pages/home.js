import { Container } from "react-bootstrap";
import NavigationBar from "../components/navbar";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <NavigationBar />
      <div className="bodycontents">
        <Container>
          <div className="rules">
            <p>Rules and Regulations:</p>
            <p>You should not copy</p>
            <p>You should not copy</p>
            <p>You should not copy</p>
            <p>You should not copy</p>
            <p>You should not copy</p>
            <p>You should not copy</p>
          </div>
          <div className="continue">
            <button href="/">Continue</button>
          </div>
        </Container>
      </div>
    </div>
  );
}
