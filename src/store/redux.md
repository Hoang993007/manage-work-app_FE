### Docs link
Redux Essentials: [https://redux.js.org/tutorials/essentials/part-1-overview-concepts]

Dispatching actions = triggering an event
Reducers = event listeners


### Call action creators to dispatch the right action:
const increment = (payload) => {
  return {
    type: 'counter/increment',
    payload
  }
}
store.dispatch(increment())

### Selector
const selectCounterValue = state => state.value
const currentValue = selectCounterValue(store.getState())

### ReSelect: avoid unnecessary re-renders, and also avoid doing potentially complex or expensive calculations if the input data hasn't changed.
Reselect is a library for creating memoized selector functions, and was specifically designed to be used with Redux. It has a createSelector function that generates memoized selectors that will only recalculate results when the inputs change. 

Old:
const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter(post => post.user === userId)
  })

New:
export const selectPostsByUser = createSelector(
  [state => state.posts.posts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)

Whatever those input selectors return becomes the arguments for the output selector.
If we try calling selectPostsByUser multiple times, it will only re-run the output selector if either posts or userId has changed:

const state1 = getState()
selectPostsByUser(state1, 'user1')

### Steps
Initial setup:
  1. A Redux store is created using a root reducer function
  2. The store calls the root reducer once, and saves the return value as its initial state
  3. When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the state has changed.
Updates:
  1. Something happens in the app, such as a user clicking a button
  2. The app code dispatches an action to the Redux store, like dispatch({type: 'counter/increment'})
  3. The store runs the reducer function again with the previous state and the current action, and saves the return value as the new state
  4. The store notifies all parts of the UI that are subscribed that the store has been updated
  5. Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
  6. Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen

### useSelector
We don't have to only use selectors that have already been exported, either. For example, we could write a selector function as an inline argument to useSelector:
e.g. const countPlusTwo = useSelector(state => state.counter.value + 2)

Any time an action has been dispatched and the Redux store has been updated, useSelector will re-run our selector function. If the selector returns a different value than last time, useSelector will make sure our component re-renders with the new value.

### useDispatch
const dispatch = useDispatch()
The useDispatch hook gives us the actual dispatch method from the Redux store

### Providing the store
We always have to call ReactDOM.render(<App />) to tell React to start rendering our root <App> component. In order for our hooks like useSelector to work right, we need to use a component called <Provider> to pass down the Redux store behind the scenes so they can access it.


### Using Middleware to Enable Async Logic
By itself, a Redux store doesn't know anything about async logic. It only knows how to synchronously dispatch actions, update the state by calling the root reducer function, and notify the UI that something has changed. Any asynchronicity has to happen outside the store.
Redux Toolkit's configureStore function automatically sets up the thunk middleware by default

### Thunk function
The word "thunk" is a programming term that means "a piece of code that does some delayed work".

If we try calling dispatch(fetchPosts()), the fetchPosts thunk will first dispatch an action type of 'posts/fetchPosts/pending':

### .unwarp()
However, it's common to want to write logic that looks at the success or failure of the actual request that was made. Redux Toolkit adds a .unwrap() function to the returned Promise, which will return a new Promise that either has the actual action.payload value from a fulfilled action, or throws an error if it's the rejected action. This lets us handle success and failure in the component using normal try/catch logic. So, we'll clear out the input fields to reset the form if the post was successfully created, and log the error to the console if it failed.

### Investigating Render Behavior
[https://redux.js.org/tutorials/essentials/part-6-performance-normalization#investigating-render-behavior]

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector(state => selectUserById(state, userId))

  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter(post => post.user === userId)
  })

  // omit rendering logic
}
We're calling filter() inside of our useSelector hook, so that we only return the list of posts that belong to this user. Unfortunately, this means that useSelector always returns a new array reference, and so our component will re-render after every action even if the posts data hasn't changed!.
=========> Use "memoization"

### Normalizing Data
[https://redux.js.org/tutorials/essentials/part-6-performance-normalization#normalizing-data]
Data with ID
???? Case update ID?

You've seen that a lot of our logic has been looking up items by their ID field. Since we've been storing our data in arrays, that means we have to loop over all the items in the array using array.find() until we find the item with the ID we're looking for.

Realistically, this doesn't take very long, but if we had arrays with hundreds or thousands of items inside, looking through the entire array to find one item becomes wasted effort. What we need is a way to look up a single item based on its ID, directly, without having to check all the other items. This process is known as "normalization".