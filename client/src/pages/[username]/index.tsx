import { useEffect } from "react";

export default function User({ router }: PageProps) {
  useEffect(() => {
    router.push("/");
  }, []);

  return null;
}
