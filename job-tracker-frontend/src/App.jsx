import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";

function App() {

  return (

    <BrowserRouter>

      <Routes>
        
       <Route
  path="/"
  element={<Login />}
/>
        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add-job"
          element={<AddJob />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;