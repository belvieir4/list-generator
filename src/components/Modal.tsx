import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

type ModalProps = {
  isVisible?: boolean;
  onClose: () => void;
  onReject?: () => void;
  onAccept?: () => void;
  title: string;
  message: string;
  acceptLabel?: string;
  rejectLabel?: string;
  showRejectButton?: boolean;
};

export default function Modal({
  isVisible,
  onClose,
  title,
  message,
  acceptLabel = '',
  rejectLabel = '',
  onAccept,
  onReject,
  showRejectButton = true,
}: ModalProps) {
  const { t } = useTranslation();
  const acceptText = acceptLabel || t('Sim');
  const rejectText = rejectLabel || t('Não');
  return (
    <>
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-800"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-gray-600">{message}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    {showRejectButton && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-lg text-blue-900 outline-none hover:bg-blue-200"
                        onClick={onReject || onClose}
                      >
                        {rejectText}
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white outline-none transition duration-300 ease-in-out hover:bg-blue-950"
                      onClick={onAccept || onClose}
                    >
                      {acceptText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
