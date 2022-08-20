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
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center lg:block lg:p-0">
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
          <span className="hidden lg:inline-block lg:h-screen lg:align-middle" aria-hidden="true">
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
            <div className="inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all lg:my-8 lg:w-auto lg:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 lg:flex lg:items-start lg:p-6 lg:pb-4">
                {icon && (
                  <div
                    className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconColors} lg:mx-0 lg:h-10 lg:w-10`}
                  >
                    {icon}
                  </div>
                )}
                <div className="mt-3 text-center lg:mt-0 lg:ml-4 lg:text-left">
                  <UIDialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </UIDialog.Title>
                  <div className="mt-2 text-sm text-gray-500">{children}</div>
                </div>
              </div>

              {(onCancel !== null || onConfirm !== null || RenderConfirm !== null) && (
                <div className="bg-gray-100 px-4 py-3 lg:flex lg:flex-row-reverse lg:px-6">
                  {(onConfirm !== null || RenderConfirm !== null) && (
                    <div className="w-full lg:ml-3 lg:w-auto">
                      {onConfirm !== null && (
                        <Button
                          className="rounded-xl"
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
                    <div className="mt-3 w-full lg:mt-0 lg:ml-3 lg:w-auto">
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
