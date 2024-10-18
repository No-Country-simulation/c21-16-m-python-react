import { BASE_API_URL } from "@/config";
import { fetcher } from "@/shared/utils";

export const getAll = (accessToken) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getOne = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/publication/user-publications/${id}/`, {
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
