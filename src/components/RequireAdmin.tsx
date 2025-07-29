import type React from 'react';

import { useSelector } from 'react-redux';

import { selectIsSuperuser } from 'store/accounts';

import Forbidden from 'pages/Forbidden';

interface Props {
  children: React.ReactNode;
}

export default function RequireAdmin({ children }: Props) {
  const admin = useSelector(selectIsSuperuser);

  if (admin) {
    return children;
  }

  return <Forbidden />;
}
