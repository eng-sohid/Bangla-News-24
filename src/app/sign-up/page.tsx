"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";
import SocialButtons from "@/src/components/SocialButtons";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const image = String(form.get("image") ?? "").trim();

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")).trim(),
      email: String(form.get("email")),
      password: String(form.get("password")),
      // ছবি না দিলে পাঠানো হবে না
      ...(image && { image }),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
    router.push("/");
    router.refresh();
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto my-12 w-full max-w-md px-4">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="font-serif text-3xl font-extrabold">
            নতুন অ্যাকাউন্ট
          </h1>
          <p className="mt-1 text-sm text-muted">
            কয়েক সেকেন্ডেই যোগ দিন Bangla News 24-এ
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-semibold"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="field-input"
              placeholder="আপনার নাম"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-1.5 block text-sm font-semibold"
            >
              ছবির লিংক <span className="font-normal text-muted">(ঐচ্ছিক)</span>
            </label>
            <input
              id="image"
              name="image"
              type="url"
              className="field-input"
              placeholder="https://..."
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field-input"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                className="field-input pr-12"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-brand"
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
              >
                {showPassword ? (
                  // Eye Off
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61C3.86 8.6 2 12 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  // Eye
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-brand">
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
          </button>
        </form>

        <div className="mt-6">
          <SocialButtons />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-bold text-brand hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
