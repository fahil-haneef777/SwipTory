import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import Bookmark from "./Pages/Bookmark/Bookmark";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./Context/Context";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
