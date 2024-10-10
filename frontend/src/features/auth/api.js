import { API_URL } from "../../config";
import { fetcher } from "../../shared/utils";

export const signin = (values) => {
  return fetcher(`${API_URL}/auth/signin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });
};

export const signup = (values) => {
  return fetcher(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });
};

export const signout = () => {
  return fetcher(`${API_URL}/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const getProfile = (accessToken) => {
  return fetcher(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
};

export const getAccessToken = () => {
  return fetcher(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(({ access_token }) => access_token);
};
