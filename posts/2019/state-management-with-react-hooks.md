---
title: State management with React hooks
description: You don't always need Redux. Here's how you may use custom hooks instead
tags: [React]
date: 2019-04-10
layout: simple
# https://twitter.com/rstacruz/status/1115989486662381568
# https://pbs.twimg.com/media/D3zKQEHUYAAsqrn.jpg:large
book: articles
---

<Figure cover>
<img src='covers/Rs5BQj5zbf8.jpg' alt='Unrelated photo with some hooks' />
</Figure>

**React now comes with hooks that can be used to manage state and propagate it throughout your app.** In essence&mdash;you can do Redux without using Redux! I've been trying to use [useState][usestate] and [useContext][usecontext] to manage a large block of state in a React app. In think it's a great alternative to Redux.

---

## Custom state manager

### Defining the hook

Let's write our state manager as a [custom React hook][custom]. This hook is a thin wrapper around React's `useState` hook. Instead of giving a `setState()` function, it gives a bunch of setState macros (ie, `actions`).

<Figure code title='useAppState.js'>

```js
// highlight-range{7}
import { useState } from 'react'

/**
 * Our custom React hook to manage state
 */

const useAppState = () => {
  const initialState = { count: 0 }

  // Manage the state using React.useState()
  const [state, setState] = useState(initialState)

  // Build our actions. We'll use useMemo() as an optimization,
  // so this will only ever be called once.
  const actions = useMemo(() => getActions(setState), [setState])

  return { state, actions }
}

// Define your actions as functions that call setState().
// It's a bit like Redux's dispatch(), but as individual
// functions.
const getActions = (setState) => ({
  increment: () => {
    setState((state) => ({ ...state, count: count + 1 }))
  },
  decrement: () => {
    setState((state) => ({ ...state, count: count - 1 }))
  },
})

export default useAppState
```

</Figure>

---

### Using the hook

You can use the `useAppState()` hook in your React components. It will provide the current `state` and the `actions`.

<Figure code title='MyApp.js'>

```js
// highlight-range{9}
import { useAppState } from './useAppState'

/**
 * Our top-level app component
 */

const MyApp = () => {
  // Use the custom hook we wrote earlier
  const { state, actions } = useAppState()

  return (
    <div>
      <span>{state.count}</span>

      <button onClick={actions.increment}> + </button>
      <button onClick={actions.decrement}> - </button>
    </div>
  )
}
```

</Figure>

## Passing actions

### Passing as props

The functions in `actions` are plain old functions that you can pass down into child components.
You can pass them to event props as-is.

<!-- prettier-ignore -->
```js
// highlight-range{3-4}
<Toolbar
  count={state.count}
  onIncrement={actions.increment}
  onDecrement={actions.decrement}
/>
```

### Passing many actions down

If you need to pass many functions down, it's also possible to simply pass the entire `actions` object downwards.

<!-- prettier-ignore -->
```js
// highlight-range{3}
<Toolbar
  count={state.count}
  actions={actions}
/>
```

[custom]: https://reactjs.org/docs/hooks-custom.html

## Working with contexts

The one essential feature of react-redux is the way the application's state is available to all its descendant components. This can be done with [React contexts][context].

### Exporting a context

In our `useAppState.js` file, we'll export a context created with [React.createContext][createcontext], along with a new custom hook for using the app context.

<Figure code title='useAppState.js'>

```js
// highlight-range{7,14}
import { useState, useContext } from 'react'

const AppContext = React.createContext({})

// This is for the top-level component, providing `state`
// and `actions`. (Same function as in the examples above.)
const useAppState = () => {
  // ...
}

// Sub-components can use this function. It will pick up the
// `state` and `actions` given by useAppState() higher in the
// component tree.
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppContext, useAppState, useAppContext }
```

</Figure>

### Defining a provider

In your app's root, use the _AppContext.Provider_ component. This makes it possible to use the `useAppContext()` hook in child components.

<Figure code title='MyApp.js'>

```js
// highlight-range{9}
import { AppContext, useAppState } from './useAppState'
import Toolbar from './Toolbar'

// Top-level app component
const MyApp = () => {
  const { state, actions } = useAppState()

  return (
    <AppContext.Provider value={{ state, actions }}>
      <div>
        {/* Components here will consume the value */}
        {/* given to the provider above. */}
        <Toolbar />
      </div>
    </AppContext.Provider>
  )
}
```

</Figure>

### Consuming it

The `useAppContext` hook allows you to use the app state anywhere inside the Provider tree. This is similar to using react-redux's connect() function.

<Figure code title='Toolbar.js'>

```js
// highlight-range{10}
import { useAppContext } from './useAppState'

const Toolbar = () => {
  // In other components such as this, we can use the
  // useAppContext() hook to fetch the 'state' and 'actions'
  // from higher up in the component tree.
  //
  // This takes the `value` given in `<AppContext.Provider>`
  // in the top-level component above (MyApp.js).
  const { state, actions } = useAppContext()

  return (
    <div>
      <button onClick={actions.increment}> + </button>
      <button onClick={actions.decrement}> - </button>
    </div>
  )
}
```

</Figure>

## Epilogue

Thanks for reading this! I've done a few edits to this article since it was first published:

- Changed `setState({ ...state })` to `setState(state => ({ ...state }))`, because the latter would cause trouble when many setState's are called.

- Added `useMemo()` the actions block to optimize it and make it faster.

[usecontext]: https://reactjs.org/docs/hooks-reference.html#usecontext
[usestate]: https://reactjs.org/docs/hooks-reference.html#usestate
[context]: https://reactjs.org/docs/context.html
[createcontext]: https://reactjs.org/docs/context.html#createcontext
