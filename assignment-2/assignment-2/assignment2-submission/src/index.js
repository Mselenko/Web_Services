/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Margarita Selenko Student ID: 147393169 Date: 5/31/19
 *
 *
 ********************************************************************************/

// Import jQuery, which will also expose $ on the global `window` Object.
import $ from './jquery-es'; //??

// After jQuery is loaded, we can load the Bootstrap JS, which depends on jQuery.
import 'bootstrap';

// Place your imports for Moment.js and Lodash here...
import moment from 'moment';
import _ from 'lodash';
//const uniqueNumbers = uniq([1, 1, 1, 2, 3, 3]);

// The rest of your code can go here.  You're also welcome to split
// your code up into multiple files using ES modules and import/export.

$(function() {
  let employeesModel = [];
  initializeEmployeesModel();

  $('#employee-search').on('keyup', function() {
    refreshEmployeeRows(getFiltereEmployeesModel(this.value));
  });

  $(document.body).on('click', '.body-row', function() {
    let employee = getEmployeeModelById($(this).attr('data-id'));
    employee.HireDate = moment(employee.HireDate).format('LL');

    let modalTemplate = _.template(
      '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' +
        '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
        '<strong>Hire Date:</strong> <%- employee.HireDate %>'
    );

    let modalInfo = modalTemplate({ employee: employee });

    showGenericModal(employee.FirstName + ' ' + employee.LastName, modalInfo);
  });

  function initializeEmployeesModel() {
    $.ajax({
      url: 'https://desolate-sierra-97521.herokuapp.com/employees',
      type: 'GET',
      contentType: 'application/json'
    })
      .done(function(employees) {
        employeesModel = employees;
        refreshEmployeeRows(employeesModel);
      })
      .fail(function(err) {
        showGenericModal('Error', 'Unable to get Employees');
      });
  }

  function showGenericModal(title, message) {
    $('.modal-title')
      .empty()
      .append('<strong>' + title + '</strong>');
    $('.modal-body')
      .empty()
      .append(message);

    $('#genericModal').modal('show');
  }

  function refreshEmployeeRows(employees) {
    $('#employees-table').empty();

    let template = _.template(
      '<% _.forEach(employees, function(employee) { %>' +
        '<div class="row body-row" data-id="<%- employee._id %>">' +
        '<div class="col-xs-4 body-column"><%- _.escape(employee.FirstName) %></div>' +
        '<div class="col-xs-4 body-column"><%- _.escape(employee.LastName) %></div>' +
        '<div class="col-xs-4 body-column"><%- _.escape(employee.Position.PositionName) %></div>' +
        '</div>' +
        '<% }); %>'
    );

    $('#employees-table').append(template({ employees: employees }));
  }

  function getFiltereEmployeesModel(filterString) {
    let filteredEmployee = _.filter(employeesModel, employee => {
      return (
        employee.FirstName.toUpperCase().includes(filterString.toUpperCase()) ||
        employee.LastName.toUpperCase().includes(filterString.toUpperCase()) ||
        employee.Position.PositionName.toUpperCase().includes(filterString.toUpperCase())
      );
    });

    return filteredEmployee;
  }

  function getEmployeeModelById(id) {
    var empId = _.find(employeesModel, employee => {
      return employee._id == id ? _.cloneDeep(employee) : null;
    });

    return empId;
  }
});
