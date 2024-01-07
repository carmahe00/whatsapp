
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { NotFound } from './pages/not-found';
//import { useDispatch } from 'react-redux';
import { selectUser } from './features/userSlice';
import { useAppSelector } from './app/store';

function App() {
  // const dispatch = useDispatch()
  const user = useAppSelector(rootState => selectUser(rootState));
  return (
    <div className='dark' >
      
      <Router>
        <Routes>
          <Route path="/" element={user.user.acces_token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user.user.acces_token ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user.user.acces_token ? <Register /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
