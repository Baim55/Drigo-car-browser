## 1. Your async layer has loading, error, and empty states. How does each one get triggered, and how does Retry re-run the load without leaving stale UI behind?

I created a fake API with a `getCars()` function that returns a Promise after a random delay between about 800 and 1200ms. I also made it fail randomly around 20% of the time so I could test the error state.
The `useCars` hook manages three different states: `loading`, `data`, and `error`. When `loadCars()` starts, it sets `loading` to `true` and clears any previous error. If the request succeeds, the cars are stored in `data` and loading becomes `false`. If it fails, the error message is saved and loading is also turned off.
The Retry button calls the same `loadCars()` function again. Before making the new request, the hook resets the loading and error states, so the old error message disappears immediately and the user sees a fresh loading state instead of stale UI.

---

## 2. How does a car reach the detail page, and how does /cars/6 work in a fresh tab with no prior list state? What happens for an unknown id?

Clicking a car card navigates the user to `/cars/:id` using React Router.
The detail page does not depend on data from the list page. Instead, it loads the cars again through the `useCars` hook and finds the correct car using `useParams`. Because of this, opening `/cars/6` directly in a new browser tab still works correctly.
If the id does not exist, for example `/cars/999`, the application shows a "Car not found" message with a button to return to the car list instead of crashing.

---

## 3. When the user goes into a detail page and presses Back, how is the exact filtered/sorted/paged view restored?

All of the search, filter, sort, and page values are stored in the URL using query parameters.
When the list page opens, `useSearchParams` reads those values and my reducer uses them as its initial state. This means the filters are restored before the cars are filtered.
When the user opens a car detail page and then presses the browser Back button, the browser returns to the previous URL with the same query parameters. Since the list page reads its initial state from the URL, the same search, filters, sorting option, and page number are restored automatically.

---

## 4. Why did you reach for useReducer here instead of separate useStates, and what does that buy you as filters multiply?

In Week 1 I used several separate `useState` hooks, but after adding more filters the state became much larger.
With `useReducer`, all filter updates are handled in one place. Each action has a clear responsibility, such as updating the search, changing the transmission, selecting types, updating the price range, or changing the page.
Another advantage is that I only needed to write the page reset logic once. Whenever a filter changes, the reducer automatically sets the page back to `1`, so I don't have to repeat that logic in different components.

---

## 5. Walk through what happens on load when the URL already contains search + filters + sort + page. How do you keep the URL and state from disagreeing or looping?

First, `useSearchParams` reads the current query parameters from the URL.
Then, those values are used to create the initial state of my reducer. For example, if the URL already contains a search term, selected types, sorting option, or page number, those values become the initial filter state.
After that, `useDebounce` prepares the search and price values. Then `useMemo` runs, first calling `filterCars()`, then `sortCars()`, and finally `paginate()` to get the correct page of results.
Whenever the filter state changes, `useEffect` updates the URL with the latest values. Because of this, refreshing the page keeps the same view and the URL stays synchronized with the application state.

---

## 6. If you had one more day, what is the first thing you'd refactor or the first test you'd add, and why?

The first thing I would refactor is the URL handling logic.
Right now, the code that creates the query parameters is written directly inside `useEffect`. I would move that logic into a separate helper function or a custom hook. This would make `CarListPage` shorter and easier to read.
I would also add more unit tests, especially for the reducer and the favorites hook. Those parts contain important application logic, so having more tests would make future changes safer.
