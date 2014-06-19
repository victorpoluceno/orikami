var app = {
    // Application Constructor
    initialize: function() {
        Parse.initialize("Va9dcafjWMkGn0PYMK7azpOsHANRD3Nk9AO9xq2e", "49bOHrbFxuQK6RZKB5QLgzuiBDKFYsUrqPiHmmQt");
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('#signup-form').submit(this.onSignUp);
        $('#signin-form').submit(this.onSignIn);
        route('home', this.onHome);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    onSignIn: function (event) {
        var username = $('#signin-username').val()
        var password = $('#signin-password').val()

        Parse.User.logIn(username, password, {
            success: function(user) {
                // Do stuff after successful login.
                window.location.href = '#home';
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
                console.log("Error: " + error.code + " " + error.message);
            }
        });
        event.preventDefault();
    },

    onSignUp: function(event) {
        var name = $('#signup-name').val()
        var email = $('#signup-email').val()
        var password = $('#signup-password').val()

        var user = new Parse.User();
        user.set("username", email);
        user.set("password", password);
        user.set("email", email);
        user.set("name", name);
        user.signUp(null, {
          success: function(user) {
            // TODO show a message for successful signup before navigate
            window.location.href = '#login';
          },
          error: function(user, error) {
            // TODO: Show the error message somewhere and let the user try again.
            console.log("Error: " + error.code + " " + error.message);
          }
        });
        event.preventDefault();
    },

    onHome: function(){
        var list = document.getElementById("transaction-home");
        list.innerHTML = tmpl("item_tmpl", {});
        $('#transaction-home').trigger("create");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
