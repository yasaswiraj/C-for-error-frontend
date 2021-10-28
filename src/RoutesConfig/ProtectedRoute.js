import { Route, Redirect } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem("token")) {
            return (
              <div>
                <NavigationBar />
                <Component {...props} />
              </div>
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </>
  );
}
