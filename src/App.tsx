import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Forum from './Pages/Forum';
import Content from './Pages/Content';
import Register from './Pages/Register';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/forum" element={<Forum />} />
                <Route path="/content" element={<Content />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;
