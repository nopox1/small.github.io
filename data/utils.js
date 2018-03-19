function ajax(url, data = {}) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json());
  }
  
  /*Vue.mixin( {
      beforeCreate() {
        const options = this.$options;
        console.log(options);
        if ( options.ajax )
          this.$ajax = options.ajax;
        else if ( options.parent && options.parent.$ajax )
          this.$ajax = options.parent.$ajax;
      }
    } );*/
  
  function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
  }
  
  function getCookie(key) {
    var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return keyValue ? keyValue[2] : null;
  }
  
  function findInArray(Array, component) {
    $.each(langArray, function(index, value) {
      Object.keys(value).forEach(function(key) {
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
        if (categoryAry[i].category === categoryName) {
          found = true;
          break;
  
          // Did not match...
        } else {
          // Are there children / sub-categories? YES
          if (categoryAry[i].children.length > 0) {
            recurse(categoryAry[i].children);
            if (found) {
              break;
            }
          }
        }
        trail.pop();
      }
    }
  
    recurse(catalog);
  
    return trail;
  }
  