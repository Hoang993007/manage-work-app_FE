import React from 'react';
import { useMatches } from "react-router-dom";

const Breadcrumbs = () => {
  let matches = useMatches();
  let crumbs = matches
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => match.handle.crumb(match.data));

  return (
    <ol>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}

export default Breadcrumbs;