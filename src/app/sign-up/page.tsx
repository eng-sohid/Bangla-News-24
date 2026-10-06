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
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="field-input"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
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
