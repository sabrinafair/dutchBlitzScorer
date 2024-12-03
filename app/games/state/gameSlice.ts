import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state
interface GameState {
    id: number,
  snackbar: string,

}

// Define the initial state using that type
const initialState: GameState = {
    id: 1,
  snackbar: 'TEST',
}

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSnackbar: (state, action: PayloadAction<string>) => {
      state.snackbar = action.payload
    },
  },
})

export const { setSnackbar } = gameSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSnackbar = (state: RootState) => state.games.snackbar
export default gameSlice.reducer