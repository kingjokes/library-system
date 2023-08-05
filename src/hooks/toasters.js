import { toast } from 'vue3-toastify';

export const toastMessage = (type, message)=>{
  return toast(message, {
    position:'top-right',
    type:type,
    autoClose: 6000,
    hideProgressBar: false,
    pauseOnHover: true,
    // progress: 0.2,
    theme:'colored'
  })
}
