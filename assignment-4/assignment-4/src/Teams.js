import React, { Component } from 'react';
import MainContainer from './MainContainer.js'

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        fetch('https://desolate-sierra-97521.herokuapp.com/teams')
            .then(response => response.json())
            .then(data => this.setState({ teams: data }));
    }

    render() {
        return (
            <MainContainer sidebar='Teams'>
                <h1 className="page-header">Teams</h1>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Projects</th>
                                <th>Employees</th>
                                <th>Team Lead</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.teams.map(function (team, index) {
                                return (
                                    <tr key={index}>
                                        <td>{team.TeamName}</td>
                                        <td>
                                            <ul>
                                                {team.Projects.map(function (project, index) {
                                                    return (<li key={index}>{project.ProjectName}</li>);
                                                })}
                                            </ul>
                                        </td>
                                        <td>{team.Employees.length} Employees</td>
                                        <td>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </ MainContainer>
        );
    }
}

export default Teams;