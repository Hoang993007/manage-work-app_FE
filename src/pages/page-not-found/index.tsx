import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useOutletContext, useNavigate, useMatch, useLoaderData, useRouteError } from 'react-router-dom';

const PageNotFound: React.FC = (props) => {
  let { org, "*": splat } = useParams();

  return (
    <Fragment>
      404
      Not found page: {org} {splat}
    </Fragment>
  );
};

export default PageNotFound;
