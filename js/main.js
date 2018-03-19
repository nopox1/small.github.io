var appGlobalTitle = "";
Vue.component("futurpreneur-map", FuturpreneurMap);

var router = new VueRouter({
  mode: "hash",
  base: window.location.href,
  routes: [
    {
      path: "/",
      icon: "home",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/survey",
      icon: "business_center",
      name: "Self-assessment survey",
      component: SurveyPage
    },
    {
      path: "/howtoopen",
      icon: "looks_one",
      name: "What should I do to start my own business?",
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
      icon: "domain",
      name: "Where can i get additional support?",
      component: FuturpreneurList
    },
    {
      path: "/government",
      icon: "monetization_one",
      name: "What grants/loans are avaliable?",
      component: GovernmentList
    },
    {
        path: "/map",
        icon: "map",
        name: "Where can i find?",
        component: FuturpreneurMap
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

