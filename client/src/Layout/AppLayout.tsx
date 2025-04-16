import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <div>THIS WILL BE THE HEADER</div>
      <Outlet />
      <div>THIS WILL BE THE FOOTER</div>
    </div>
  );
};

export default AppLayout;
