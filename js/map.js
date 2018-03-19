
  var markers=[
  {"lat":35.6432027,"lng":139.6729435},
  {"lat":35.5279833,"lng":139.6989209},
  {"lat":35.6563623,"lng":139.7215211},
  {"lat":35.6167531,"lng":139.5469376},
  {"lat":35.6950961,"lng":139.5037899}
];


const MapProvider = {
  template: "<div><slot /></div>",
  props: {
    google: Object,
    map: Object
  },
  created: function() {
      console.log("google and map in MapProvider");
      console.log(this.google);
      console.log(this.map);
  },
  provide() {
    return {
      google: this.google,
      map: this.map
    };
  }
};

const MapLoader = {
  template:
    '<div><div id="map"></div><template v-if="!!this.google && !!this.map"><map-provider :google="google" :map="map"><slot/></map-provider></template></div>',
  props: {
    mapConfig: Object,
    apiKey: String
  },
  components: {
    MapProvider
  },
  data() {
    return {
      google: null,
      map: null
    };
  },
  created: function() {
    console.log("MapLoader");
    console.log(this.mapConfig);
    console.log(this.apiKey);
 },
  mounted() {
    googleMapsApiLoader({
      apiKey: this.apiKey
    }).then(google => {
      this.google = google;
      this.initializeMap();
    });
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$el.querySelector("#map");
      const { Map } = this.google.maps;
      console.log(mapContainer);
      this.map = new Map(mapContainer, this.mapConfig);
      console.log(this.map);
    }
  }
};

const ChildMarker = {
  inject: ["google", "map"],
  props: {
    position: Object
  },
  data() {
    return { marker: null };
  },
  created: function() {
    console.log("ChildMarker");
    console.log(this.google);
    console.log(this.map);
    console.log(this.position);
 },
  mounted() {
    console.log("ChildMarker");
    const { Marker } = this.google.maps;
    this.marker = new Marker({
      position: this.position,
      map: this.map,
      title: "Child marker!"
    });
  }
};

//Vue.component("futurpreneur-map", {
const FuturpreneurMap = {
  template:
    '<map-loader :map-config="mapConfig" apiKey=\"AIzaSyAM2AtsJrwb3Q9pxirJjv2OVl-V-6Lv1hY\"><template v-for="marker in markers"><child-marker :position="marker" /></template></map-loader>',
  /*props: {
    markers: Array
  },*/
  created: function() {
    console.log("google and map in FuturpreneurMap");
    console.log(markers);
    console.log(this.mapConfig);;
 },
  data() {
    return {
      mapConfig: {
        zoom: 12,
        center: markers[0]
      }
    };
  },
  components: {
    MapLoader,
    ChildMarker
  }
};//);

/**
 * urlBuilder
 *
 * @param  {object} params
 * @param  {string} params.base       the base url
 * @param  {array}  params.libraries  an array of the libraries to be requested
 * @param  {string} params.callback   the callback function
 *
 * @return {string}
 */
function urlBuilder(params) {
  var builtUrl = params.base;

  builtUrl += "?";

  if (params.apiKey) {
    builtUrl += "key=" + params.apiKey + "&";
  }

  if (params.client) {
    builtUrl += "client=" + params.client + "&";
  }

  if (params.libraries.length > 0) {
    builtUrl += "libraries=";

    params.libraries.forEach(function(library, index) {
      builtUrl += library;

      if (index !== params.libraries.length - 1) {
        builtUrl += ",";
      }
    });

    builtUrl += "&";
  }

  if (params.language) {
    builtUrl += "language=" + params.language + "&";
  }

  if (params.version) {
    builtUrl += "v=" + params.version + "&";
  }

  builtUrl += "callback=" + params.callback;

  return builtUrl;
}

var googleApi;

function loadAutoCompleteAPI(params) {

  var script = document.createElement("script");

  script.type = "text/javascript";

  script.src = urlBuilder({
    base: "https://maps.googleapis.com/maps/api/js",
    libraries: params.libraries || [],
    callback: "googleMapsAutoCompleteAPILoad",
    apiKey: params.apiKey,
    client: params.client,
    language: params.language,
    version: params.version
  });
  console.log(script.src);
  console.log(script);
  document.querySelector("head").appendChild(script);

}

/**
 * googleMapsApiLoader
 *
 * @param  {object} params
 * @param  {object} params.libraries
 *
 * @return {promise}
 */
function googleMapsApiLoader(params) {
  if (googleApi) {
    return Promise.resolve(googleApi);
  }

  return new Promise(function(resolve, reject) {
    loadAutoCompleteAPI(params);

    window.googleMapsAutoCompleteAPILoad = function() {
      googleApi = window.google;
      console.log("googleMapsAutoCompleteAPILoad");
      console.log(googleApi);
      resolve(googleApi);
    };

    setTimeout(function() {
      if (!window.google) {
        reject(new Error("Loading took too long"));
      }
    }, 5000);
  });
}
