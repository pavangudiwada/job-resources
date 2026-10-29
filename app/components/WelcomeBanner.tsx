"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => !sessionStorage.getItem("welcomeBannerDismissed");
const getServerSnapshot = () => false;

export default function WelcomeBanner() {
  const [dismissed, setDismissed] = useState(false);
  const isVisible =
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) &&
    !dismissed;

  const handleClose = () => {
    setDismissed(true);
    sessionStorage.setItem("welcomeBannerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-banner">
      <div className="welcome-inner">
        <div className="welcome-copy">
          <p className="text-sm">
            <span className="font-semibold">Welcome to Job Resources!</span>{" "}
            We&apos;re expanding soon with{" "}
            <span className="font-medium">
              communities, learning resources, and more
            </span>{" "}
            to supercharge your job hunt. Stay tuned!
          </p>
        </div>
        <button
          onClick={handleClose}
          className="welcome-close"
          aria-label="Close banner"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
