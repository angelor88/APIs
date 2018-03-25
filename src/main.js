import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import './../.env';
const apiKey = process.env.exports.apiKey;

$(document).ready(function() {
  $('#issueOutput').submit(function(event) {
    event.preventDefault();
    let issue= $('#issue').val();
    $('#issue').val("");

    $.ajax({
      url:
      `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=47.6062%2C-122.3321%2C100&user_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        if(response.data.length === 0){
          $('#showList').text(`Sorry, there are no doctors that meet your search criteria`)
        }else{
          for(let i = 0; i < response.data.length; i++){

            $('#showList').append(`<p><strong>${response.data[i].profile.first_name} ${response.data[i].profile.last_name}</strong></p>`);
          }
        }
      },
      error: function(request, status, error) {

        $('#errors').text("There was an error processing your request. Please try again.")
      }
      });

      $('#doctorOutput').submit(function(event) {
      event.preventDefault();

      let doctorName = $('#doctorName').val();
      $('#doctorName').val("");

      $.ajax({
        url:
        `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=47.6062%2C-122.3321%2C100&user_key=${apiKey}`,
        type: 'GET',
        data: {
          format: 'json'
        },
        success: function(response) {
          if(response.data.length === 0){
            $('#showDetails').text(`Sorry, there are no doctors that meet your search criteria`)
          }else{

          for(let i = 0; i < response.data.length; i++){

            $('#showDetails').append(`<p><strong>Doctor's name:</strong> ${response.data[i].profile.first_name} ${response.data[i].profile.last_name}</p>
            <p><strong>Address: </strong>${response.data[i].practices[0].visit_address.street},   ${response.data[i].practices[0].visit_address.city}, ${response.data[i].practices[0].visit_address.state} ${response.data[i].practices[0].visit_address.zip}</p>
            <p><strong>Phone:</strong> ${response.data[i].practices[0].phones[0].number}</p> <p><strong>Website:</strong> ${response.data[i].practices[0].website}</p> <p><strong>Accepts new patients:</strong> ${response.data[i].practices[0].accepts_new_patients}</p>`);

}
          }
        },
        error: function(request, status, error) {

          $('#errors').text("There was an error processing your request. Please try again.")
        }
      });
    });
  });
});
