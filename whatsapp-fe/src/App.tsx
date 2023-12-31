
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
  console.log(user.user.email)
  return (
    <div className='dark' >
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
