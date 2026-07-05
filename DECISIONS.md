## 1. How did your debounce work? What happens if the user keeps typing before the 300ms is up?

For the search input, I used my own `useDebounce` hook. My goal was to prevent the filter from running every time the user typed a letter.

`setTimeout` waits for 300ms. If the user types something else before that time is over, `clearTimeout` cancels the previous timer and creates a new one. Because of this, `setDebouncedValue` only runs 300ms after the user stops typing.

This means the filter doesn't run on every key press. Instead, it runs only after the user finishes typing, which improves the application's performance. That is the main purpose of debouncing.

---

## 2. Where does your filter state live, and why?

All of the filter state (`search`, `transmission`, `type`, `availableOnly`, and `sort`) is stored in the `App.jsx` component.

I chose to keep the state there because several components need to use it. For example, `SearchBar`, `FilterBar`, and `SortSelect` update the state, while `CarGrid` displays the filtered data based on those values. `ResultsCounter` also uses the same filtered results.

If every component had its own state, keeping everything synchronized would be much more difficult. That's why I lifted the state up to the top-level component and passed it down to the child components through props.

---

## 3. What happens when the page loads with filters already in the URL?

First, `useSearchParams` reads the parameters from the URL.

Then, the initial values of the `useState` hooks are taken from those parameters. For example, if the URL contains `?q=Toyota&type=SUV`, the `search` state becomes `"Toyota"` and the `type` state becomes `"SUV"`.

After that, `useDebounce` prepares the search value. Then `useMemo` runs, first calling `filterCars()` and then `sortCars()`.

As a result, when the user opens the page, they immediately see the results based on the filters already in the URL. Later, whenever the filters change, `useEffect` updates the URL so that refreshing the page doesn't remove the selected filters.

---

## 4. If you had one more day, what would you refactor first?

The first thing I would refactor is the URL handling logic.

Right now, the code that creates the query parameters is written directly inside `useEffect`. I would move that logic into a separate helper function or a custom hook. This would make `App.jsx` shorter and easier to read.

I would also combine the five separate `useState` hooks into a single state object. This would reduce repeated code and make it easier to add new filters in the future.
