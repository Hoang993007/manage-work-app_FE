import { SliceStatusEnum, sliceStatus } from '../constants/index';
import { RootState } from './store';
import { IListMetadata } from '../interfaces/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITask } from 'src/interfaces/task.interface';

const TASK_SLICE_NAME = "task";

export interface TaskState {
  taskList: {
    data: ITask[];
    metadata: IListMetadata;
  },
  status: SliceStatusEnum,
  error: string | null
}

const initialState: TaskState = {
  taskList: {
    data: [],
    metadata: {
      page: 1,
      limit: 20,
      totalItem: 0,
      totalPage: 0,
    }
  },
  status: 'succeeded',
  error: null
};

// const logAndAdd = amount => {
//   return (dispatch, getState) => {
//     const stateBefore = getState()
//     console.log(`Counter before: ${stateBefore.counter}`)
//     dispatch(incrementByAmount(amount))
//     const stateAfter = getState()
//     console.log(`Counter after: ${stateAfter.counter}`)
//   }
// }
// store.dispatch(logAndAdd(5))

export const getTaskList: any = createAsyncThunk(`${TASK_SLICE_NAME}/getTaskList`, async () => {
  try {
    const res = await getTaskList();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
})

export const taskSlice = createSlice({
  name: TASK_SLICE_NAME,
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.push(action.payload)
    //   },
    //   prepare(title, content) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         content
    //       }
    //     }
    //   }
    // }

    // dispatch(postAdded(title, content))
  },
  extraReducers(builder) {
    builder
    .addCase(getTaskList.pending, (state, action) => {
      state.status = sliceStatus.LOADING;
    })
    .addCase(getTaskList.fulfilled, (state, action) => {
      state.status = sliceStatus.SUCCEEDED;
      state.taskList = action.payload;
    })
    .addCase(getTaskList.rejected, (state, action) => {
      state.status = sliceStatus.FAILED;
      state.error = action.error.message;
    })
  }
});

export const { } = taskSlice.actions;
const { reducer: taskReducer } = taskSlice;

export const selectTaskList = (state: RootState) => state.task.taskList;
export const selectTaskById = (state: RootState, taskId: number) =>
  state.task.taskList.data.find(task => task.id === taskId)

export default taskReducer;
