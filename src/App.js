import Login from "./Pages/Login";
import QuestionsList from "./Pages/QuestionsList";
import Question from "./Pages/Question";
import ProtectedRoute from "./RoutesConfig/ProtectedRoute";
import { ProtectedLogin } from "./RoutesConfig/ProtectedLogin";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedLogin exact path="/" component={Login} />
        <ProtectedRoute path="/test" component={Login} />
        <ProtectedRoute path="/questions" component={QuestionsList} />
        <ProtectedRoute path="/question" component={Question} />
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
