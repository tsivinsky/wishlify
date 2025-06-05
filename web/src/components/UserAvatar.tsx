import { clsx } from "clsx";
import Image from "next/image";

export type UserAvatarProps = {
  image: string | null;
  alt: string;
  size?: number;
  className?: string;
};

export const UserAvatar = ({
  image,
  alt,
  size = 64,
  className,
}: UserAvatarProps) => {
  return (
    <div
      style={{ width: size }}
      className={clsx(
        "relative overflow-hidden aspect-square rounded-full",
        className,
      )}
    >
      {image ? (
        <Image src={image} alt="" fill className="object-cover" />
      ) : (
        <div className="grid place-items-center w-full h-full border rounded-full text-sm uppercase">
          <span>{alt}</span>
        </div>
      )}
    </div>
  );
};
