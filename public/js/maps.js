function initialize() {
  var propertiPeta = {
    center: new google.maps.LatLng(0.7465876865507393, 124.321043577133),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  var peta = new google.maps.Map(document.getElementById("googleMap"), propertiPeta);

  // membuat Marker
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(0.7465876865507393, 124.321043577133),
    map: peta,
    animation: google.maps.Animation.BOUNCE,
  });
}

// event jendela di-load
google.maps.event.addDomListener(window, "load", initialize);
