import axios from "axios";

// import {useRoute} from "vue-router";
import { toastMessage } from "@/hooks/toasters";

const redirectUser = async (status) => {
  let { origin } = window.location;
  let { pathname } = window.location;
  if (status === 401 || status === 403) {
    await toastMessage(
      "error",
      "Login as expired, kindly login again to proceed"
    );
    setTimeout(async () => {
      await window.localStorage.clear();
      if (pathname.includes("/user/"))
        return (window.location.href = `${origin}/`);
      if (pathname.includes("/admin/"))
        return (window.location.href = `${origin}/admin/login`);
    }, 3000);
  }
};

export const baseURL = `http://localhost:4000/api/user/`;

export const adminURL = `http://localhost:4000/api/admin/`;

export const appURL = `http://localhost:4000`
const { pathname } = window.location;

export const basicPostRequest = async (endPoint, payload, token) => {
  try {
    return await axios.post(
      `${pathname.includes("/admin/") ? adminURL : baseURL}${endPoint}`,
      payload,
      {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {

    if (e?.response.status === 401 || e?.response.status === 403 ) return redirectUser(e?.response.status);
    // if (e?.response.status === 403) return toastMessage('error', e?.response.message)
    
    
    return e?.response;
  }
};

export const basicGetRequest = async (endPoint, token) => {
  try {
    return await axios.get(
      `${pathname.includes("/admin/") ? adminURL : baseURL}${endPoint}`,
      {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.log(e?.response.status)
    if (e?.response.status === 401 || e?.response.status === 403 ) return redirectUser(e?.response.status);
    // if (e?.response.status === 403) return toastMessage('error', e?.response.message)
    return e?.response;
  }
};
