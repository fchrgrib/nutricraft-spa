import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/toast.css';

const useToast = () => {
    const showToast = (message: string, type: 'success' | 'error') => {
        if (type === 'success') {
            toast.success(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            } else if (type === 'error') {
                toast.error(message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
    };

    return {
        showToast,
    };
};

export default useToast;