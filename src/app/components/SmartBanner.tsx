"use client";

import { useState, useEffect } from "react";

export const isIOS = (): boolean => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Macintosh") && "ontouchend" in document)
  );
};

const appStoreUrl = "https://apps.apple.com/us/app/opacity-pass/id6743722717";
const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.opacity.app";

const AppUrl = isIOS() ? appStoreUrl : playStoreUrl;

const SmartBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show for Android devices
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent) || isIOS()) {
      // Check if the user has previously dismissed the banner
      const dismissedTime = localStorage.getItem("smartBannerDismissed");
      if (
        !dismissedTime ||
        Date.now() - parseInt(dismissedTime) > 7 * 24 * 60 * 60 * 1000
      ) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleOpenApp = () => {
    window.open(AppUrl, "_blank");
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal time in localStorage
    localStorage.setItem("smartBannerDismissed", Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-300 border-b border-gray-200 shadow-md p-3 flex items-center z-50">
      <div className="flex-1 flex flex-row gap-2 items-center">
        <div className="h-12 w-12 items-center place-content-center flex rounded-lg bg-blue-600">
          <img
            src="/images/white.png"
            className="h-5 w-auto pl-1 opacity-100"
            alt="Opacity Logo"
          />
        </div>
        <div>
          <div className="font-bold text-black ">Opacity Pass</div>
          <div className="text-sm text-gray-600">
            Get the best experience in our app
          </div>
        </div>
      </div>
      <button
        onClick={handleOpenApp}
        className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm mr-2"
      >
        Open
      </button>
      <button
        onClick={handleDismiss}
        className="text-black text-xl opacity-0 pointer-events-none"
      >
        &times;
      </button>
    </div>
  );
};

export default SmartBanner;
