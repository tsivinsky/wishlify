import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $axios } from "@/lib/axios";

export type RegisterUserData = {
  email: string;
  password: string;
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterUserData) => {
      const resp = await $axios.post("/register", data);
      return resp.data;
    },
  });
};

export type LoginUserData = {
  email: string;
  password: string;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginUserData) => {
      const resp = await $axios.post("/login", data);
      return resp.data;
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const resp = await $axios.post("/logout");
      return resp.data;
    },
    onSuccess() {
      queryClient.clear();
    },
  });
};
