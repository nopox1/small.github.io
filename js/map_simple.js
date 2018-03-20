const FuturpreneurMap = {
  template: '<div id="myMap"></div>',
  data: function() {
    return {
      markerDetailes: [
        {
          latitude: 53.1304,
          longitude: -106.3468,
          place_id: "",
          formatted_address: "Canada",
          name: ""
        }
      ],
      map: null,
      bounds: null,
      markers: []
    };
  },
  watch: {
    // whenever markerCoordinates changes, this function will run
    markerDetailes: function() {
      console.log("Waiting for markers loading...");
      console.log(this.markerDetailes.length);
      this.markerDetailes.forEach(place => {
        var infowindow = new google.maps.InfoWindow();
        const position = new google.maps.LatLng(
          place.latitude,
          place.longitude
        );
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          title: "Click to view detailes"
        });
        google.maps.event.addListener(marker, "click", function() {
          infowindow.setContent(
            "<div><strong>" +
              place.name +
              "</strong><br>" +
              "Address: " +
              place.formatted_address +
              "</div>"
          );
          infowindow.open(this.map, this);
        });
        this.markers.push(marker);
        //this.map.fitBounds(this.bounds.extend(position));
        this.bounds.extend(position);
      });
      const mapCentre = this.markerDetailes[0];
      const center = {
        lat: parseFloat(mapCentre.latitude),
        lng: parseFloat(mapCentre.longitude)
    };
    this.map.fitBounds(this.bounds);
     /* console.log(center);
      //center the map to a specific spot (city)
      this.map.setCenter(center);
      console.log(this.map.getCenter());
      //center the map to the geometric center of all markers
      this.map.setCenter(this.bounds.getCenter());
      console.log(this.bounds.getCenter());
      */
     
     /*google.maps.event.addListenerOnce(this.map, 'bounds_changed', function(event) {
        console.log(this);
        this.setZoom(this.getZoom() - 1);
      
        if (this.getZoom() > 15) {
          this.setZoom(15);
        }
      });*/
      google.maps.event.addListener(this.map, 'zoom_changed', function () {
        console.log("zoom_changed");
        var z = this.getZoom();
        //this.setZoom(this.getZoom() - 1);
        console.log(z);
    });
    var listener = google.maps.event.addListener(this.map, 'idle', function () {
        console.log("idle");
        var z = this.getZoom();
        if (this.getZoom()) { // or set a minimum
            this.setZoom(4); // set zoom here
            console.log(4);
        }
        else{
            this.setZoom(3); 
            console.log("else");
        }
        google.maps.event.removeListener(listener); 
        console.log(z);
    });
     /* this.map.fitBounds(this.bounds);
      var listener = google.maps.event.addListener(this.map, "idle", function() { 
          console.log(this);
          console.log(thiss.getZoom());
        if (map.getZoom() > 16) map.setZoom(16); 
        google.maps.event.removeListener(listener); 
      });*/
      //remove one zoom level to ensure no marker is on the edge.
      //this.map.setZoom(this.map.getZoom() - 1);
    
    }
  },
  created: function() {
    console.log("created");
    getLocationFromJson(this.markerDetailes);
  },
  mounted: function() {
    console.log("mounted");
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById("myMap");
    const mapCentre = this.markerDetailes[0];
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    };
    this.map = new google.maps.Map(element, options);
  }
};

google.load("visualization", "1", {
  packages: ["table"]
});

function getLocationFromJson(markerDetailes) {
  $.getJSON("data/future.json", function(data) {
    //var map = new google.visualization.DataTable();
    //map.addRows(data.length);
    //map.addColumn('string', 'Adress');
    // build the map data, loop over each result
    $.each(data, function(i, v) {
      const marker = {
        latitude: "",
        longitude: "",
        place_id: "",
        formatted_address: "",
        name
      };
      marker.longitude = v.longitude;
      marker.latitude = v.latitude;
      marker.place_id = v.place_id;
      marker.formatted_address = v.formatted_address;
      marker.name = v.Partners;
      markerDetailes.push(marker);
    });
  });
}
