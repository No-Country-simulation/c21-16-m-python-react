import { BASE_API_URL } from "@/config";
import { fetcher } from "@/shared/utils";

export const getAllFeed = (accessToken) => {
	return fetcher(`${BASE_API_URL}/api/posts/publications/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getAllUser = (accessToken) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getOneUser = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/${id}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const create = (accessToken, values) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: values,
	});
};

export const remove = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
