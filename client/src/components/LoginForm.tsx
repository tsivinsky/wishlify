import React from "react";
import { useForm } from "react-hook-form";

export interface LoginFormInputs {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: LoginFormInputs) => void;
}

export const LoginForm: React.FC<Props> = (props) => {
  const { handleSubmit, register } = useForm<LoginFormInputs>();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="email">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" ref={register} required />
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={register}
          minLength={8}
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};
