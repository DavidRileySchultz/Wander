import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateAccount from './components/_register/CreateAccount';
import Login from './components/_login/Login';
import Dashboard from './components/Dashboard';
import WriteEntry from './components/_journal/WriteEntry';
import ReadEntry from './components/_journal/ReadEntry';
import SimpleMap from './components/_journal/SimpleMap';
import CreateGroup from './components/_group/CreateGroup';
import DisplayGroupEntries from './components/_groupJournal/DisplayGroupEntries';
import DisplayItineraries from './components/_itinerary/DisplayItineraries';
import CreateItinerary from './components/_itinerary/CreateItinerary';
import WriteGroupEntry from './components/_groupJournal/WriteGroupEntry';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route path="/createaccount" component={CreateAccount} />
          <Route path="/login" component={Login} />
          <Route exact path ="/dashboard" render={(props) => <Dashboard {...props} page={'entries'}/>} />
          <Route path="/dashboard/:page" render={(routeProps) => <Dashboard {...routeProps} page={routeProps.match.params.page}/>} />
          <Route path="/writeentry" component={WriteEntry} />
          <Route path="/readentry/:id" component={ReadEntry} />
          <Route path="/testingmap" component={SimpleMap} />
          <Route path="/groups" component={CreateGroup} />
          <Route path="/groupentries" component={DisplayGroupEntries} />
          <Route path="/itineraries" component={DisplayItineraries} />
          <Route path="/createitinerary" component={CreateItinerary} />
          <Route path="/writegroupentry" component={WriteGroupEntry} />
          <footer style={{display: 'block', position: 'fixed', bottom: '5px', left: '1%', 'fontfamily': 'Barlow Semi Condensed', 'fontsize': '1.2rem' }}>Riley Schultz</footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;