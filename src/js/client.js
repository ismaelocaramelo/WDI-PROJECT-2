const googleMap = googleMap || {};
const $ = $;
const google = google;

const markers = [];


googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getChargeSpots();
  this.initMarkes();
};

googleMap.getChargeSpots = function(param) {
  param = param || ''; // if it's undefined, param = '' ,if not param = param
  param = (param === '') ? '' : `/${param}`; // if param has value we include a '/'
  $.get(`http://localhost:3000/api/chargespots${param}`).done(this.loopThroughChargeSpots);
};


googleMap.loopThroughChargeSpots = function(spots) {
  googleMap.clearMarkers();
  $.each(spots, (index, spot) => {
    setTimeout(() => {
      googleMap.createMarkerForChargeSpots(spot);
    },500);
  });
};


googleMap.createMarkerForChargeSpots = function(spot) {
  const latlng = new google.maps.LatLng(spot.Latitude, spot.Longitude);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });
  markers.push(marker);
  googleMap.addInfoWindowForChargeSpots(spot, marker);
};


googleMap.addInfoWindowForChargeSpots = function(spot, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    let infoConnector = '';
    const regex = /(.*)(Type 2|3-pin|DC)(.*)/g;
    let m = '';

    for (var i = 0; i < spot.Connector.length; i++){
      if((m = regex.exec(spot.Connector[i].ConnectorType)) !== null){
        const status = spot.Connector[i].ChargePointStatus.replace('In service', 'available').replace('Out of service', 'unavailable');
        infoConnector += `<span class="infoConnector">${m[2]} &nbsp;&nbsp;&nbsp;&nbsp; <span class="${status}" >${status}</span></span><br>`;
      }
    }
    let iconFee = '<img class="icon-info" title="FREE" src="../images/free.png">';
    let iconSubs = '';
    if (spot.PaymentRequiredFlag) {
      iconFee = '<img class="icon-info" title="FEE" src="../images/pound.png">';
    }
    if (spot.SubscriptionRequiredFlag) {
      iconSubs = '<img class="icon-info" title="You need subscription" src="../images/subscription.png">';
    }

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class="container-infowindow">
                  <span class="spot-name">${spot.name}</span><br>
                  <span class="spot-PostTown">${spot.PostTown}</span><br>
                  <span class="spot-infoConnector">${infoConnector}</span><br>
                  ${iconFee} ${iconSubs}
                </div>`
    });
    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
  });
};


googleMap.clearMarkers = function(){
  for(let i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
};

//Tengo que hacer una funcion para cada button y selecion el right marker entonces al iniciar el mapa espero a que marque el boton

googleMap.initMarkes = function() {
  $('.S').on('click', () => {
    this.getChargeSpots('S');
  });
  $('.F').on('click',() => {
    this.getChargeSpots('F');
  });
  $('.AC').on('click',() => {
    this.getChargeSpots('AC');
  });
  $('.DC').on('click', () => {
    this.getChargeSpots('DC');
  });
};


$(googleMap.mapSetup.bind(googleMap));
