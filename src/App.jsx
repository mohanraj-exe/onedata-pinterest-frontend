import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pinpage from './pages/Pinpage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/pin' element={<Pinpage />} />
      </Routes>
    </>
  )
}

export default App
