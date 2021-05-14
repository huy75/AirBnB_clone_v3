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

  $.get('http://0.0.0.0:5001/api/v1/status', data => {
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
  data: '{}'
}).done(function (data) {
  $.each(data, function (index, p) {
    const str = '<article><div class=\'title_box\'><h2>' + p.name +
    '</h2><div class=\'price_by_night\'>' + p.price_by_night +
    '</div></div><div class=\'information\'><div class=\'max_guest\'>' +
    p.max_guest + ' Guests<br /><div class=\'number_rooms\'>' +
    '<br />' + p.number_rooms + ' Bedroom</div>' +
    '<div class=\'number_bathrooms\'><br />' +
    p.number_bathrooms + ' Bathroom</div><br />' +

    '</div><div class=\'description\'>' +
    p.description + '</div></article>';
    $('section.places').append(str);
  });
  }
);
//    '<div class=\'user\'><b> Owner </b> p.user.first_name + p.user.last_name
