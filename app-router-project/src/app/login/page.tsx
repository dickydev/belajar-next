"use client";
import React, { useState } from "react";
import { z } from "zod";

const FormSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter!!"),
});

type FormData = z.infer<typeof FormSchema>;

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = FormSchema.safeParse(form);

    if (!result.success) {
      const newError: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) newError[err.path[0].toString()] = err.message;
      });
      setError(newError);
    } else {
      setError({});
      console.log("Data Valid:", result.data);
    }
  };

  return (
    <>
      <h1>Formulir Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Masukkan email...."
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Masukkan password...."
        />

        {error.password && <p style={{ color: "red" }}>{error.password}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
