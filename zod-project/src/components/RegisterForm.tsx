import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter!!"),
});

type FormData = z.infer<typeof FormSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const handleOnSubmit = (data: FormData) => {
    console.log("Data valid :", data);
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <input type="email" {...register("email")} placeholder="Email..." />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        type="password"
        {...register("password")}
        placeholder="Password..."
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
