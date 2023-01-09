import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dogs from './pages/Dogs';
import Footer from './components/Footer';
import OwnedDogs from './pages/OwnedDogs';
import Error from './pages/Error';
import Profile from './pages/Profile';
import DogDetails from './pages/DogDetails';
import {  QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Register from './pages/Register';
import Login from './pages/Login';
import Breed from './dashboard/Breed';
import DashboardDogs from './dashboard/Dogs';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import CreateDog from './pages/CreateDog';
import CreateBreed from './dashboard/CreateBreed'

function App() {
  const queryClient = new QueryClient();
  const [ role, setRole ] = useState(null);
  const [ id, setId ] = useState(null);
  const [logedIn, setLogedIn] = useState(false);
  const navigate = useNavigate();
  const changeLogIn = () => {
    setLogedIn(!logedIn);
  } 

  const logOut = () => {
    sessionStorage.removeItem("token");
    setId(null);
    setRole(null);
  }

  useEffect(() => {
    if(sessionStorage.getItem("token")) {
    const user_data = jwt_decode(sessionStorage.getItem("token"));
    setRole(user_data.role);
    setId(user_data.user_id);
    }
    

  } , [logedIn, id]);

  return (
    <QueryClientProvider client={queryClient} className="App">
      <Header id={id} role={role} logOut={logOut}/>
      <Routes>
         <Route path='/' element={<Home id={id}/>}/>
         <Route path='/dogs' element={<Dogs />}/>
         <Route path='/my-dogs' element={<OwnedDogs id={id}/>}/>
         <Route path='/offer-dog' element={<CreateDog id={id}/>}/>
         <Route path='/profile' element={<Profile id={id} role={role}/>} />
         <Route path='/dog/:id' element={<DogDetails />} /> 
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login changeLogIn={changeLogIn}/>} />
         <Route path='*' element={<Error />} />
          {/* Only Admin has access to these */}
         <Route path='/dashboard/dogs' element={<DashboardDogs role={role}/>} />
         <Route path='/dashboard/breeds' element={<Breed role={role}/>} />
         <Route path='/dashboard/create-breed' element={<CreateBreed role={role}/>} />  
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
