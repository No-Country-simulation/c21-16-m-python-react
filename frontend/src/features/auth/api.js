import { BASE_API_URL } from "@/config";
import { fetcher } from "@/shared/utils";

export const signin = (values) => {
	return fetcher(`${BASE_API_URL}/api/users/login/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
};

export const signup = (values) => {
	return fetcher(`${BASE_API_URL}/api/users/register/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
};

export const signout = () => {
	return fetcher(`${BASE_API_URL}/auth/signout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getProfile = (accessToken) => {
	return fetcher(`${BASE_API_URL}/auth/profile`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getNewTokens = (refreshToken) => {
	return fetcher(`${BASE_API_URL}/api/token/refresh/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ refresh: refreshToken }),
	});
};
