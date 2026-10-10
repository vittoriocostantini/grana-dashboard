"use client";

import { useState, type FormEvent } from "react";
import {
  getStoredUsers,
  saveSession,
  saveStoredUsers,
  type AuthUser,
} from "@/lib/auth-storage";

const fieldClassName =
  "w-full border-b border-black bg-transparent py-1.5 text-sm text-black outline-none placeholder:text-[#8b9099] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#d7dde8] [&:-webkit-autofill]:[-webkit-text-fill-color:#000] [&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_#d7dde8] [&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_#d7dde8]";

export function AuthScreen({
  onAuthenticated,
}: {
  onAuthenticated: (user: AuthUser) => void;
}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function clearForm() {
    setEmail("");
    setPassword("");
    setName("");
    setShowPassword(false);
  }

  function handleRegister(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");
// verifica se todos os campos estão preenchidos
    if (!email || !password || !name) {
      setError("All fields are required.");
      return;
    }

    const users = getStoredUsers();
    const userExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
// se o email já está registrado, mostra um erro
    if (userExists) {
      setError("This email is already registered.");
      return;
    }
// adiciona o usuário ao array de usuários en local storage
    users.push({ email, password, name });
    saveStoredUsers(users);
    setSuccess("Account created,welcome to Grana!");
    setIsRegistering(false);
    clearForm();
  }
// verifica se o email e a senha estão preenchidos
  function handleLogin(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");
// verifica se o email e a senha estão preenchidos
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    const foundUser = getStoredUsers().find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    );

    if (!foundUser) {
      setError("Incorrect email or password.");
      return;
    }

    saveSession(foundUser);
    onAuthenticated(foundUser);
    clearForm();
  }

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-[#d7dde8]">
      <div className="w-full max-w-70">
        <img
          src="/icons/grana-logo-blue.svg"
          alt="Grana"
          className="mx-auto size-30"
        />

        <h1 className="mt-6 text-center text-[28px] font-bold leading-none tracking-tight text-black">
          {isRegistering ? "Register" : "Login"}
        </h1>
        <p className="mt-2 text-center text-xs text-[#5c6370]">
          {isRegistering ? "Create your account" : "Welcome Back to Admin"}
        </p>

        {error ? (
          <p className="mt-4 text-center text-xs text-[#e15b64]">{error}</p>
        ) : null}
        {success ? (
          <p className="mt-4 text-center text-xs text-[#3dbe7a]">{success}</p>
        ) : null}

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="mt-16"
        >
          {isRegistering ? (
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className={`${fieldClassName} mb-6`}
            />
          ) : null}

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your Email"
            autoComplete="email"
            className={fieldClassName}
          />

          <label className="relative mt-6 block">
            <span className="sr-only">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete={isRegistering ? "new-password" : "current-password"}
              className={`${fieldClassName} pr-8`}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((current) => !current)}
              className="absolute top-1/2 right-0 grid size-7 -translate-y-1/2 place-items-center text-[#8b9099]"
            >
              <img
                src={showPassword ? "/icons/eye-logo.svg" : "/icons/eye-hide.svg"}
                alt=""
                className="size-4"
              />
            </button>
          </label>

          <button
            type="submit"
            className="mx-auto mt-10 block rounded-lg bg-black px-10 py-2.5 text-sm text-white cursor-pointer"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[#5c6370]">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsRegistering((current) => !current);
              setError("");
              setSuccess("");
              clearForm();
            }}
            className="font-bold text-black underline cursor-pointer"
          >
            {isRegistering ? "Login" : "Register now!"}
          </button>
        </p>
      </div>
    </div>
  );
}
