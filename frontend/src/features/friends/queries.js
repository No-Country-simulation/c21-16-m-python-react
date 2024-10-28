import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { acceptRequest, getFriends, getPending, getRequests, rejectRequest, sendRequest } from "./api";

export const friendKeys = {
	key: () => ["friends"],
	requests: () => [...friendKeys.key(), "requests"],
	pending: () => [...friendKeys.key(), "pending"],
	list: () => [...friendKeys.key(), "list"],
};

export const useGetRequests = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: friendKeys.requests(),
		queryFn: () => getRequests(accessToken),
	});
};

export const useGetFriends = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: friendKeys.list(),
		queryFn: () => getFriends(accessToken),
	});
};

export const useGetPending = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: friendKeys.pending(),
		queryFn: () => getPending(accessToken),
	});
};

export const useSendRequest = () => {
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => sendRequest(accessToken, id),
		onSuccess(response, id) {
			console.log("useSendRequest onSuccess");
			console.log("response", response);
			console.log("id", id);
		},
	});
};

export const useAcceptRequest = () => {
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => acceptRequest(accessToken, id),
		onSuccess(response, id) {
			console.log("useAcceptRequest onSuccess");
			console.log("response", response);
			console.log("id", id);
		},
	});
};

export const useRejectRequest = () => {
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => rejectRequest(accessToken, id),
		onSuccess(response, id) {
			console.log("useRejectRequest onSuccess");
			console.log("response", response);
			console.log("id", id);
		},
	});
};
