import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Dialog as UIDialog, Transition } from '@headlessui/react';

import Button from './Button';

function Dialog({
  children,
  confirmDanger,
  confirmLoading,
  confirmTitle,
  icon,
  title,
  visible,
  confirmRender: RenderConfirm,
  onConfirm,
  onCancel,
}) {
  const { t } = useTranslation();

  const iconColors = confirmDanger ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500';
  return (
    <Transition show={visible} as={React.Fragment}>
      <UIDialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        open={visible}
        onClose={onCancel}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UIDialog.Overlay
              className="fixed inset-0 backdrop-blur-sm backdrop-filter"
              style={{ background: 'rgba(160, 174, 192, .75)' }}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-auto sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:flex sm:items-start sm:p-6 sm:pb-4">
                {icon && (
                  <div
                    className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconColors} sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    {icon}
                  </div>
                )}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <UIDialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </UIDialog.Title>
                  <div className="mt-2 text-sm text-gray-500">{children}</div>
                </div>
              </div>

              {(onCancel !== null || onConfirm !== null || RenderConfirm !== null) && (
                <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {(onConfirm !== null || RenderConfirm !== null) && (
                    <div className="w-full sm:ml-3 sm:w-auto">
                      {onConfirm !== null && (
                        <Button
                          type="primary"
                          danger={confirmDanger}
                          loading={confirmLoading}
                          onClick={onConfirm}
                          full
                        >
                          {confirmTitle}
                        </Button>
                      )}
                      {RenderConfirm !== null && <RenderConfirm />}
                    </div>
                  )}
                  {onCancel && (
                    <div className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto">
                      <Button type="default" onClick={onCancel} full>
                        {t('Cancel')}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </UIDialog>
    </Transition>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  confirmDanger: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  confirmTitle: PropTypes.string,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  confirmRender: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Dialog.defaultProps = {
  children: null,
  confirmDanger: false,
  confirmLoading: false,
  confirmTitle: 'OK',
  icon: null,
  visible: false,
  confirmRender: null,
  onConfirm: null,
  onCancel: null,
};

export default Dialog;
