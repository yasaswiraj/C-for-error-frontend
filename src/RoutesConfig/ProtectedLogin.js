import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedLogin({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem("token")) {
            return (
              <Redirect
                to={{
                  pathname: "/questions",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        }}
      />
    </div>
  );
}
