import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, getAllUser, getOneUser } from "./api";

export const postKeys = {
	key: () => ["posts"],
	getAllUser: () => [...postKeys.key(), "get-all-user"],
	getOne: (id) => [...postKeys.key(), "get-one", id],
};

export const useGetUserPosts = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getAllUser(),
		queryFn: () => getAllUser(accessToken),
		enabled: !!accessToken,
	});
};

export const useGetPost = () => {
	const { id } = useParams();

	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getOne(id),
		queryFn: () => getOneUser(id),
		enabled: accessToken && id,
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (values) => create(accessToken, values),
		onSuccess: (post) => {
			queryClient.setQueryData(postKeys.getAllUser(), (old) => {
				if (!old) return [post];
				return [...old, post];
			});
		},
	});
};
