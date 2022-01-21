import logo from './logo.svg';
import './App.css';
import EndpointOne from './components/EndpointOne';
import { Ajax } from "react-superagent";
import DoughnutTable from './components/DoughnutTable';
import React from 'react';


class App extends React.Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
            <div className="medium1">
            <div className="rectangle1">
            <div className="rectangle2"></div >
            <button className="BTButton"><span className="textHolder">View Photos</span></button>
            </div>
            </div>
          <div className="medium2">
            <DoughnutTable />
          </div>
          <div className="medium3">
          </div>
        </header>
      </div>
    );
  }
}

export default App;
// thebteam.free.beeceptor.com/data
{/* <Ajax url='https://google.com' method='get' send={{some: 'data'}}>{
            ({error, response, done}) => !done ?
            <div>loading...</div> :
            <div>loaded! {JSON.stringify(response)}</div>
          }</Ajax> */}
