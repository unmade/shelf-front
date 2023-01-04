import React from 'react';

import * as icons from '../../icons';

import Button from '../ui/Button';
import Input from '../ui/Input';
import InputGroup from '../ui/InputGroup';

import Property from './Property';

function SharingPanel() {
  return (
    <div className="divide-y text-xs font-medium dark:divide-zinc-700">
      <Property
        name="Shared link"
        value={
          <InputGroup>
            <Input
              id="link"
              defaultValue="https://app.getshelf.cloud/s/25nhsd1af/im.jpeg"
              size="sm"
              onChange={() => {}}
              readOnly
            />
            <Button
              type="default"
              icon={
                <icons.ClipboardCopyOutlined className="h-5 w-7 shrink-0 text-gray-400 dark:text-zinc-400" />
              }
            />
            <Button type="primary" danger icon={<icons.Clear className="h-5 w-7" />} />
          </InputGroup>
        }
      />
    </div>
  );
}

export default SharingPanel;
