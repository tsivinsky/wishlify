import React from "react";
import { useLoading } from "../store";

export const Loader: React.FC = (props: any) => {
  const { loading } = useLoading();

  if (loading) {
    return (
      <div className="loader">
        <h1>Loading...</h1>
      </div>
    );
  }

  return props.children;
};
