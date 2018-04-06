var appGlobalTitle = "";
Vue.component("futurpreneur-map", FuturpreneurMap);
Vue.component("login", Login);

var router = new VueRouter({
  mode: "hash",
  base: window.location.href,
  routes: [
    {
      path: "/",
      icon: "home",
      name: "Welcome",
      component: Dashboard
    },
    {
      path: "/survey",
      icon: "format_list_bulleted",
      name: "Take a FREE Self-Assessment Survey for your Business Idea",
      component: SurveyPage
    },
    {
      path: "/howtoopen",
      icon: "looks_one",
      name: "How do I start my Own Business?",
      component: HowToOpen
    },
    /*{
                    path: '/collaborators',
                    icon: 'business_center',
                    name: 'Collaborators',
                    component: CollaboratorsList
                },*/
    {
      path: "/futurpreneur",
      icon: "help",
      name: "Where can I find Additional Support?",
      component: FuturpreneurList
    },
    {
      path: "/government",
      icon: "monetization_one",
      name: "Which Grants/Loans Programs are available?",
      component: GovernmentList
    },
    {
      path: "/financials",
      icon: "monetization_one",
      name: "Financials",
      component: Financials
    }
  ]
});

new Vue({
  el: "#app",
  router: router,
  data() {
    return {
      drawer: true,
      appTitle: appGlobalTitle,
      survey: survey
    };
  },
  watch: {
    $route(to, from) {
      var data = this.appTitle;
      console.log("watch");
      this.appTitle = this.$route.name;
      console.log(this.appTitle);
    }
  },
  created: function() {
   console.log("Vue created");
   console.log(this.$refs);
  }
});

//	Vue.nextTick()
//  .then(function () {
// DOM updated
//})

