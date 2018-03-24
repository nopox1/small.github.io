var appGlobalTitle = "";
Vue.component("futurpreneur-map", FuturpreneurMap);

var router = new VueRouter({
  mode: "hash",
  base: window.location.href,
  routes: [
    {
      path: "/",
      icon: "home",
      name: "General information",
      component: Dashboard
    },
    {
      path: "/survey",
      icon: "format_list_bulleted",
      name: "Take FREE Self-Assessment Survey",
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
    /*{
        path: "/map",
        icon: "map",
        name: "Where can i find?",
        component: FuturpreneurMap
      }*/
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
  }
});

/*router.beforeEach((to, from, next) => {
			console.log(to);
			//appGlobalTitle = to.name;
			console.log(appGlobalTitle);
			// window.scrollTo(0, 0);
		    next();
		});*/

//	Vue.nextTick()
//  .then(function () {
// DOM updated
//})

