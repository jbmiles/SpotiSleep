function main() {
  $('.start').on('click', function() {
    var date = new Date();
    var hour = convertTo12(date.getHours());
    var minute = date.getMinutes();
    var time = $('#selectTime').val().slice(0, -2);
    var selectHour = time.split(':')[0];
    var selectMinute = time.split(':')[1];
    let timerHours = selectHour - hour > 0 ? selectHour - hour : 12 - (hour - selectHour);
    console.log(timerHours);
    let timerMinutes = minute - selectMinute;
    if (timerMinutes > 0) {
      timerMinutes = 60 + (selectMinute - minute);
      timerHours--;
    }
    console.log(timerHours + " " + timerMinutes);
    $('#timer').data('timer', timerHours*3600 + timerMinutes * 60);
    $.post("setTimer", { time: (timerHours * 3.6e6) + (timerMinutes * 60000)}, function() {
      $('.example').TimeCircles();
    })
  })
  $('#selectTime').timepicker({ 'scrollDefault': 'now', 'step': 60});
}

function convertTo12(hour) {
  if (hour > 12) {
    return hour - 12;
  }
  else if (hour === 0) {
    return 12;
  }
  return hour;
}
$(document).ready(main);
