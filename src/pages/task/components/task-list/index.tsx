import React, { Fragment, useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { routeLoaderDataObjectName } from 'src/constants/routeConstants';

const TaskList: React.FC = () => {
  const loaderData: any = useLoaderData();
  const taskDetailsData = loaderData[routeLoaderDataObjectName.TASK_LIST];

  return (
    <Fragment>
      This is task list
    </Fragment>
  );
};

export default TaskList;
