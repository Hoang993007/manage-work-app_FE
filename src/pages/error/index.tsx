import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useOutletContext, useNavigate, useMatch, useLoaderData, useRouteError } from 'react-router-dom';

const TaskError: React.FC = (props) => {

  const loaderData: any = useRouteError();
  console.log(loaderData.message)

  return (
    <Fragment>
    </Fragment>
  );
};

export default TaskError;
