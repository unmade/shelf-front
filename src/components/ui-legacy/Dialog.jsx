import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Dialog as UIDialog,
  DialogTitle as UIDialogTitle,
  DialogPanel as UIDialogPanel,
  DialogBackdrop as UIDialogBackdrop,
  Transition,
} from '@headlessui/react';

import Button from './Button';

const defaultOnCancel = () => {};

function Dialog({
  children,
  confirmDanger,
  confirmLoading,
  confirmTitle,
  hideActions,
  icon,
  title,
  visible,
  confirmRender: RenderConfirm,
  onConfirm,
  onCancel,
}) {
  const { t } = useTranslation();

  const iconColors = confirmDanger
    ? 'bg-red-50 text-red-500 dark:bg-rose-700/30 dark:text-rose-400'
    : 'bg-gray-50 text-gray-500 dark:bg-zinc-700/30 dark:text-zinc-400';
  return (
    <Transition show={visible} as={React.Fragment}>
      <UIDialog transition open={visible} onClose={onCancel ?? defaultOnCancel}>
        <UIDialogBackdrop className="fixed inset-0 z-10 bg-gray-100/75 backdrop-blur-sm backdrop-filter dark:bg-zinc-700/50" />

        <UIDialogPanel className="fixed inset-0 z-10 flex min-h-svh w-screen items-center justify-center p-4 transition duration-300 ease-out data-closed:opacity-0">
          <div className="inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all lg:my-8 lg:w-auto lg:max-w-xl lg:align-middle dark:bg-zinc-800">
            <div className="bg-white px-4 pt-5 pb-4 lg:flex lg:items-start lg:p-6 lg:pb-4 dark:bg-zinc-800">
              {icon && (
                <div
                  className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconColors} lg:mx-0 lg:h-10 lg:w-10`}
                >
                  {icon}
                </div>
              )}
              <div className="mt-3 text-center lg:mt-0 lg:ml-4 lg:text-left">
                <UIDialogTitle
                  as="h3"
                  className="truncate text-lg leading-6 font-medium text-gray-900 dark:text-zinc-100"
                >
                  {title}
                </UIDialogTitle>
                <div className="mt-2 text-sm text-gray-500 dark:text-zinc-400">{children}</div>
              </div>
            </div>

            {!hideActions && (
              <div className="bg-gray-100 px-4 py-3 lg:flex lg:flex-row-reverse lg:px-6 dark:bg-zinc-700/30">
                {(onConfirm != null || RenderConfirm != null) && (
                  <div className="w-full lg:ml-3 lg:w-auto">
                    {onConfirm != null && (
                      <Button
                        variant="primary"
                        color={confirmDanger ? 'danger' : 'primary'}
                        loading={confirmLoading}
                        onClick={onConfirm}
                        full
                      >
                        {confirmTitle}
                      </Button>
                    )}
                    {RenderConfirm &&
                      (isValidElement(RenderConfirm) ? RenderConfirm : <RenderConfirm />)}
                  </div>
                )}
                {onCancel && (
                  <div className="mt-3 w-full lg:mt-0 lg:ml-3 lg:w-auto">
                    <Button variant="default" onClick={onCancel} full>
                      {t('Cancel')}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </UIDialogPanel>
      </UIDialog>
    </Transition>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  confirmDanger: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  confirmTitle: PropTypes.string,
  hideActions: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  confirmRender: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  children: null,
  confirmDanger: false,
  confirmLoading: false,
  confirmTitle: 'OK',
  hideActions: false,
  icon: null,
  visible: false,
  confirmRender: null,
  onConfirm: null,
};

export default Dialog;
