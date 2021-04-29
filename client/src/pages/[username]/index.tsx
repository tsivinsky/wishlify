import { useEffect } from "react";
import { PageProps } from "../../types";

export default function User({ router }: PageProps) {
  useEffect(() => {
    router.push("/");
  }, []);

  return null;
}
