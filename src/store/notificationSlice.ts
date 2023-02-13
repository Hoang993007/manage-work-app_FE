import { RootState } from 'src/store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState, dispatch, extra, requestId, signal, rejectWithValue }) => {
    // [https://redux.js.org/tutorials/essentials/part-6-performance-normalization]
    const allNotifications = selectAllNotifications(getState() as any)
    const [latestNotification] = allNotifications;
    // const latestTimestamp = latestNotification ? latestNotification.date : ''
    // const response = await client.get(
    //   `/fakeApi/notifications?since=${latestTimestamp}`
    // )
    // return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      // state.push(...action.payload)
      // Sort with newest first
      // state.sort((a, b) => b.date.localeCompare(a.date))
    })
  }
})

const { reducer: notificationsReducer } = notificationsSlice;

export const selectAllNotifications = (state: RootState) => state.notification;

export default notificationsReducer;
