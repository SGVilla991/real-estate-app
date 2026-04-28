"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "@/app/actions/favorites";

export default function FavoriteButton({
  propertyId,
  initialFavorited,
  isLoggedIn,
}: {
  propertyId: string;
  initialFavorited: boolean;
  isLoggedIn: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const next = !favorited;
    setFavorited(next);
    startTransition(async () => {
      const result = await toggleFavorite(propertyId, favorited);
      if (result.error) setFavorited(favorited);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
      className={`p-2 rounded-full transition-all ${
        favorited
          ? "bg-red-500 text-white shadow-md"
          : "bg-white/90 text-muted hover:text-red-500 hover:bg-white shadow"
      }`}
    >
      <svg
        className="w-4 h-4"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
