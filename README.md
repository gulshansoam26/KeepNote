# Manage State with Reducers, Composition, and Optimizations

## Sprint 5: Practice Exercise

In this sprint, you learned how to **manage complex state transitions using the `useReducer` hook**, apply **component composition for better reusability**, and implement **optimizations** to make your React application more efficient.  
The focus of this sprint is on improving **internal logic and performance**, not on changing the visual appearance of the application.

### 📝 Exercise: Optimize State Management in KeepNote

---

## About KeepNote

**KeepNote** is a single-page, component-based web app for capturing, organizing, and managing notes.

### Development Stages:

- Create the basic KeepNote interface using components and props.
- Manage component behavior using state to control and update note displays.
- Retrieve and show notes from an external source using API calls with `useEffect`.
- Control side effects and reuse logic with custom hooks.
- Apply scoped CSS techniques for styling.
- Design a responsive layout using Material UI.
- Write tests using Jest and React Testing Library.
- Build a basic note submission form with `useState` and validation rules.
- Build a multi-step registration form using `react-hook-form`.
- Enable multi-page navigation using React Router for smooth transitions.
- Secure app features by managing authentication state with Context API.
- **Handle complex state transitions efficiently using the `useReducer` pattern and apply optimizations.**

---

## 🛠️ Exercise: Optimize State Management in KeepNote

Upgrade your **KeepNote** app by refactoring state management and improving efficiency.

### Tasks:

1. **Shift authentication from `AuthContext` to an `AuthReducer` handling login and logout actions.**
2. **Create a `RootReducer` combining auth and notes reducers and expose it via `AppContext`.**
3. **Modify the data structure so each note belongs only to the logged-in user.**
4. **Fetch and display notes based on `userId`.**
5. **Dispatch all CRUD actions through the reducer.**
6. **Apply `useCallback` and `useMemo` for optimization.**

---

## ✅ Expected Output

There is **no visible change in the look of the application**.  
The improvements are focused on **internal efficiency, state management, and performance optimizations**.  
You will notice the difference in **code structure, maintainability, and rendering performance**, rather than in the UI.