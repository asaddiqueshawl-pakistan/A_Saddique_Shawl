"use client";

import Link from "next/link";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create account."
        );
      }

      setSuccess(
        "Your account has been created successfully."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(
        error.message || "Something went wrong."
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
            <UserPlus
              size={24}
              className="text-black"
            />
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-[var(--text-primary)]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Create your account and start shopping.
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

          {/* Success */}
          {success && (
            <div className="mb-5 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Muhammad Bilal"
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

          {/* Email */}
          <div className="mt-5">

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

          {/* Phone */}
          <div className="mt-5">

            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="03XX XXXXXXX"
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
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

          {/* Confirm Password */}
          <div className="mt-5">

            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Confirm Password
            </label>

            <div className="relative">

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
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
                  setShowConfirmPassword(
                    (value) => !value
                  )
                }
                aria-label={
                  showConfirmPassword
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
                {showConfirmPassword ? (
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
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </button>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[var(--text-primary)] underline underline-offset-4 transition hover:text-[var(--primary-hover)]"
            >
              Login
            </Link>
          </p>

        </form>

      </div>

    </main>
  );
}