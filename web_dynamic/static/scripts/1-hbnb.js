$(document).ready(() => {
  const checklist = {};
  let amen = [];
  $('INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      checklist[key] = value;
     // list.push(value);
     // $('div.amenities h4').html(list.join(', '));
    }
    if (!$(this).is(':checked')) {
      delete checklist[$(this).attr('data-id')];
    }
    amen = Object.values(checklist);
    $('.amenities h4').text(amen.join(', '));
  });
});
