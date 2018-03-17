
   var appGlobalTitle = '';  


    var router = new VueRouter({
	    mode: 'hash',
	    base: window.location.href,
    routes: [
                {
                    path: '/',
                    icon: 'home',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: '/survey',
                    icon: 'business_center',
                    name: 'Self-assessment survey',
                    component: SurveyPage
                },
                {
                    path: '/howtoopen',
                    icon: 'looks_one',
                    name: 'What should I do to start my own business?',
                    component: HowToOpen
                },
                /*{
                    path: '/collaborators',
                    icon: 'business_center',
                    name: 'Collaborators',
                    component: CollaboratorsList
                },*/
                {
                    path: '/futurpreneur',
                    icon: 'domain',
                    name: 'Where can i get additional support?',
                    component: FuturpreneurList
                },
                {
                    path: '/government',
                    icon: 'monetization_one',
                    name: 'What grants/loans are avaliable?',
                    component: GovernmentList
                }
            ]
    });	


	new Vue({
        el: '#app',
        router: router,
        data () {
          return {
            drawer: true,
            appTitle : appGlobalTitle,
            survey: survey
          }
        },
      watch: {
        '$route' (to, from) {
            var data = this.appTitle;
            console.log('watch');
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



function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function findInArray(Array, component) {
    $.each(langArray,
        function (index, value) {
            Object.keys(value).forEach(function (key) {
                var val = value[key];
                if ($.isArray(val)) {
                    component[key] = val.join(", ");
                } else {
                    component[key] = value[key];
                }
            });
        });
}

function findCategory(categoryName) {
    var trail = [];
    var found = false;

    function recurse(categoryAry) {

        for (var i = 0; i < categoryAry.length; i++) {
            trail.push(categoryAry[i].category);

            // Found the category!
            if ((categoryAry[i].category === categoryName)) {
                found = true;
                break;

                // Did not match...
            } else {
                // Are there children / sub-categories? YES
                if (categoryAry[i].children.length > 0) {
                    recurse(categoryAry[i].children);
                    if(found){
                        break;
                    }
                }
            }
            trail.pop();
        }
    }

    recurse(catalog);

    return trail
}

   