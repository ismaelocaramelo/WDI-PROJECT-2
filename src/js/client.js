const googleMap = googleMap || {};
const google = google;



googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getChargeSpots();
};

googleMap.getChargeSpots = function() {
  $.get('http://localhost:3000/api/chargespots').done(this.loopThroughChargeSpots);
};

googleMap.loopThroughChargeSpots = function(spots) {
  $.each(spots, (index, spot) => {
    console.log(spot);
    setTimeout(() => {
      googleMap.createMarkerForChargeSpots(spot);
    }, index * 200);
  });
};


googleMap.createMarkerForChargeSpots = function(spot) {
  for (var i = 0; i < spot.length; i++) {
    const latlng = new google.maps.LatLng(spot[i].Latitude, spot[i].Longitude);
    const marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      icon: '/images/marker.png',
      animation: google.maps.Animation.DROP
    });
    this.addInfoWindowForChargeSpots(spot, marker);
  }
};

googleMap.addInfoWindowForChargeSpots = function(spot, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({

      content: $.each((i, spot) => {
        `${ spot.name[i] }<br>${ spot.PostTown[i]}<br>${spot.Connector[i]}<br> ${spot.PaymentRequiredFlag[i]}<br>${spot.SubscriptionRequiredFlag[i]}`;
      })
    });
    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
  });
};

$(googleMap.mapSetup.bind(googleMap));
