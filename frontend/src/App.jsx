import "bootstrap5/src/css/bootstrap.min.css";
// import "bootstrap5/src/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
