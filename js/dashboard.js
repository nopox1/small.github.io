google.load("visualization", "1", {
  packages: ["table", "corechart", "bar"]
});

const Dashboard = {
  template: "#home-template",
  data: function() {
    return {
      futureTable: null,
      grantsTable: null,
      totalAdditionalHelp: 0
    };
  },
  methods: {
    buildDashFromJson: function() {
      var futureDataUrl = "data/future.json";
      var grantsDataUrl = "data/grants.json";
      var provincesArray = [];
      $.get(
        futureDataUrl,
        function(data) {
          var future = new google.visualization.DataTable();
          console.log("Data loade " + data.length);
          this.totalAdditionalHelp = data.length;
          future.addColumn("string", "Province, Territory or Region");
          future.addColumn("number", "Partners");
          var totalPerProvince = 1;
          $.each(data, function(i, v) {
            //console.log("counting for " + v.Province_short + " total is " +totalPerProvince + " and i is " + i);
            if (i > 0 && i < data.length - 1) {
              //console.log("v.Province_short is " + v.Province_short + " data[i - 1].Province_short is " + data[i - 1].Province_short);
              if (v.Province_short == data[i - 1].Province_short) {
                totalPerProvince++;
                if (v.Province_short == "YT")
                  console.log(
                    i +
                      " " +
                      data[i - 1].Province_short +
                      " and " +
                      data[i - 1].Province_short
                  );
              } else {
                future.addRow([data[i - 1].Province, totalPerProvince++]);
                totalPerProvince = 1;
              }
            } else if (i > 0) {
              console.log("sdfsdfsd");
              future.addRow([data[i].Province, ++totalPerProvince]);
            }
          });
          this.futureTable = future;
          const element = document.getElementById("futureTable");
          console.log(this.totalAdditionalHelp);
          future.setProperty(0, 0, 'style', 'width:200px');
          future.setProperty(0, 1, 'style', 'width:50px');
          var table = new google.visualization.Table(element);
          table.draw(future, {
            showRowNumber: false,
            //width: "100%",
            height: "100%",
            allowHtml: true
          });

          /* var options = {
            title: 'Population of Largest U.S. Cities',
            chartArea: {width: '50%'},
            hAxis: {
              title: 'Total Population',
              minValue: 0
            },
            vAxis: {
              title: 'City'
            }
          };*/
          console.log(future);
          var chart = new google.visualization.ColumnChart(
            document.getElementById("futureChart")
          );
          chart.draw(future,null);
          //console.log(this.futureTable);
        },
        "json"
      );
    }
  },
  created: function() {
    this.buildDashFromJson();
  },
  computed: {
    // a computed getter
    totalAdditionalHelpMessage: function() {
      // `this` points to the vm instance
      return this.totalAdditionalHelp;
    }
  }
};
