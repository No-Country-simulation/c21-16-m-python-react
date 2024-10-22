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

export const useGetFeed = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getAllFeed(),
		queryFn: () => getAllFeed(accessToken),
		select: (data) => {
			data.results.sort((a, b) => b.id - a.id);
			return data;
		},
		enabled: !!accessToken,
	});
};

export const useGetPosts = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getAllUser(),
		queryFn: () => getAllUser(accessToken),
		select: (data) => {
			data.results.sort((a, b) => b.id - a.id);
			return data;
		},
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
				return {
					...old,
					results: old.results.concat(post),
				};
			});
			queryClient.setQueryData(postKeys.getAllFeed(), (old) => {
				if (!old) return [post];
				// TODO: order by it's IDs
				return {
					...old,
					results: old.results.concat(post),
				};
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
				return {
					...old,
					results: old.results.filter((post) => post.id !== id),
				};
			});
			queryClient.setQueryData(postKeys.getAllFeed(), (old) => {
				if (!old) return [];
				return {
					...old,
					results: old.results.filter((post) => post.id !== id),
				};
			});
		},
	});
};
