import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, getAllFeed, getAllUser, getOneUser, remove } from "./api";

export const postKeys = {
	key: () => ["posts"],
	getAllFeed: () => [...postKeys.key(), "get-all-feed"],
	getAllUser: () => [...postKeys.key(), "get-all-user"],
	getOne: (id) => [...postKeys.key(), "get-one", id],
};

export const useGetFeedPosts = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getAllFeed(),
		queryFn: () => getAllFeed(accessToken),
		enabled: !!accessToken,
	});
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
				// TODO: order by it's IDs
				return [...old, post];
			});
			queryClient.setQueryData(postKeys.getAllFeed(), (old) => {
				if (!old) return [post];
				// TODO: order by it's IDs
				return [...old, post];
			});
		},
	});
};

export const useRemovePost = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => remove(accessToken, id),
		onSuccess: (_, id) => {
			queryClient.setQueryData(postKeys.getAllUser(), (old) => {
				if (!old) return [];
				return old.filter((post) => post.id !== id);
			});
			queryClient.setQueryData(postKeys.getAllFeed(), (old) => {
				if (!old) return [];
				return old.filter((post) => post.id !== id);
			});
		},
	});
};
