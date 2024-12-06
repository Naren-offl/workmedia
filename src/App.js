import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import Signin from './components/Signin';
import Connection from './components/Connection';
import Invitation from './components/Invitation';
import Network from './components/Network';
import Message from './components/Message';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Signin/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/connect' element={<Connection/>}/>
        <Route path='/invite' element={<Invitation/>}/>
        <Route path='/network' element={<Network/>}/>
        <Route path='/message' element={<Message/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
