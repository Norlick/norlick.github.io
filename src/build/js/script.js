// If we're browsing in portrait, flag the stylesheet as such
function layoutSwitch() {
	if ( innerHeight > innerWidth ) {
		console.log('woopdewoop');
		document.querySelector('body').id = 'Portrait';
	} else {
		document.querySelector('body').id = '';
	}
}

window.addEventListener( 'resize', function() {
	requestAnimationFrame( layoutSwitch );
} );

requestAnimationFrame( layoutSwitch );


// ONLOAD Stuff
onload = function() {
	console.log('BOO!');
};
