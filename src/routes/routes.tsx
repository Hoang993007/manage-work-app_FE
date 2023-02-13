import { lazy, useEffect } from "react";
import { createBrowserRouter, Link } from "react-router-dom";
import { routeLoaderDataObjectName } from "src/constants/routeConstants";
import store from "src/store/store";
import { getTaskList } from "src/store/taskSlice";

/**
 * react.lazy will automatically load the bundle containing the Component when this component is first rendered.
 * 
 * The lazy component should then be rendered inside a Suspense component, 
 * which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.
 */
const PageNotFound = lazy(() => import("src/pages/page-not-found"));
const TaskError = lazy(() => import("src/pages/error"));
const Task = lazy(() => import("src/pages/task"));
const TaskDetails = lazy(() => import("src/pages/task/components/task-details"));
const TaskList = lazy(() => import("src/pages/task/components/task-list"));

/**
 * [https://reactrouter.com/en/main/start/overview]
 */

const routers = createBrowserRouter(
  [
    {
      path: '*',
      element: <PageNotFound />
    },
    {
      path: "/",
      caseSensitive: false,
      element: <div>This is root page</div>,
      children: [
        {
          path: "landing",
          element: <div>This is landing page</div>,
        },
        {
          path: "diary",
          element: <div>This is diary manage page</div>,
          loader: ({ request }) => {
            // fetch("/api/dashboard.json", {
            //   signal: request.signal,
            // });
            // useEffect(() => {})

            return 'test';
          },
          children: [

          ],
        },
        {
          element: <div>This is auth layout</div>,
          children: [
            {
              path: "login",
              element: <div>This is login page</div>,
              loader: ({ request, params }) => {
                return 'test'
              },
            },
            {
              path: "logout",
              action: ({ request, params }) => { },
            },
          ],
        },
        {

        }
      ]
    },
    {
      path: "/task",
      element: <Task />,
      loader: async ({ request, params }) => {
        store.dispatch(getTaskList())
        
        const res: any = {}
        res[routeLoaderDataObjectName.TASK] = {
          text: 'test'
        };

        return res;
      },
      children: [
        {
          index: true,
          element: <div>index is the default placeholder content for an empty path.</div>
        },
        {
          path: 'list',
          element: <TaskList />,
          loader: async ({ request, params }) => {
            const res: any = {}
            res[routeLoaderDataObjectName.TASK_LIST] = {
              text: 'test'
            };

            return res;
          },
          handle: {
            crumb: () => <Link to="/message">Messages</Link>,
          }
          // action={({ request }) => {
          //   const formData = await request.formData();
          //   return updateTeam(formData);
          // }}
        },
        {
          path: ':taskId',
          element: <TaskDetails />,
          loader: async ({ request, params }) => {
            const taskId = params.taskId;
            console.log(taskId)

            // function loader({ request }) {
            //   const url = new URL(request.url);
            //   const searchTerm = url.searchParams.get("q");
            //   return searchProducts(searchTerm);
            // }

            const res: any = {}

            res[routeLoaderDataObjectName.TASK_DETAILS] = {
              text: 'test'
            };

            return res;

            //Without React Router, the browser would have made a Request to your server, but React Router prevented it! 
            // Instead of the browser sending the request to your server, React Router sends the request to your loaders.


            // return fetch("/api/teams.json", {
            //   signal: request.signal,
            // });
            //React Router will automatically call response.json() so your components don't need to parse it while rendering:
          },
          action: async ({ params, request }) => {
            let formData = await request.formData();


            //           const data = Object.fromEntries(await request.formData());
            // data.songTitle;
            // data.lyrics;


            //           formData.get("songTitle");
            // formData.get("lyrics");


            return 'Update sometask';
          },
          // handle: () => {
          //   console.log('TSET handle')
          // },
          handle: {
            crumb: (data: any) => <span>{data.threadName}</span>,
          }
          // loader: async ({ params: { teamId } }, { parentMatch }) => ({
          //   // This route will wait for the parent loaderPromise to resolve before finding the individual team
          //   team: await parentMatch.loaderPromise.then(({ teams }) =>
          //     teams.find((team) => team.id === teamId)
          //   ),
          // }),
        },
        {
          path: 'error',
          loader: async () => {
            throw new Error('TEST')
          },
          errorElement: <TaskError />
        },
      ],
    },
  ],
  // {
  //   basename: "/user-site",
  // }
);

export default routers;