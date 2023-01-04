import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  const queryClient = new QueryClient();
  const [ role, setRole ] = useState(null);
  const [ id, setId ] = useState(null);
  const [logedIn, setLogedIn] = useState(false);

  const changeLogIn = (val) => {
    setLogedIn(val);
  } 

  useEffect(() => {
    if(sessionStorage.getItem("token")) {
    const user_data = jwt_decode(sessionStorage.getItem("token"));
    setRole(user_data.role);
    setId(user_data.user_id);
  }
  } , [logedIn]);

  return (
    <QueryClientProvider client={queryClient} className="App">
      <Header id={id}/>
      <Routes>
         <Route path='/' element={<Home id={id}/>}/>
         <Route path='/dogs' element={<Dogs />}/>
         <Route path='/my-dogs' element={<OwnedDogs id={id}/>}/>
         <Route path='/profile' element={<Profile id={id}/>} />
         <Route path='/dog/:id' element={<DogDetails />} />
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login changeLogIn={changeLogIn}/>} />
         <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
