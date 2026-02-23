import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Bearer Token (محمي)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (لمعالجة اللوج أوت إذا التوكن منتهي)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // إذا الباك إند رجع 401 يعني التوكن غير صالح أو منتهي
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // اختياري: تقدر توجه المستخدم لصفحة الدخول هنا
      // window.location.href = "/admin-login";
    }
    return Promise.reject(error);
  }
);

// Helper: يرجّع لك message حسب تنسيق الباك
export function getApiErrorMessage(err) {
  // تنسيق الباك: { status: "error", message: "...", error: "..." }
  const msg = err?.response?.data?.message;
  const backendError = err?.response?.data?.error;

  if (backendError) return `خادم خطأ (500): ${backendError}`;
  if (msg) return msg;

  // أخطاء شبكة / CORS / SSL
  if (err?.code === "ECONNABORTED") return "انتهت مهلة الاتصال بالسيرفر";
  if (err?.message === "Network Error")
    return "Network Error: تأكد من رابط السيرفر (https) و CORS";

  return err?.message || "حدث خطأ غير معروف";
}

export default api;
