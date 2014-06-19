// A hash to store our routes:
var routes = {};

function route (path, controller) {
	routes[path] = {controller: controller};
}

var el = null;
function router () {
	// Current route url (getting rid of '#' in hash as well):
	var url = location.hash.slice(1) || '/';

	// Get route by url:
	var route = routes[url];
	route.controller();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);