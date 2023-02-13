import { SliceStatusEnum } from '../constants/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';
import { THEME_MODE, THEME_MODE_ENUM } from 'src/constants/theme';
import { LOCAL_STORAGE_THEME } from 'src/constants/storage';

export interface ThemeState {
  themeMode: THEME_MODE_ENUM;
  status: SliceStatusEnum,
  error: string | null
}

const initialState: ThemeState = {
  themeMode: (localStorage.getItem(LOCAL_STORAGE_THEME) as THEME_MODE_ENUM)
    || THEME_MODE.LIGHT,
  status: 'succeeded',
  error: null
};

// The "createSlice" name comes from splitting up the root Redux state object into multiple "slices" of state.
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<THEME_MODE_ENUM>) => {
      const selectedTheme = action.payload;

      localStorage.setItem(LOCAL_STORAGE_THEME, selectedTheme);
      document.documentElement.setAttribute('data-theme', selectedTheme);
      state.themeMode = selectedTheme;
    },
    setThemeToDefault: (state) => {
      const defaultTheme = THEME_MODE.LIGHT;

      localStorage.setItem(LOCAL_STORAGE_THEME, defaultTheme);
      document.documentElement.setAttribute('data-theme', defaultTheme);
      state.themeMode = defaultTheme;
    }
  },
});

/**
 * The function below is called a thunk and allows us to perform async logic. 
 * It can be dispatched like a regular action: `dispatch(incrementAsync(10))`. 
 * This will call the thunk with the `dispatch` function as the first argument. 
 * Async code can then be executed and other actions can be dispatched
 */
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

export const { setTheme } = themeSlice.actions;
const { reducer: themeReducer } = themeSlice;

/**
 * The function below is called a selector and allows us to select a value from the state.
 */
/** Selectors can also be defined inline where they're used instead of in the slice file. 
 * For example: `useSelector((state) => state.counter.value)`
 */
export const selectTheme = (state: RootState) => state.theme;
export const selectThemeMode = (state: RootState): THEME_MODE_ENUM => state.theme.themeMode;

export default themeReducer;

// console.log(themeSlice.actions.setTheme(THEME_MODE.DARK)) 
// {
//   type: "theme/setTheme",
//   payload: "DARK"
// }

// const newState = counterSlice.reducer(
//   { value: 10 },
//   counterSlice.actions.increment()
// )
// console.log(newState)
// // {value: 11}
