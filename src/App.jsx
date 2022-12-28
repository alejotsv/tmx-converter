import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Uploader from './components/Uploader';
import Instructions from './components/Instructions';

const App = () => {
  return(
    <div className='main-app'>
      <Instructions />
      <Uploader />
    </div>
  )
}

export default App;