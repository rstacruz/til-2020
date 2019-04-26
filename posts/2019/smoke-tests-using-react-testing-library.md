---
title: 'Using React testing library'
tags: [React]
---

[react-testing-library](https://github.com/testing-library/react-testing-library) is a very light-weight tool for testing React components. Here's a few tips on how to get started with it.

## Using test ID attributes

###

<!-- {.-literate-style} -->

I like adding `data-test-id` attributes to my tests. This makes them easy to target, and lets me refer to them without having to resort to XPath or CSS.

```html
const TextToolbar = () => (
	<div>
		{/* Notice the data-test-id attributes! */}
		<button data-test-id='button:bold'>Bold</button>
		<button data-test-id='button:italic'>Italic</button>
		<button data-test-id='button:underline'>Underline</button>
	</div>
)
```

Using test ID attributes is advocated by many testing frameworks. I first came across it in Cypress, [which recommends a very similar practice](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements).

## Smoke tests using test ID's

###

<!-- {.-literate-style} -->

The react-testing-library API comes with `getBy` functions that will raise an error if they're not found. By having a test that only has .getBy calls, we effectively make a "smoke" test that will fail if the elements are missing.

```jsx
import { render } from 'react-testing-library'

it('works', () => {
  const co = render(<TextToolbar />)

	// This test will fail if these aren't present.
  co.getByTestId('button:bold')
  co.getByTestId('button:italic')
  co.getByTestId('button:underline')
})
```

## Simulating events

##

<!-- {.-literate-style} -->

The react-testing-library API comes with `getBy` functions that will raise an error if they're not found. By having a test that only has .getBy calls, we effectively make a "smoke" test that will fail if the elements are missing.

```jsx
import { render, fireEvent, act, cleanup } from 'react-testing-library'

// Calls cleanup() after every test
afterEach(cleanup)

it('works', () => {
  const co = render(<TextToolbar />)

  const button = co.getByTestId('button:insertImage')

	// Click the button.
	act(() => { fireEvent.click(button) })

	// Ensure that something happens
	await waitForElement(() =>
    getByTestId('insertImageDialog')
  )
})
```

