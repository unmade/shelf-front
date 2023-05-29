import React from 'react';

import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Input from '../ui/Input';
import InputGroup from '../ui/InputGroup';

function ShareMember({ username }) {
  return (
    <div className="py-3 flex items-center justify-between text-sm font-medium">
      <div className="flex items-center mr-2">
        <Avatar username={username} className="w-9 h-9" />
        <p className="ml-2">{username}</p>
      </div>
      <div>
        <p>can edit</p>
      </div>
    </div>
  );
}

function ShareSetting() {
  return (
    <>
      <div>
        <p className="mt-6 mb-1 text-sm font-semibold">Share with members</p>
      </div>
      <div>
        <InputGroup>
          <Input id="link" placeholder="Enter a username" size="sm" onChange={() => {}} />
          <Button variant="primary" color="success">
            Share
          </Button>
        </InputGroup>
      </div>

      <div className="mt-3 divide-y divide-zinc-700">
        <ShareMember username="fdooch" />
        <ShareMember username="reconcile" />
        <ShareMember username="unmade" />
      </div>
    </>
  );
}

export default ShareSetting;
