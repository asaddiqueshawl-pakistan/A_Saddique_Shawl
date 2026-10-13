"use client";

import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   setError("");
  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(
  //         data.message || "Invalid email or password"
  //       );
  //     }

  //     /*
  //      * Temporary:
  //      * We will replace this with an HTTP-only cookie
  //      * when we build the complete authentication system.
  //      */
  //     // localStorage.setItem("watch-store-token", data.token);
  //     // localStorage.setItem(
  //     //   "watch-store-user",
  //     //   JSON.stringify(data.user)
  //     // );

  //     router.push("/");
  //     router.refresh();
  //   } catch (error) {
  //     setError(
  //       error.message || "Something went wrong. Please try again."
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "/api/auth/login",
        formData
      );

      const data = response.data;

      /*
       * Temporary:
       * We will replace this with an HTTP-only cookie
       * when we build the complete authentication system.
       */
      // localStorage.setItem("watch-store-token", data.token);
      // localStorage.setItem(
      //   "watch-store-user",
      //   JSON.stringify(data.user)
      // );
      
      router.refresh();
      router.push("/");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">

      <div className="mx-auto flex max-w-md flex-col px-5 py-16 sm:py-20">

        {/* Header */}
        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[var(--primary)]">
            <LogIn
              size={24}
              className="text-black"
            />
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-[var(--text-primary)]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Login to your account to continue shopping.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 border border-[var(--border)] bg-white p-6 sm:p-8"
        >

          {/* Error */}
          {error && (
            <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="
                h-12
                w-full
                border
                border-[var(--border)]
                bg-white
                px-4
                text-sm
                text-[var(--text-primary)]
                outline-none
                placeholder:text-gray-400
                focus:border-[var(--primary)]
              "
            />

          </div>

          {/* Password */}
          <div className="mt-5">

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Password
            </label>

            <div className="relative">

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  h-12
                  w-full
                  border
                  border-[var(--border)]
                  bg-white
                  px-4
                  pr-12
                  text-sm
                  text-[var(--text-primary)]
                  outline-none
                  placeholder:text-gray-400
                  focus:border-[var(--primary)]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="
                  absolute
                  right-0
                  top-0
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)]
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              mt-7
              flex
              w-full
              items-center
              justify-center
              bg-[var(--primary)]
              px-6
              py-4
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-[var(--primary-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="
                font-medium
                text-[var(--text-primary)]
                underline
                underline-offset-4
                transition
                hover:text-[var(--primary-hover)]
              "
            >
              Create Account
            </Link>
          </p>

        </form>

      </div>

    </main>
  );
}