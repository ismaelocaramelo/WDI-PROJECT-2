const googleMap = googleMap || {};
const google = google;



googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 9,
    center: new google.maps.LatLng(52.7612528,-6.8062276),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.chargePots();
};


googleMap.chargePots = function(){
  $.ajax({
    method: 'GET',
    url: 'http:localhost:3000/api/chargespots',
    dataType: 'json',
    cache: false
  }).done(data => {
    console.log(data);
  });
};

$(googleMap.mapSetup.bind(googleMap));
