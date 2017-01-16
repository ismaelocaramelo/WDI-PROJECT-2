"use strict";var googleMap=googleMap||{},$=$,google=google,markers=[];googleMap.mapSetup=function(){var o=document.getElementById("map-canvas"),e={zoom:7,minZoom:7,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0,disableDoubleClickZoom:!1,mapTypeControl:!1,scaleControl:!1,navigationControl:!1,streetViewControl:!1};this.map=new google.maps.Map(o,e),this.getChargeSpots(),this.initMarkes()},googleMap.getChargeSpots=function(o){o=o||"",o=""===o?"":"/"+o,$.get("http://localhost:3000/api/chargespots"+o).done(this.loopThroughChargeSpots),this.clearInputPostCode()},googleMap.loopThroughChargeSpots=function(o){googleMap.clearMarkers(),$.each(o,function(o,e){setTimeout(function(){googleMap.createMarkerForChargeSpots(e)},500)})},googleMap.createMarkerForChargeSpots=function(o){var e=new google.maps.LatLng(o.Latitude,o.Longitude),n=new google.maps.Marker({position:e,map:this.map,icon:"/images/marker.png",animation:google.maps.Animation.DROP});markers.push(n),googleMap.addInfoWindowForChargeSpots(o,n)},googleMap.addInfoWindowForChargeSpots=function(o,e){var n=this;google.maps.event.addListener(e,"click",function(){"undefined"!=typeof n.infoWindow&&n.infoWindow.close();for(var a="",t=/(.*)(Type 2|3-pin|DC)(.*)/g,s="",i=0;i<o.Connector.length;i++)if(null!==(s=t.exec(o.Connector[i].ConnectorType))){var r=o.Connector[i].ChargePointStatus.replace("In service","available").replace("Out of service","unavailable");a+='<span class="infoConnector"><span class="type-connector">'+s[2]+'</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="'+r+'" >'+r+"</span></span><br>"}var p='<img class="icon-info" title="FREE" src="../images/free.png">',g="";o.PaymentRequiredFlag&&(p='<img class="icon-info" title="FEE" src="../images/pound.png">'),o.SubscriptionRequiredFlag&&(g='<img class="icon-info" title="You need subscription" src="../images/subscription.png">');var l=n;n.getUserInfo(function(n){var t="heart",s="add",i=o._id;console.log(n),n.favourites&&n.favourites.indexOf(i)!==-1&&(s="remove",t="red-heart"),l.infoWindow=new google.maps.InfoWindow({content:'<div class="container-infowindow">\n          <span class="spot-name">'+o.name+'</span><br>\n          <span class="spot-PostTown">'+o.PostTown+'</span><br>\n          <span class="spot-infoConnector">'+a+"</span><br>\n          "+p+" "+g+'\n          <span class="user_favourite '+t+"\" data-id='"+i+"' data-action='"+s+"'></span>\n        </div>"}),l.infoWindow.open(l.map,e),l.map.setCenter(e.getPosition()),l.map.setZoom(15)})})},googleMap.clearMarkers=function(){for(var o=0;o<markers.length;o++)markers[o].setMap(null)},googleMap.initMarkes=function(){var o=this;$(".S").on("click",function(){o.getChargeSpots("S")}),$(".F").on("click",function(){o.getChargeSpots("F")}),$(".AC").on("click",function(){o.getChargeSpots("AC")}),$(".DC").on("click",function(){o.getChargeSpots("DC")}),this.$header=$("header"),this.$header.on("submit","form",this.findPostCode)},googleMap.findPostCode=function(o){o&&o.preventDefault();var e="http://localhost:3000/api/chargespots/postcode",n="POST",a=$(this).serialize();$.ajax({url:e,method:n,data:a}).done(googleMap.loopThroughChargeSpots)},googleMap.clearInputPostCode=function(){$(".inputPostCode").val("")},googleMap.getUserInfo=function(o){$.ajax({url:"http://localhost:3000/users/token",beforeSend:function(o){setRequestHeader(o)}}).done(function(e){o(e)})},$(googleMap.mapSetup.bind(googleMap));