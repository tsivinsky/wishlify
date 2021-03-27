import React from "react";
import { useForm } from "react-hook-form";

export interface JoinFormInputs {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: JoinFormInputs) => void;
}

export const JoinForm: React.FC<Props> = (props) => {
  const { handleSubmit, register } = useForm<JoinFormInputs>();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="name">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" ref={register} />
      </div>
      <div className="username">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" ref={register} />
      </div>
      <div className="email">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" ref={register} />
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={register} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};
