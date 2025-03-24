import { Route, Routes } from "react-router-dom";
import routes from "../../routes";
import { Fragment } from "react";
import ProtectedRoute from "../ProtectedRoute";

function AppRoute() {
  return (
    <Routes>
      {routes.map((route) => {
        const RouteElement = route.protected ? ProtectedRoute : Fragment;
        const Component = route.component;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RouteElement>
                <Component />
              </RouteElement>
            }
          />
        );
      })}
    </Routes>
  );
}

export default AppRoute;
