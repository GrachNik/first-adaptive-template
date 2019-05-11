//toggle navbar
let mainNav = document.querySelector('#menu');
let navBarToggle = document.querySelector('#show-menu');

navBarToggle.addEventListener('click', function () {
  mainNav.classList.toggle('active');
});
console.dir(mainNav);
console.dir(navBarToggle);

//move to up
let buttonUp = document.querySelector('#button-up');
buttonUp.addEventListener('click', function goUp() {
	let tops = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		if (tops > 0) {
	    window.scrollBy(0, -80);
	    setTimeout(goUp, 20);
    }
});

//move to form
let toForm = document.querySelector('#to-form');
let form = document.querySelector('#contact-form');
toForm.addEventListener('click', function() {
	form.scrollIntoView({behavior: 'smooth'});
});

console.dir(toForm);

