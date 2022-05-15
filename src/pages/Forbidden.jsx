import React from 'react';

import { useNavigate } from 'react-router-dom';

import * as icons from '../icons';

import Button from '../components/ui/Button';

function Forbidden() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
        <h1 className="text-3xl">Forbidden</h1>
        <Button
          type="text"
          size="lg"
          icon={<icons.ArrowNarrowLeft />}
          title="Go back"
          onClick={goBack}
        >
          Go home
        </Button>
      </div>
    </div>
  );
}

export default Forbidden;
