import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, getAll, getOne } from "./api";

export const postKeys = {
	key: () => ["posts"],
	getAll: () => [...postKeys.key(), "get-all"],
	getOne: (id) => [...postKeys.key(), "get-one", id],
};

export const useGetPosts = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getAll(),
		queryFn: () => getAll(accessToken),
		enabled: !!accessToken,
	});
};

export const useGetPost = () => {
	const { id } = useParams();

	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getOne(id),
		queryFn: () => getOne(id),
		enabled: accessToken && id,
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (values) => create(accessToken, values),
		onSuccess: (post) => {
			queryClient.setQueryData(postKeys.getAll(), (old) => {
				if (!old) return [post];
				return [...old, post];
			});
		},
	});
};
