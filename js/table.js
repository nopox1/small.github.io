	const HowToOpen = {
		template: '#howtoopen-template',
		data () {
		    return {
		      e1: 0,
		      appTitle: 'HowToOpen'
		    }
		}
	}	
	const Home = {
		  props: ['hello'],
		  template: '<div>Welcome to the <b>home page</b>!</div>'
		}

    const Dashboard = {
	  template: 'Look at Dashboard'
	}

	const FuturpreneurList = {
		  template: '#futurpreneur-template',
		  data: function () {
		        return { 
		          drawer: null,
			      search: '',
			      headers: [
			      /*  {
			          text: 'Dessert (100g serving)',
			          align: 'left',
			          sortable: false,
			          value: 'name'
			        },*/
			        { text: 'Province', value: 'Province' },
			        { text: 'Partner', value: 'Partners' },
			        { text: 'Website', value: 'WebsiteSupport' },
			        { text: 'Zip Code', value: 'ZipCodes' },
			        { text: 'C1', value: 'C1' },
			        { text: 'C2', value: 'C2' },
			        { text: 'C3', value: 'C3' },
			        { text: 'C4', value: 'C4' },
			        { text: 'C5', value: 'C5' },
			        { text: 'C6', value: 'C6' }
			      ],
			      items: []}
		    },
		methods: {
			    getData: function(){
			      	var futureDataUrl  = 'data/future.json';
			        var vm = this;
                	$.get(futureDataUrl, function(data){ 
		                    vm.items = data;
		                    console.log('loading futurpreneur');
                    }, 'json');                                         
			      }
			  	},
		   created: function(){
		        /*this.$http.get("https://www.reddit.com/r/"+ this.name +"/top.json?limit=5")
		        .then(function(resp){
		            if(typeof resp.data == 'string') {
		               resp.data = JSON.parse(resp.data);
		            }
		            this.posts=resp.data.data.children;
		        });*/
		        this.getData();
		    }
	}
    const CollaboratorsList = {
    	  	template: '#collaborators-template',
    	  	data: function () {
		        return { 
		          drawer: null,
			      search: '',
			      headers: [
			        { text: 'Organization', value: 'Organization' },
			        { text: 'Province', value: 'Province' },
			        { text: 'Relevance', value: 'Relevance' },
			        { text: 'Branch', value: 'Branch' },
			        { text: 'Website Support', value: 'WebsiteSupport' },
			        { text: 'List of Services Provided', value: 'ListofServicesProvided' }
			      ],
			      items: []
			  }
		    },
			methods: {
			    getData: function(){
			      	var futureDataUrl  = 'data/collaborators.json';
			        var vm = this;
                	$.get(futureDataUrl, function(data){ 
		                    vm.items = data;
		                    console.log('loading collaborators');
                    }, 'json');                                         
			      }
			  	},
		   	created: function(){
		        this.getData();
		    }
	}
	const GovernmentList = {
		 template: '#government-template',
		 data: function () {
		        return { 
		          drawer: null,
			      search: '',
			      headers: [
			        { text: 'Organization', value: 'Organization' },
			        { text: 'Province', value: 'Province' },
			        { text: 'Relevance', value: 'Relevance' },
			        { text: 'Website Support', value: 'WebsiteSupport' },
			        { text: 'Services', value: 'Services' }
			      ],
			      items: []}
		    },
		methods: {
			    getData: function(){
			      	var futureDataUrl  = 'data/grants.json';
			        var vm = this;
                	$.get(futureDataUrl, function(data){ 
		                    vm.items = data;
		                     console.log('loading grants');
                    }, 'json');                                         
			      }
			  	},
		   created: function(){
		        this.getData();
		    }
	}
    const NotFoundComponent = {
	  template: '<div>Page not found - please check your URL</div>'
	}


	var router = new VueRouter({
	    mode: 'hash',
	    base: window.location.href,
	    routes: [
					  {
					      path: '/',
					      icon: 'home',
					      name: 'Home',
					      component: Home
					  },
					  {
					      path: '/howtoopen',
					      icon: 'looks_one',
					      name: 'How to open business',
					      component: HowToOpen
					  },
					  {
					      path: '/collaborators',
					      icon: 'business_center',
					      name: 'Collaborators',
					      component: CollaboratorsList
					  },
					 {
					      path: '/futurpreneur',
					      icon: 'domain',
					      name: 'Futurpreneur',
					      component: FuturpreneurList
					  },
					  {
					      path: '/government',
					      icon: 'monetization_one',
					      name: 'Government grants/loans',
					      component: GovernmentList
					  }
				]
		});	
   
        var appGlobalTitle = 'Home';  

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

	new Vue({
			  el: '#app',
			  router: router,
			  data () {
			    return {
			      drawer: null,
			      appTitle : appGlobalTitle
			    }
			  },
			watch: {
    			'$route' (to, from) {
    				var data = this.appTitle;
    				console.log('watch');
    				this.appTitle = this.$route.name;
      				console.log(this.appTitle);
    			}
  			},
  			mounted(){
    		  console.log("mounted");
  			}
			});