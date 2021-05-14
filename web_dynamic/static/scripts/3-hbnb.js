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
  $.each(data, function (index, place) {
    const str =
    `<article>
	  <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
	  </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
    $('section.places').append(str);
  });
  }
);
