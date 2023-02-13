import React, { Fragment, useEffect, useState } from 'react';
import { Outlet, useLoaderData, useMatch, useMatches, useNavigate } from 'react-router-dom';
import { routeLoaderDataObjectName } from 'src/constants/routeConstants';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getTaskList, selectTaskList } from 'src/store/taskSlice';

const Task: React.FC = () => {
  let navigate = useNavigate()

  const loaderData: any = useLoaderData();
  const taskData = loaderData[routeLoaderDataObjectName.TASK];

  const matches = useMatches();
  // console.log(matches)

  const dispatch = useAppDispatch();
  const taskList = useAppSelector(selectTaskList)
  const [selectedTask, setSelectedTask] = useState(1);

  const match = useMatch(
    "/task/:taskId"
  );
  // console.log(match?.params.taskId)

  const getTaskListFn = async () => {
    // await dispatch(getTaskList());
    try {
     const payload = await dispatch(getTaskList()).unwrap();
      console.log('Fetch task list')
    } catch (err) {

    } finally { }
  }

  useEffect(() => {
    getTaskListFn();
  }, [dispatch]);

  return (
    <Fragment>
      <div>This is task page</div>
      <Outlet context={[selectedTask, 'test']} />

      <div>Today</div>

      <div>Tomorrow</div>

    </Fragment>
  );
};

export default Task;
