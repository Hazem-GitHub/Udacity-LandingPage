# Landing Page Project

## Table of Contents

* [Instructions](#Instructions)
* [Desicions](#Desicions)

###

### Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

###

### Desicions

- Looping over sections and appending li elements to the ul element (Navbar)
- Set Sections as active while intersecting the viewport, I decided to use IntersectionObserver API for adding active classes to the visible section also to the corresponding li and it has very good performance
- Scroll to section on link click smoothly ( created a smooth scroll function to do so using scrollTo method )
- Responsive and interactive Header Nav (hidden on stop scrolling)
- Colorful design and modern clean look for the page
- Back to top button always scroll to the peak of the page(hidden by default and shown on page fold) 