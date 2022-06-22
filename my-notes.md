# Epic React - Reach Hooks Workshop

## PreReqs

## Lessons

### Lesson 01 - useState: greeting

- Didn't learn anything new

### Lesson 02 - useEffect: persisting state

- *React's useState hook allows you to pass a function instead of the actual value, and then it will only call that function to get the state value when the component is rendered the first time*
- Hook Order Flow:
  - Mount: Component starts render, state initializes, component finishes rendering, effects are run
  - Update: Component starts rerender, state updates, finishes render, cleanup effects are run, effects are run again
  - Dismount: cleanup effects are run
  - App renders top-to-bottom. Clean ups run bottom-to-top

### Lesson 03 - lifting state

- Didn't learn anything new

### Lesson 04 - useState: tic tac toe

- Skipped Class Refactor. Do it later as an `Extra` Trello story.

### Lesson 05 - useRef and useState: DOM interaction

- I didn't learn anything new here

### Lesson 06 - useEffect: HTTP Requests

- If you give a second argument to `.then` it will handle the error for that promise only (i.e. it will not handle the error for the entire promise chain) - useful if you want to only handle the http errors for a specific request
