import { BrowserRouter as Router, Route } from "react-router-dom";
import Legacy from "./Legacy/Legacy";

export const Routes = () => {
  return (
    <Router>
      <Route path="/">
        <Legacy />
      </Route>
      {/* Add more routes here if needed */}
    </Router>
  );
};