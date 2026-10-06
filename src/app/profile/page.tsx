"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";

const FALLBACK_AVATAR =
  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const image = String(form.get("image") ?? "").trim();

    setSaving(true);
    const { error } = await authClient.updateUser({
      ...(name && { name }),
      ...(image && { image }),
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
      return;
    }
    toast.success("প্রোফাইল আপডেট হয়েছে");
    setShow(false);
  };

  // লোড হচ্ছে
  if (isPending) {
    return (
      <div className="mx-auto my-12 max-w-xl px-4">
        <div className="h-72 animate-pulse rounded-2xl bg-line" />
      </div>
    );
  }

  // সাইন ইন করা নেই
  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-24 text-center">
        <span className="text-5xl">🔒</span>
        <p className="font-serif text-xl font-bold">আপনি সাইন ইন করেননি</p>
        <p className="text-muted">প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>
        <Link href="/sign-in" className="btn-brand mt-2 !w-auto">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("bn-BD", {
        dateStyle: "long",
      })
    : null;

  return (
    <div className="mx-auto my-12 w-full max-w-xl px-4">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        {/* কভার */}
        <div className="h-28 bg-gradient-to-r from-ink via-brand-dark to-brand sm:h-36" />

        <div className="px-6 pb-8 sm:px-8">
          {/* অ্যাভাটার: কভারের ওপর উঠে থাকবে */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={user.name || "User avatar"}
            src={user.image || FALLBACK_AVATAR}
            className="-mt-12 h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
          />

          <h1 className="mt-4 font-serif text-2xl font-extrabold">
            {user.name}
          </h1>
          <p className="text-muted">{user.email}</p>
          {joined && (
            <p className="mt-1 text-xs text-muted">সদস্য হয়েছেন: {joined}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              {show ? "বাতিল করুন" : "প্রোফাইল এডিট করুন"}
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand transition-colors hover:bg-red-50"
            >
              সাইন আউট
            </button>
          </div>

          {show && (
            <form
              onSubmit={handleProfileUpdate}
              className="mt-6 space-y-4 rounded-xl border border-line bg-paper p-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  নতুন নাম
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  className="field-input"
                  placeholder="আপনার নাম"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  নতুন ছবির লিংক
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={user.image ?? ""}
                  className="field-input"
                  placeholder="https://..."
                />
              </div>

              <button type="submit" disabled={saving} className="btn-brand">
                {saving ? "সংরক্ষণ হচ্ছে..." : "আপডেট করুন"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
