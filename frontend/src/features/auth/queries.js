import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNewTokens, getProfile, login, register } from "./api";
import { REFRESH_TOKEN_KEY, TOKENS_INITIAL_VALUES } from "./constants";

export const authKeys = {
	key: () => ["auth"],
	tokens: () => [...authKeys.key(), "tokens"],
	profile: () => [...authKeys.key(), "profile"],
};

export const useAuth = () => {
	const queryClient = useQueryClient();

	const {
		data: { refresh, access },
		isLoading,
		isError,
	} = useQuery({
		queryKey: authKeys.tokens(),
		queryFn: () => {
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
			return refreshToken ? getNewTokens(refreshToken) : TOKENS_INITIAL_VALUES;
		},
		initialData: TOKENS_INITIAL_VALUES,
		refetchInterval: 1000 * 60 * 30, // 30 minutes
	});

	const onSignin = ({ refresh, access }) => {
		localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
		queryClient.setQueryData(authKeys.tokens(), { refresh, access });
	};

	const onSignout = () => {
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		queryClient.setQueryData(authKeys.tokens(), TOKENS_INITIAL_VALUES);
	};

	const isAuthenticated = Boolean(access);

	useEffect(() => {
		if (isError) {
			onSignout();
		}
		if (refresh) {
			localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError, refresh]);

	return {
		refreshToken: refresh,
		accessToken: access,
		isAuthenticated,
		onSignin,
		onSignout,
		isLoading,
		isError,
	};
};

export const useGetProfile = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: authKeys.profile(),
		queryFn: () => getProfile(accessToken),
		enabled: !!accessToken,
	});
};

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: login,
		onSuccess({ refresh, access }) {
			localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
			queryClient.setQueryData(authKeys.tokens(), { refresh, access });
		},
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: register,
	});
};

export const useSignout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		// mutationFn: signout,
		mutationFn: () => Promise.resolve(),
		onSuccess() {
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			queryClient.setQueryData(authKeys.tokens(), TOKENS_INITIAL_VALUES);
		},
	});
};
