
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Head from './pages/head_or_tail';
import Toss from './pages/toss';
import Play from './pages/play';
import Game from './pages/game';
import CoinToss from './pages/toss';
import { createContext,useState } from 'react';
export const UserContext = createContext();

function App() {
  const [selectedOne,setSelectedOne] = useState('');
  const[selectedTwo,setSelectedTwo]=useState('')
  return (
    
    <>
  <UserContext.Provider value={{ selectedOne, setSelectedOne,selectedTwo,setSelectedTwo}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Play />} />
          <Route path="/play" element={<Play />} />
          <Route path="/head_or_tail" element={<Head />} />
          <Route path="/toss" element={<CoinToss />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
