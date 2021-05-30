import React from 'react';

import { useHistory } from 'react-router-dom';

import * as icons from '../icons';

import Button from '../components/ui/Button';

function Forbidden() {
  const history = useHistory();

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-3xl">
          Forbidden
        </h1>
        <Button
          type="text"
          size="lg"
          icon={<icons.ArrowLeft />}
          title="Go back"
          onClick={() => history.push('/')}
        >
          Go home
        </Button>
      </div>
    </div>
  );
}

export default Forbidden;
