import Toast from "typescript-toastify";

export function renderToast(message: string){
    const toast = new Toast({
        position: "top-right",
        toastMsg: message,
        autoCloseTime: 3000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "dark"
    });

    toast.toastMsg;
    // return toast;
}