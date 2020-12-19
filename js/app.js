/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Global Variables
 * 
*/
const navbar = document.getElementById( 'navbar__list' ),
    docFragment = document.createDocumentFragment(),
    sections = document.querySelectorAll( 'section' ),
    sections_length = sections.length;
let observer;


/**
 * End Global Variables
 * --------------------------------------------------------------------------------------------
 * Start Helper Functions
 * 
*/
/**
* @description Represent Menu item HTML Template generator
* @constructor
* @param {number} index - The index of the Menu item
* @returns HTML Template
*/
const generateMenuItemTemplate = ( index ) => {
    const newLi = document.createElement( 'li' );
    const newAnchor = document.createElement( 'a' );
    const AnchorText = sections[ index ].getAttribute('data-nav');
    const AnchorColor = sections[ index ].getAttribute('data-color');
    newAnchor.href = `#section${ index + 1 }`;
    newAnchor.className = `menu__link border--${AnchorColor}`;
    newAnchor.textContent = AnchorText;
    newLi.appendChild( newAnchor );

    return newLi;
};


/**
* @description Represent Current Active Section element
* @constructor
* @returns Active Section Element
*/
const currentActiveSectionEl = () => {
    for ( let i = 0; i < sections_length; i++ ) {
        sections[i].classList.contains( 'active' );
        return sections[i];
    }
};


/**
* @description Represent Current Active Nav item element
* @constructor
* @returns Active Nav Element
*/
const currentActiveNavItemEl = () => {
    for ( let i = 0; i < navbar_items_length; i++ ) {
        if( navbar_items[i].classList.contains( 'active' ) ) {
            return navbar_items[i];
        }
    }
};


/**
* @description Represent Smooth Scrolling using ScrollTo method
* @constructor
* @param {event} e - Click event
*/
function smoothscroll(e){
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    if(targetId === '#app_body'){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }else{
        document.querySelector(targetId).scrollIntoView({
            behavior: "smooth",
            inline: "start"
        })
    }
    
    
}
/**
* @description Represent Smooth Horizontal Scrolling using ScrollTo method
* @constructor
* @param {HTMLElement} el - scroll to this el offsetLeft
*/
function smoothscrollHorizontal( el ){
    navbar.parentElement.scrollLeft = el.offsetLeft;
    // el.scrollIntoView({
    //     behavior: "smooth",
    //     inline: "start"
    // })
    
}


/**
 * @description Represent funtion to be called on stop scrolling
 * @constructor
 * @param  {Function} callback The function to run after scrolling stops
 */
const onStopScrolling = function (callback) {

    // Insure callback is a function
    // If callback doesn't exist or not a function --> Do nothing
	if (!callback || typeof callback !== 'function') return;

	// Scrolling
	let isScrolling;

	// Listen for scroll events
	window.addEventListener('scroll', function (e) {
        // Show and hide back to top button on scroll
        if(window.scrollY > window.innerHeight){
            document.getElementById('backTop').classList.add('shown');
        }else{
            document.getElementById('backTop').classList.remove('shown');
        }
		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);
        document.getElementById('header_nav').classList.remove('hideNav');

        // Set a timeout to run after scrolling ends
        // Wait 3 seconds after the scrolling stops then invoke the callback funtion passed here
		isScrolling = setTimeout( () => {
			// Run the callback
			callback();
		}, 3000);

	}, false);

};


/**
 * End Helper Functions
 * --------------------------------------------------------------------------------------------
 * Begin Main Functions
 * 
*/
// 1. Build the nav
for ( let i = 0; i < sections_length; i++ ) {
    const menuItem = generateMenuItemTemplate( i );
    docFragment.appendChild( menuItem ) ;
}


// 2. Build menu 
navbar.appendChild( docFragment ) ;


// 3. Set sections as active
sections.forEach( item => {
    // Using Intersection observer API
    observer = new IntersectionObserver(function(entries) {
        const intersectingSec = entries[0].target,
        intersectingSecIndex = entries[0].target.getAttribute('data-index'),
        navbar_items = navbar.querySelectorAll( '.menu__link' );
        if(entries[0].isIntersecting === true) {
            // Add class 'active' to section when perfectly intersecting the viewport
            // Note that: Section height is (100vh) --> 100% = viewport height
            // Thus, the section will perfectly align with viewport
            intersectingSec.classList.add('active');
            // Add Class Active to the menu link corresponding to the Intersecting(active) section
            navbar_items[ intersectingSecIndex - 1 ].classList.add('active');
            // Only scroll horizonatlly to the active item in the menu while scrolling elements
            if ( window.innerWidth < 560 ) {
                // Set Scroll left value accordingly
                smoothscrollHorizontal(navbar_items[ intersectingSecIndex - 1 ]);
            }
        } else {
            intersectingSec.classList.remove('active');
            navbar_items[ intersectingSecIndex - 1 ].classList.remove('active');
        }
    }, { threshold: [0.51] });

    // Observe Intersection with ( more than or equal to 51% ) of the view port for all Section items
    observer.observe(item);

});


/**
 * End Main Functions
 * --------------------------------------------------------------------------------------------
 * Begin Events
 * 
*/
// Scroll to section on link click
navbar.querySelectorAll('.menu__link').forEach( item => item.addEventListener('click', smoothscroll));


// Scroll to top on click back to top button
document.getElementById('backTop').addEventListener('click', smoothscroll);

// Hide Nav on stop scrolling
onStopScrolling( () => {
    document.getElementById('header_nav').classList.add('hideNav');
})