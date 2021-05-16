const checklist = {};

const checkAmenities = function () {
  let amen = [];
  $('.amenities INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      checklist[key] = value;
    }
    if (!$(this).is(':checked')) {
      delete checklist[$(this).attr('data-id')];
    }
    amen = Object.values(checklist);
    $('.amenities h4').text(amen.join(', '));
  });
};

const checkApiStatus = function () {
  $.get('http://0.0.0.0:5001/api/v1/status', data => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
};

const fetchPlaces = function (amenitiesFilter = {}) {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({ amenities: Object.keys(checklist), states: Object.keys(checkListStates) })
  }).done(function (data) {
      $('section.places').empty();
    $.each(data, function (index, place) {
      $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id, data => {
        const first = data.first_name;
        const last = data.last_name;
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
      <div class="user">
              <b>Owner:</b> ${first} ${last}
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
        $('section.places').append(str);
      });
    });
  });
};

const checkListStates = {};

const checkStates = function () {
  let states = [];
  $('.locations INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      checkListStates[key] = value;
    }
    if (!$(this).is(':checked')) {
      delete checkListStates[$(this).attr('data-id')];
    }
    states = Object.values(checkListStates);
    $('.locations h4').text(states.join(', '));
  });
};

/*
const fetchPlaces = function (amenitiesFilter = {}) {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({ amenities: Object.keys(checklist) })
  }).done(function (data) {})}
*/
$(() => {
  checkAmenities();
  checkStates();
  checkApiStatus();
  fetchPlaces(checklist);
  $('button').on('click', () => {
    fetchPlaces(checklist);
  });
});
