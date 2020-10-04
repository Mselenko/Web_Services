import React, { Component } from 'react';
import moment from 'moment';
import MainContainer from './MainContainer.js'

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        fetch('https://desolate-sierra-97521.herokuapp.com/employees')
            .then(response => response.json())
            .then(data => this.setState({ employees: data }));
    }

    render() {
        return (
            <MainContainer sidebar='Employees'>
                <h1 className="page-header">Employees</h1>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name & Position</th>
                                <th>Address</th>
                                <th>Phone Num</th>
                                <th>Hire Date</th>
                                <th>Salary Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(function (employee, index) {
                                return (
                                    <tr key={index}>
                                        <td>{employee.FirstName} {employee.FirstName} - {employee.Position.PositionName}</td>
                                        <td>{employee.AddressStreet}, {employee.AddressCity} {employee.AddressState}, {employee.AddressZip}</td>
                                        <td>{employee.PhoneNum} ext:{employee.Extension}</td>
                                        <td>{moment(employee.HireDate).utc().format('LL')}</td>
                                        <td>${employee.SalaryBonus}</td>
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

export default Employees;