"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";
import SocialButtons from "@/src/components/SocialButtons";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-[calc(100vh-164px)] bg-paper px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl text-white shadow-lg">
            🔐
          </div>

          <h1 className="font-serif text-3xl font-extrabold text-ink sm:text-4xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-muted sm:text-base">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-lg sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand px-4 py-3 font-bold text-white shadow-md transition-all duration-200 hover:brightness-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />

            <span className="text-xs font-medium text-muted">অথবা</span>

            <div className="h-px flex-1 bg-line" />
          </div>

          {/* Social Login */}
          <SocialButtons />

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-muted">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-brand transition-colors hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-muted">
          আপনার তথ্য নিরাপদ এবং সুরক্ষিত থাকবে।
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
