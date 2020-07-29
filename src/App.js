import React from 'react';
import './App.css';
import './assets/styles/style.scss';
import MainPage from './components/mainPage';


function App(props) {

  console.log('propsApp: ',props)
  return (
    <MainPage sina={'hi sinaaaa'}/>
  );
}

export default App;
