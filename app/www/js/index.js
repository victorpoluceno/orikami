BasicView = Backbone.View.extend({
    initialize : function () {
        //_.bindAll();
        this.render();
    },

    events : {
        "click #backButton" : "goBackInHistory"
    },

    role : "page",

    attributes : function () {
        return {
            "data-role" : this.role
        };
    },

    getHeaderTitle : function () {
        return this.getSpecificTemplateValues().headerTitle;
    },

    goBackInHistory : function(clickEvent){
        history.go(-1);
        return false;
    },

    getTemplateResult : function (templateDefinitionID, templateValues) {
        return _.template($("#" + templateDefinitionID).html())(templateValues)
    },

    render : function () {
        //this.cleanupPossiblePageDuplicationInDOM();
        $(this.el).html(this.getTemplateResult(this.templateId,
            this.getSpecificTemplateValues()));
        this.addPageToDOMAndRenderJQM();
        this.enhanceJQMComponentsAPI();
    },

    enhanceJQMComponentsAPI : function () {
        $.mobile.changePage("#" + this.id, {
            transition : 'none',
            changeHash : false,
            role : this.role
        });
    },

    addPageToDOMAndRenderJQM : function () {
        $("body").append($(this.el));
        $("#" + this.id).page();
    },

    cleanupPossiblePageDuplicationInDOM : function () {
        var $previousEl = $("#" + this.id);
        var isAlreadyInDom = $previousEl.length >= 0;
        if (isAlreadyInDom) {
            // used because from-to page switch
            // needs events at that point of time
            // have in mind, that detach will not remove handlers
            $previousEl.detach();
        }
    }
});

SignUpView = BasicView.extend({
    id: "signup",
    templateId: "signup-template",

    events: {
        'click #signup-button': 'createOnClick',
    },

    createOnClick: function(event){
        console.log('click create');
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
                Backbone.history.navigate('', true);
            },
            error: function(user, error) {
                // TODO: Show the error message somewhere and let the user try again.
                console.log("Error: " + error.code + " " + error.message);

                $("#signup-error").html(error.message).show();
                $("#signup-button").removeAttr("disabled");
            }
        });

        $("#signup-button").attr("disabled", "disabled");
    },

    getSpecificTemplateValues: function(){
        return {};
    }
});

HomeView = BasicView.extend({
    id: "home",
    templateId: "home-template",

    getSpecificTemplateValues: function(){
        return {};
    }
});

DetailView = BasicView.extend({
    id: "detail",
    templateId: "detail-template",

    getSpecificTemplateValues: function(){
        return {};
    }
});

SignInView = BasicView.extend({
    id: "signin",
    templateId: "signin-template",

    events: {
        'click #signin-button': 'loginOnClick',
    },

    loginOnClick: function(event){
        console.log('click login');
        var username = $('#signin-username').val()
        var password = $('#signin-password').val()

        Parse.User.logIn(username, password, {
            success: function(user) {
                Backbone.history.navigate('home', true);
            },
            error: function(user, error) {
                console.log("Error: " + error.code + " " + error.message);

                $("#signup-error").html("Invalid username or password. Please try again.").show();
                $("#signin-button").removeAttr("disabled");
            }
        });

        $("#signin-button").attr("disabled", "disabled");
    },

    getSpecificTemplateValues: function(){
        return {};
    }
});

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "signin",
        "signup": "signup",
        "home": "home",
        "detail": "detail",
        "logout": "logout",        
    },

    signup: function() {
        console.log('signup click');
        new SignUpView();
    },

    signin: function() {
        if (Parse.User.current()) {
            Backbone.history.navigate('home', true);
        } else {
            console.log('signin click');
            new SignInView();    
        }
    },

    home: function() {
        console.log('home click');
        new HomeView();
    },

    detail: function() {
        console.log('detail click');
        new DetailView();
    },

    logout: function() {
        console.log('logout click');
        Parse.User.logOut();
        Backbone.history.navigate('', true);
    },
});

$(document).ready(function () {
    console.log('document ready');
    document.addEventListener('deviceready', function (){
        console.log('device ready');
        Parse.initialize("Va9dcafjWMkGn0PYMK7azpOsHANRD3Nk9AO9xq2e",
            "49bOHrbFxuQK6RZKB5QLgzuiBDKFYsUrqPiHmmQt");

        new AppRouter();
        Backbone.history.start({pushState: false});
    }, false);
});
