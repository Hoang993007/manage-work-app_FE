import React, { Fragment } from 'react';
import { useParams, useOutletContext, useNavigate, useMatch, useLoaderData } from 'react-router-dom';
import { routeLoaderDataObjectName } from 'src/constants/routeConstants';

const TaskDetails: React.FC = (props) => {
  const [selectedTask, text] = useOutletContext<[selectedTask: any, text: string]>()
  let navigate = useNavigate()
  let { taskId } = useParams();


  // const author = useSelector(state =>
  //   state.users.find(user => user.id === userId)
  // )


  const loaderData: any = useLoaderData();
  const taskDetailsData = loaderData[routeLoaderDataObjectName.TASK_DETAILS];


//   <Form method="post" action="/songs" />;
// <fetcher.Form method="put" action="/songs/123/edit" />;

// // imperative submissions
// let submit = useSubmit();
// submit(data, {
//   method: "delete",
//   action: "/songs/123",
// });
// fetcher.submit(data, {
//   method: "patch",
//   action: "/songs/123/edit",
// });


  return (
    <Fragment>
      <div>This is task details page</div>
      <div>Selected task: {taskId} - text: {text}</div>

      <button onClick={() => navigate("./")}>Go Back One nested path</button>
      <button onClick={() => navigate("../")}>Go Back Two nested path</button>
      <button onClick={() => navigate(-1)}>Go back in history</button> // as if the user clicked the back button in a browser
    </Fragment>
  );
};

export default TaskDetails;
