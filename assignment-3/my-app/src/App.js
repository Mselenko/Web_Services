import React, { Component } from 'react';
import Navbar from './Navbar';
import Panel from './Panel';


class App extends Component {
  constructor() {
    super();

    this.state = {
      Teams: [],
      Employees: [],
      Projects: [],
      Ready: false
    };
  }

  componentDidMount() {
    const that = this;

    const url = 'https://desolate-sierra-97521.herokuapp.com/';

    fetch(url + 'teams-raw')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        that.setState({ Teams: data});
        return fetch(url + 'employees')
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        that.setState({ Employees: data });
        return fetch(url + 'projects')
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        that.setState({ Projects: data });
        that.setState({Ready: true})
      })
      .catch(function (error) {
        console.log('Requestfailed', error)
      });

  }

  render() {
    return (
      <div>

        <Navbar title="Assignment 3 - Team Details" />

        <div className="container">
          <div className="row">
         
               {this.state.Ready ? 
               this.state.Teams.map( team =>
                <Panel
                    key={team._id}
                    Team={team}
                    Employees={this.state.Employees}
                    Projects={this.state.Projects}
                />) 
                :( 
                  <div>
                  </div>
                  )
              }


          </div>
        </div>
      </div>
    );
  }
}

export default App; 