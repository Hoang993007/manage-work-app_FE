import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import BuggyCounter from './pages/buggy-counter';
import ErrorBoundary from './pages/error-boundary';
import Loading from './pages/loading';
import routers from './routes/routes';
import store from './store/store';

function App() {
  // store.dispatch({
  //   type: 'test',
  //   payload: {}
  // })
  // console.log(store.getState())

  return (
    <ErrorBoundary>
      {/* <BuggyCounter /> */}
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routers} />
      </Suspense>
    </ErrorBoundary>

    // <Router>
    //   <Suspense fallback={<Loading />}>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //     <Route path="/about" element={<About />} />
    //     </Routes>
    //   </Suspense>
    // </Router>
  );
}

export default App;
