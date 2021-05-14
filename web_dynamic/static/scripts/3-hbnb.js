$(document).ready(() => {
  const checklist = {};
  $('INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      checklist[key] = value;
    }
    if (!$(this).is(':checked')) {
      delete checklist[$(this).attr('data-id')];
    }
  });

  $.get('http://0.0.0.0:1107/api/v1/status', data => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}'})
  .done(function (data) {
      for (let obj of data) {
	   $('.places').append(obj.name);
      }
  }
);
