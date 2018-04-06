google.load("visualization", "1", {
  packages: ["table", "corechart", "bar"]
});

const Dashboard = {
  template: "#home-template",
  data: function() {
    return {
      total: { totalPartners: "", totalGrants: "", totalLoans: "" }
    };
  },
  methods: {
    buildDashFromJson: function() {
      var futureDataUrl = "data/future.json";
      var grantsDataUrl = "data/grants.json";
      let totalPartners = 0;
      let totalGrants = 0;
      let totalLoans = 0;
      var vm = this;
      $.get(
        futureDataUrl,
        function(data) {
          var future = new google.visualization.DataTable();
          totalPartners = data.length;
          console.log("Data loaded " + totalPartners);
          vm.total.totalPartners = totalPartners;
          future.addColumn("string", "Province, Territory or Region");
          future.addColumn("number", "Partners");
          var totalPartnersArray = {};
          data.forEach(function(v, i) {
              if (!totalPartnersArray[v.Province]) {
                totalPartnersArray[v.Province] = [i]; 
              } else {
                totalPartnersArray[v.Province].push(i);
              }
          });

          Object.keys(totalPartnersArray).forEach(function(v) {
            future.addRow([v, totalPartnersArray[v].length]);
          });

          const element = document.getElementById("futureTable");
          future.setProperty(0, 0, "style", "width:200px");
          future.setProperty(0, 1, "style", "width:50px");
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
          var chart = new google.visualization.ColumnChart(
            document.getElementById("futureChart")
          );
          chart.draw(future, null);
        },
        "json"
      );
      $.get(
        grantsDataUrl,
        function(data) {
          var grants = new google.visualization.DataTable();
          var loans = new google.visualization.DataTable();
          console.log("Grants loaded " + data.length);
          grants.addColumn("string", "Province");
          grants.addColumn("number", "grants");
          loans.addColumn("string", "Province");
          loans.addColumn("number", "loans");

          var grantsArray = {};
          var loansArray = {};
          data.forEach(function(v, i) {
            if (v.Services.match(/loans+/i)) {
              if (!loansArray[v.Province]) {
                loansArray[v.Province] = [i]; 
              } else {
                loansArray[v.Province].push(i);
              }
            } else {
              if (!grantsArray[v.Province]) {
                // Initial object property creation.
                grantsArray[v.Province] = [i];
              } else {
                // Same occurrences found.
                grantsArray[v.Province].push(i);
              }
            }
          });

          Object.keys(loansArray).forEach(function(v) {
            loans.addRow([v, loansArray[v].length]);
            totalLoans = totalLoans + loansArray[v].length;
          });
          Object.keys(grantsArray).forEach(function(v) {
            grants.addRow([v, grantsArray[v].length]);
            totalGrants = totalGrants + grantsArray[v].length;
          });

          var grantsChart = new google.visualization.ColumnChart(
            document.getElementById("grantsChart")
          );
          grantsChart.draw(grants, null);

          var chart = new google.visualization.ColumnChart(
            document.getElementById("loansChart")
          );
          chart.draw(loans, null);
          console.log("totalGrants - " + totalGrants);
          console.log("totalLoans - " + totalLoans);
          vm.total.totalGrants = totalGrants;
          vm.total.totalLoans = totalLoans;
        },
        "json"
      );
      console.log("totalPartners - " + totalPartners);
    }
  },
  created: function() {
    console.log(this.total);
    this.buildDashFromJson();
  }
};
