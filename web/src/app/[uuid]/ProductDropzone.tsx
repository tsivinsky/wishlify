import { useUploadImageMutation } from "@/api/image";
import { Dropzone } from "@/components/Dropzone";
import { ApiImage } from "@/types/image";

export type ProductDropzoneProps = {
  image: string | null;
  onChange: (image: ApiImage) => void;
};

export const ProductDropzone = ({ image, onChange }: ProductDropzoneProps) => {
  const uploadMutation = useUploadImageMutation();

  const handleChange = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    uploadMutation.mutate(file, {
      onSuccess(resp) {
        onChange(resp);
      },
    });
  };

  return (
    <Dropzone
      label="Upload image"
      image={
        image ? `${process.env.NEXT_PUBLIC_API_URL}/images/${image}` : null
      }
      accept="image/*"
      filterFiles={(file) => file.type.startsWith("image/")}
      className="min-h-[300px]"
      onChange={handleChange}
    />
  );
};
