import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dogs from './pages/Dogs';
import Footer from './components/Footer';
import BookedRooms from './pages/OwnedDogs';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Test from './pages/Test';
import DogDetails from './pages/DogDetails';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
         <Route path='/' element={<Home />}/>
         <Route path='/dogs' element={<Dogs />}/>
         <Route path='/my-dogs' element={<BookedRooms />}/>
         <Route path='/profile' element={<Profile />} />
         <Route path='/dog/:id' element={<DogDetails />} />
         <Route path='/test' element={<Test />} />
         <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
