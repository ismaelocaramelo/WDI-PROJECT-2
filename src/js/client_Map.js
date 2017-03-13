const googleMap = googleMap || {};
const $ = $;
const google = google;
const url = window.location.origin;


const markers = [];


googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 7,
    minZoom: 7  ,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true, //desactivate controls interface
    disableDoubleClickZoom: false, //desactivate dobleClick
    mapTypeControl: false, //desactivate map controls
    scaleControl: false, //desactivate zoom controls
    navigationControl: false, //desactivate navigation Control
    streetViewControl: false //desactivate street-View
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getChargeSpots();
  this.initMarkes();
};

googleMap.getChargeSpots = function(param) {
  param = param || ''; // if it's undefined, param = '' ,if not param = param
  param = (param === '') ? '' : `/${param}`; // if param has value we include a '/'
  $.get(`${url}/api/chargespots${param}`).done(this.loopThroughChargeSpots);
  this.clearInputPostCode();
};


googleMap.loopThroughChargeSpots = function(spots) {
  googleMap.clearMarkers();
  googleMap.map.setZoom(7);
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
        infoConnector += `<span class="infoConnector"><span class="type-connector">${m[2]}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="${status}" >${status}</span></span><br>`;
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
    const that = this;
    this.getUserInfo((output) => {
      let fav = 'heart';
      let action = 'add';
      const spotId = spot._id;
      if(output.favourites && output.favourites.indexOf(spotId) !== -1){ // without checking that output.favourites has value, indexOf will be no readable for the wonderful browser
        action = 'remove';
        fav = 'red-heart';
      }
      that.infoWindow = new google.maps.InfoWindow({
        content: `<div class="container-infowindow">
          <span class="spot-name">${spot.name}</span><br>
          <span class="spot-PostTown">${spot.PostTown}</span><br>
          <span class="spot-infoConnector">${infoConnector}</span><br>
          ${iconFee} ${iconSubs}
          <span class="user_favourite ${fav}" data-id='${spotId}' data-action='${action}'></span>
        </div>`
      });
      that.infoWindow.open(that.map, marker);
      that.map.setCenter(marker.getPosition());
      that.map.setZoom(10);
    });
  });
};

googleMap.clearMarkers = function(){
  for(let i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
};

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
  this.$header = $('header');
  this.$header.on('submit', 'form', this.findPostCode);
};

googleMap.findPostCode = function(e){
  if(e) e.preventDefault();

  const url2 = `${url}/api/chargespots/postcode`;
  const method = 'POST';
  const data = $(this).serialize();
  $.ajax({
    url: url2,
    method,
    data
  })
  .done(googleMap.loopThroughChargeSpots);
};

googleMap.clearInputPostCode = function(){
  $('.inputPostCode').val('');
};

googleMap.getUserInfo = function(callback){
  $.ajax({
    url: `${url}/users/token`,
    beforeSend: (xhr) => {
      setRequestHeader(xhr);
    }
  }).done((data) => {
    callback(data);
  });
};


$(googleMap.mapSetup.bind(googleMap));
