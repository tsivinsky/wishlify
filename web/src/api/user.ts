import { $axios } from "@/lib/axios";
import { User } from "@/types/user";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const userQuery = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: async () => {
      const resp = await $axios.get<User>("/user");
      return resp.data;
    },
  });

export const useUserQuery = () => {
  return useQuery(userQuery());
};
