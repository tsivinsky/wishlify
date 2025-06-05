import { $axios } from "@/lib/axios";
import { ApiImage } from "@/types/image";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (data: Blob) => {
      const resp = await $axios.post<ApiImage>("/images", data);
      return resp.data;
    },
  });
};
