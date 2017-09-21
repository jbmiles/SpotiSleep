function main() {
  $('.start').on('click', function() {
    var date = new Date();
    date = roundMinutes(date)
    var hour = date.getHours();
    var time = $('#selectTime').val().slice(0, -2);
    var selectHour = time.split(':')[0];
    let timerHours = selectHour - hour > 0 ? selectHour - hour : 12 - (hour - selectHour);
    console.log(timerHours);
    $('#timer').data('timer', timerHours*3600);
    $.post("setTimer", { time: timerHours * 3.6e6}, function() {
      $('.example').TimeCircles();
    })
  })
  $('#selectTime').timepicker({ 'scrollDefault': 'now', 'step': 60});
}

function roundMinutes(date) {

    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0);

    return date;
}

$(document).ready(main);
