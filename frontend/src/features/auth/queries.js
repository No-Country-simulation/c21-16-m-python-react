import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessToken, getProfile, signin, signup } from "./api";

export const authKeys = {
  key: () => ["auth"],
  accessToken: () => [...authKeys.key(), "accessToken"],
  profile: () => [...authKeys.key(), "profile"],
};

export const useAuth = () => {
  const {
    data: accessToken,
    isPending,
    isError,
  } = useQuery({
    queryKey: authKeys.accessToken(),
    queryFn: getAccessToken,
  });

  const isAuthenticated = accessToken !== null;

  return {
    isAuthenticated,
    isPending,
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

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess({ user, access_token }) {
      queryClient.setQueryData(authKeys.accessToken(), access_token);
      queryClient.setQueryData(authKeys.profile(), user);
    },
    onError(err) {
      console.log(err);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
