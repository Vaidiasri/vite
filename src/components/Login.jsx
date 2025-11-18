import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);
  };

  return (
    <>
      <h1>Hello From</h1>
      <form onSubmit={formHandler}>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={handleChange}
          value={form.name}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={handleChange}
          value={form.password}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
