import { useState } from "react";
import { email, z } from "zod";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const UserSchema = z.object({
  id: z.number(),
  nama: z
    .string()
    .min(3, "Nama minimal 3 karakter bossh")
    .max(100, "Nama maximal 100 karakter"),
  email: z.email("Format email tidak valid"),
  umur: z.number(),
  hobby: z.string().optional(),
});

const user = UserSchema.parse({
  id: 1,
  nama: "Ucup",
  email: "ucup@gmail.com",
  umur: 20,
  hobby: "Ngoding",
});

const App = () => {
  const [data, setData] = useState(user);
  return (
    <div>
      {data.id} | {data.nama}
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default App;
