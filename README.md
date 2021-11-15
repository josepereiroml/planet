# Planet animation using three.js 
## Getting started 
* This project was created using three.js, gsap, and tween libraries. The idea is to create an initial loading bar in this case it's the white bar and after that appears an animation of the Earth rotating to the right and the text to the left. This GLTF model was exported using Blender. 

### Prerequisites 
* If you want to run it locally it's necessary to run 1) npm install and then run 2) npm start (this will run a server.js and Visit http://127.0.0.1:3000.

### Assumptions 
* I started working with node modules or packages but I realized that if I used the direct imports in the index.js the deployment using Github Pages was going to be possible. Although I know the libraries can be installed locally. 
I created the index.html (having the canvas, the div for the loading bar and I imported the tween module. The CSS file is a simple css file I addd the styling for the body, canvas and loading bar. The server.js is a simple server running the app here http://127.0.0.1:3000. 

* For the index.js that's the JS file that has the three.js and gsap, I created the variables for canvas, scene, light and defined and added the camera. For the loading bar I used the div (.loading-bar) and I using the querySelector method I assigned it to a variable and then used the loading manager from three.js. Using two callbacks for Loaded and Progress and using the ratio between the itemsLoaded and itemsTotal it's possible to determine if everything has been loaded. I used an overlay for the loading bar. 

* I loaded the .gltf file and I scaled it to (0.065,0.065,0.065) to match the size of the screen and then used Tween for the intro animation (scaling from 0.1 - to 1.0) I used this specific values because I thought it looked nicer. After this I assigned the childrens from the gltf model to the variables earth and text and I created a function inside of the loader to animate them. Finally, I created the render and run the animation. 


* Link for the project deployed https://josepereiroml.github.io/planet/
