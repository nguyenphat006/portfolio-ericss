import { toast, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
//   theme: "colored",
};

export const notifySuccess = (msg: string, options: ToastOptions = {}) =>
  toast.success(msg, { ...defaultOptions, ...options });

export const notifyError = (msg: string, options: ToastOptions = {}) =>
  toast.error(msg, { ...defaultOptions, ...options });

export const notifyInfo = (msg: string, options: ToastOptions = {}) =>
  toast.info(msg, { ...defaultOptions, ...options });
