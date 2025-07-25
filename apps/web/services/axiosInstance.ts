import axios from "axios";
import { toast } from "sonner";

export const baseUrl = "https://tetramanor-d9nd.onrender.com/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setToken = (token: string, refreshToken: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("Refresh-token", refreshToken);
};

const attachToken = (config: any) => {
  const token = localStorage.getItem("token")?.trim();
  const refreshToken = localStorage.getItem("Refresh-token")?.trim();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (refreshToken) {
    config.headers["x-Refresh-Token"] = `Bearer ${refreshToken}`;
  }
  return config;
};

let isShowingError = false;
const errorResetTimeout = 5000; // 5 seconds

const getRefreshToken = () => localStorage.getItem("Refresh-token")?.trim();

const refreshToken = async () => {
  const rToken = getRefreshToken();
  if (!rToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      `${baseUrl}/auth/verifystate`,
      {},
      {
        headers: {
          "x-Refresh-Token": `Bearer ${rToken}`,
        },
      }
    );

    const { accessToken: token } = response.data?.detail || {};

    if (!token) {
      throw new Error("Invalid token response");
    }

    setToken(token, rToken);
    return token;
  } catch (error: any) {
    localStorage.clear();
    throw error;
  }
};

const handleError = async (error: any) => {
  if (!error.response) {
    if (error.message === "Network Error") {
      toast.error("Network Error");
    }
    return Promise.reject(
      error instanceof Error ? error : new Error(error.message)
    );
  }

  const { status, data } = error.response;
  const originalRequest = error.config;

  // Handle 401 errors with token refresh
  if ((status === 401 || status === 502) && !originalRequest._retry) {
    // originalRequest._retry = true;
    // try {
    //   const newToken = await refreshToken();
    //   originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
    //   return axiosInstance(originalRequest);
    // } catch (refreshError) {
    //   if (!originalRequest.url.includes("login")) {
    //     // localStorage.clear();
    //     // window.location.href = "/login";
    //     toast.error("Unauthorized: Please log in again.");
    //   }
    //   return Promise.reject(refreshError);
    // }

    if (!originalRequest.url.includes("login")) {
      toast.error(data?.message || "Unauthorized: Please log in again.");
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  const messages: Record<number, string> = {
    500: "Internal Server Error: Please try again later.",
  };

  const errorMessage =
    data?.message ||
    messages[status as keyof typeof messages] ||
    "An unexpected error occurred.";

  if (!isShowingError) {
    isShowingError = true;

    toast.error(errorMessage, {
      position: "top-right",
    });

    setTimeout(() => {
      isShowingError = false;
    }, errorResetTimeout);
  }

  return Promise.reject(new Error(errorMessage));
};

axiosInstance.interceptors.request.use(attachToken, Promise.reject);
axiosInstance.interceptors.response.use((res) => res, handleError);

export { axiosInstance };
