const HowToOpen = {
  template: "#howtoopen-template",
  data() {
    return {
      e1: 0,
      appTitle: "HowToOpen"
    };
  }
};

const FuturpreneurList = {
  template: "#futurpreneur-template",
  data: function() {
    return {
      drawer: true,
      search: "",
      dialog: false,
      loading: true,
      headers: [
        {
          text: "Province",
          value: "Province",
          align: "center",
          width: "20%",
          filterable: { show: false }
        },
        {
          text: "Partner",
          value: "Partners",
          align: "center",
          width: "30%",
          filterable: { show: false }
        },
        {
          text: "Website",
          value: "WebsiteSupport",
          sortable: false,
          align: "center",
          width: "40%",
          filterable: { show: false }
        },
        {
          text: "Zip Code",
          value: "ZipCodes",
          align: "center",
          width: "10%",
          filterable: { show: false }
        }
      ],
      items: [],
      provinces: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Nova Scotia",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Northwest Territories",
        "Nunavut",
        "Yukon"
      ]
    };
  },
  methods: {
    getData: function() {
      var futureDataUrl = "data/future.json";
      var vm = this;
      vm.loading = true;
      $.get(
        futureDataUrl,
        function(data) {
          vm.items = data;
          console.log("loading futurpreneur");
        },
        "json"
      );
      vm.loading = false;
    }
  },
  created: function() {
    /*this.$http.get("https://www.reddit.com/r/"+ this.name +"/top.json?limit=5")
		        .then(function(resp){
		            if(typeof resp.data == 'string') {
		               resp.data = JSON.parse(resp.data);
		            }
		            this.posts=resp.data.data.children;
		        });*/
    this.getData();
  }
};
const CollaboratorsList = {
  template: "#collaborators-template",
  data: function() {
    return {
      drawer: null,
      search: "",
      headers: [
        {
          text: "Organization",
          value: "Organization",
          align: "center",
          width: "15%"
        },
        { text: "Province", value: "Province", align: "center", width: "12%" },
        {
          text: "Relevance",
          value: "Relevance",
          align: "center",
          width: "12%"
        },
        { text: "Branch", value: "Branch", align: "center", width: "12%" },
        {
          text: "Website Support",
          value: "WebsiteSupport",
          sortable: false,
          align: "center",
          width: "20%"
        },
        {
          text: "List of Services Provided",
          value: "ListofServicesProvided",
          sortable: false,
          align: "center",
          width: "29%"
        }
      ],
      items: []
    };
  },
  methods: {
    getData: function() {
      var futureDataUrl = "data/collaborators.json";
      var vm = this;
      $.get(
        futureDataUrl,
        function(data) {
          vm.items = data;
          console.log("loading collaborators");
        },
        "json"
      );
    }
  },
  created: function() {
    this.getData();
  }
};
const GovernmentList = {
  template: "#government-template",
  data: function() {
    return {
      drawer: null,
      search: "",
      headers: [
        {
          text: "Organization",
          value: "Organization",
          align: "center",
          width: "25%"
        },
        { text: "Province", value: "Province", align: "center", width: "12%" },
        {
          text: "Relevance",
          value: "Relevance",
          align: "center",
          width: "23%"
        },
        {
          text: "Website Support",
          value: "WebsiteSupport",
          sortable: false,
          align: "center",
          width: "30%"
        },
        { text: "Services", value: "Services", align: "center", width: "10%" }
      ],
      items: []
    };
  },
  methods: {
    getData: function() {
      var futureDataUrl = "data/grants.json";
      var vm = this;
      $.get(
        futureDataUrl,
        function(data) {
          vm.items = data;
          console.log("loading grants");
        },
        "json"
      );
    }
  },
  created: function() {
    this.getData();
  }
};
const NotFoundComponent = {
  template: "<div>Page not found - please check your URL</div>"
};
