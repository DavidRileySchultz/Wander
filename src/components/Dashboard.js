import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import DisplayEntries from './_journal/DisplayEntries';
import NavBar from './NavBar';
import SimpleMap from './_journal/SimpleMap';
import api from '../api.js';
import auth from '../auth.js';
import GroupContent from './_group/GroupContent';
import WriteEntry from './_journal/WriteEntry';
import styled, { css } from 'styled-components';
import { Header, Button } from 'semantic-ui-react';
import ReadEntry from './_journal/ReadEntry';
import EditEntry from './_journal/EditEntry';
import { userId, firebaseAuth } from '../firebase.js'

const MainWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 67%;
  font-family: Barlow Semi Condensed;
  font-size: 1.02em;
`;

const SideBarChoices = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  padding-top: 0.59em;
  align-items: center;
`;

const Options = styled.span`
  padding: 0.7rem;
  color: rgb(47,67,88);
  display: inline-block;
  &:hover {
    display: inline-block;
  }
`;

const sidebarActiveStyles = css`
  background: rgba(143,159,178,.7);
  transform: scale(1.2);
  & > span{
    color: #fdfbf9;
  }
`;

const SidebarLink = styled.div`
  border-radius: 0.35rem;
  &:hover {
    ${sidebarActiveStyles};
  }
  ${props => props.isActive && css`
      ${sidebarActiveStyles};
  `};
`;

const ContentWrapper = styled.div`
  left: 18%;
  position: absolute;
  width: 77%;
  height: 100%;
  display: grid;
  margin-top: 3.5%;
  padding: 0 0 3rem 0;
`;

const NavHeader = styled(Header)`
  &&& {
    margin: 0;
    font-family: Barlow Semi Condensed;
    font-size: 1.85714em;
    font-weight: 400;
  
  }
`;

const NavButton = styled(Button)`
  && {
  padding: 10px;
  margin-left: 8px;
  background-color: #7e7c88;
  color: rgb(246, 244, 244);
  }
`;

const ResultsHeader = props => {
    let currentPeriod =
      props.currentPeriod === 1
        ? 'day'
        : props.currentPeriod === 7
          ? 'week'
          : props.currentPeriod === 10
            ? '10 days'
            : props.currentPeriod === 30
              ? 'month'
              : props.currentPeriod === 90
                ? '3 months'
                : props.currentPeriod === 180
                  ? '6 months'
                  : props.currentPeriod === 365 ? 'year' : null;
  
    let currentSearch = props.currentSearchTerm ? props.currentSearchTerm : null;
  
    let periodText = currentPeriod
      ? `Showing entries from the past ${currentPeriod}`
      : null;
    let searchText = currentSearch
      ? `Showing entries matching "${currentSearch}"`
      : null;
    let periodAndSearchText =
      currentPeriod && currentSearch
        ? `Showing entries matching "${currentSearch}" in the past ${
            currentPeriod
          }`
        : null;
    let genericText = `Showing all entries`;
    return (
      <NavHeader>
        {periodAndSearchText
          ? periodAndSearchText
          : periodText ? periodText : searchText ? searchText : genericText}
        {periodAndSearchText||periodText||searchText?<NavButton onClick={props.searchReset}>reset</NavButton>:null}
      </NavHeader>
    );
  };

  class Dashboard extends Component {
    constructor() {
      super();
      this.state = {
        userObj: {},
        entries: [],
        geotaggedEntries: [],
        searchPeriod: '',
        currentPeriod: 7,
        searchTerm: '',
        currentSearchTerm: ''
      };
    }
  
    componentDidMount() {
      this.loadEntries();
      const userObj = firebaseAuth;
      console.log("USEROBJ ", userObj);
      this.setState({ userObj });
    }
  
    loadEntries = () => {
      api
        .requestEntries(
          this.state.searchPeriod,
          this.state.searchTerm
        )
        .then(reply => {
          let entriesObject = reply.val() || {}
          let entries = []
          Object.keys(entriesObject).map((key, index) => {
            console.log(entriesObject, "Entry object")
            entries[index] = entriesObject[key].entryDataObj
            entries[index].id = key
          })
          this.setState({ 
            entries: reply.val() || {},
            currentPeriod: this.state.searchPeriod,
            currentSearchTerm: this.state.searchTerm,
            geotaggedEntries: entries
          })    }   
        ); 
    };
  
    handleClick = () => {
      this.loadEntries();      
    };
    
    searchReset = () => {
      this.setState(
        {
          searchPeriod: '',
          searchTerm: ''
        },
        this.loadEntries
      );
    };
  
    render() {
      return (
        <div className="dashboard">
          <NavBar
            hist={this.props.history}
            updateSearchTerm={searchTerm => this.setState({ searchTerm })}
            updatePeriod={searchPeriod => this.setState({ searchPeriod })}
            searchTermValue={this.state.searchTerm}
            periodValue={this.state.searchPeriod}
            handleClick={this.handleClick}
            resultsHeader={
              <ResultsHeader
                currentSearchTerm={this.state.currentSearchTerm}
                currentPeriod={this.state.currentPeriod}
                searchReset={this.searchReset}
              />
            }
          />
          <MainWrapper>
          <div
            className="side-bar-wrapper"
            style={{ position: 'fixed', width: 12 + '%', left: '3%', display:'flex', height: '400px' }}
          >
            <SideBarChoices>
              <Link to="/dashboard/entries" style={{ textDecoration: 'none' }}>
                <SidebarLink isActive={this.props.page === 'entries'}>
                  <Options>Entries</Options>
                </SidebarLink>
              </Link>
              <Link to="/dashboard/groups" style={{ textDecoration: 'none' }}>
                <SidebarLink isActive={this.props.page === 'groups'}>
                  <Options>Group</Options>
                </SidebarLink>
              </Link>
              <Link to="/dashboard/map" style={{ textDecoration: 'none' }}>
                <SidebarLink isActive={this.props.page === 'map'}>
                  <Options>Map</Options>
                </SidebarLink>
              </Link>
            </SideBarChoices>
          </div>
          <ContentWrapper>
            <Route
              exact
              path={`/dashboard`}
              render={() => {
                return <DisplayEntries entries={this.state.entries} />;
              }}
            />
            <Route
              path={`/dashboard/entries`}
              render={() => {
                return <DisplayEntries entries={this.state.entries} />;
              }}
            />            
            <Route
              path={`/dashboard/map`}
              render={() => {
                let reversedGeotaggedEntries = [...this.state.geotaggedEntries].reverse()
                return (
                  <SimpleMap geotaggedEntries={reversedGeotaggedEntries} />
                );
              }}
            />
            <Route
              path={`/dashboard/groups`}
              render={() => {
                return <GroupContent />;
              }}
              />
            <Route
              path={`/dashboard/writeentry`}
              render={() => {
                return (
                  <WriteEntry
                    history={this.props.history}
                    reloadEntries={this.loadEntries}
                  />
                );
              }}
            />
             <Route
              path={`/dashboard/editentry/:id`}
              render={props => {
                return <EditEntry {...props} reloadEntries={this.loadEntries} history={this.props.history} />;
              }}
            />
            <Route
              path={`/dashboard/readentry/:id`}
              render={props => {
                return <ReadEntry {...props} history={this.props.history} />;
              }}
            />

          </ContentWrapper>
        </MainWrapper>
      </div>
    );
  }
}

export default Dashboard;  