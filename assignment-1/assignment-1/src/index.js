/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Margarita Selenko  Student ID: 147393169  Date: 5/17/19
 *
 *
 ********************************************************************************/

$(document).ready(function() {
    $('.dropdown-menu>li>a').click(function(event) {
        var href = $(this).attr('href');
        var name = $(this).text();
        event.preventDefault();
        isSession(href, name);
    });
});

function isSession(href, name) {
    $.ajax({
        type: 'GET',
        url: href,
        success: function(data) {
            $('#data').empty();
            $('#data')
                .append('<h3>' + name + '</h3>')
                .append(prettyPrintJson.toHtml(data));
        },
        error: function() {
            console.log('Error occured');
        }
    });
}
