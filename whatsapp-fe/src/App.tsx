
import { io } from "socket.io-client";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { NotFound } from './pages/not-found';
//import { useDispatch } from 'react-redux';
import { selectUser } from './features/userSlice';
import { useAppSelector } from './app/store';
import SocketContext from './context/SocketContext';
const socket = io(process.env.REACT_APP_API_ENDPOINT?.split("/api/v1")[0]!)

function App() {
  // const dispatch = useDispatch()
  const user = useAppSelector(rootState => selectUser(rootState));

  return (
    <div className='dark' >
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route path="/" element={user.user.acces_token ? <Home socket={socket} /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user.user.acces_token ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user.user.acces_token ? <Register /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
