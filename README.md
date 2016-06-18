# Website Performance Optimization portfolio project

## Running the application

1. Clone or download the repository
  ```
  $> git clone  https://github.com/afzal273/uda-fend-website-optimization-project.git
  $> cd uda-fend-website-optimization-project
  ```

1. Start the local server
  ```
  $> python -m SimpleHTTPServer 8080
  ```

1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.
  ```
  $> cd fend-website-optimization-project
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and run it through PageSpeed Insights!



## Optimizations made in `views js/main.js` for `pizza.html`

### For rendering with a consistent frame-rate of 60fps when scrolling

- Instead of using document.querySelectorAll for selecting all elements with mover class, used getElementsByClassName which is more performant.
- The exisiting `updatePositions()` function in `views - js/main.js` was evaluating document.body.scrollTop inside the for loop for every item with class mover and then 
updating the item style. This will cause forced synchronous layout (FSL) as layout is run followed by paint in every iteration.
- In order to mitigate this, evaluated the scrollTop once before iterating over the items and used the value inside the for loop.
- Also tried using transform.translateX CSS property instead of left to see if it improves performance. There wasn't a noticeable difference, so continued using CSS left property.
- Tried putting each mover pizza in its own layer using `backface-visibility: hidden`, but this didn't help much with the performance and this wouldn't be very performant on mobile so decided not to use it.

## For making time to resize pizzas in less than 5ms
- The existing `changePizzaSizes` function did a lot of unnecessary selections and calculations inside the for loop for each pizza inside the for loop causing excessive layouts/paints resulting in FSL.
- Simplified `changePizzaSizes` to use one of the 3 pizza sizes which would be the result of changing the slider. The resulting size will have the same width for all pizzas so it's calculated only once and the width is applied to all pizzas.
