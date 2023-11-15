import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Forum from './Pages/Forum';
import Content from './Pages/Content';
import IDPage from './Pages/[ID]';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Redeem from './Pages/Redeem';
import Profile from './Pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/content" element={<Content />} />
          <Route path="/content/:id" element={<IDPage />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
