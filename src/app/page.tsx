"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { eveonlineProfile, eveonlineLogout } from "@/lib/templates";
import { motion } from "framer-motion";
import { Loader2, Shield } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleTemplateClick = async (templateId: string, name: string) => {
    try {
      console.log("templateId", templateId);
      setIsLoading(templateId);

      const response = await fetch("/api/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      if (!response.ok) throw new Error("Failed to process template");

      const data = await response.json();
      router.push(`/${name}/${data.id}`);
    } catch (error) {
      console.error("Error processing template:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-black to-blue-950 p-8 font-sans text-gray-100 pt-32">
      <main className="w-full max-w-2xl flex flex-col items-center space-y-10">
        <motion.div
          className="flex flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* <img
            src="/eve-logo.png"
            alt="EVE Online Logo"
            width={120}
            height={52}
            className="rounded-2xl"
          /> */}
        </motion.div>

        {/* Header */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Verify Your EVE Online Profile
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent">
            Share Your Pilot Credentials
          </span>
        </motion.h1>

        <div className="text-center space-y-4 max-w-lg">
          <p className="text-gray-300/90">
            {
              "Use Opacity's multipass to securely verify your EVE Online character history and achievements."
            }
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 bg-cyan-400/10 rounded-lg py-2 px-4">
            <Shield className="h-4 w-4" />
            <span>Privacy-first verification</span>
          </div>
        </div>

        {/* Template Buttons */}
        <div className="grid gap-5 sm:grid-cols-1 w-full">
          <motion.button
            key={eveonlineProfile.templateId}
            onClick={() => {
              console.log(
                "eveonlineProfile.templateId",
                eveonlineProfile.templateId
              );
              return handleTemplateClick(
                eveonlineProfile.templateId,
                "eveonline"
              );
            }}
            disabled={isLoading !== null}
            className={`rounded-full bg-[#00A8E1] shadow-[0_0_0_1px_rgba(0,168,225,0.1),0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_0_0_1px_rgba(0,168,225,0.2),0_14px_40px_rgba(0,168,225,0.1)] transition-all duration-200 flex items-center justify-center py-5 px-8 font-semibold text-white hover:scale-[1.02]`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Connect EVE Online and verify your pilot profile"
          >
            {isLoading === eveonlineProfile.templateId ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              <span>Connect EVE Online</span>
            )}
          </motion.button>
          <motion.button
            key={eveonlineLogout.templateId}
            onClick={() => {
              console.log(
                "eveonlineLogout.templateId",
                eveonlineLogout.templateId
              );
              return handleTemplateClick(
                eveonlineLogout.templateId,
                "eveonline"
              );
            }}
            disabled={isLoading !== null}
            className={`rounded-full bg-gray-800 shadow-[0_0_0_1px_rgba(0,168,225,0.1),0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_0_0_1px_rgba(0,168,225,0.2),0_14px_40px_rgba(0,168,225,0.1)] transition-all duration-200 flex items-center justify-center py-5 px-8 font-semibold text-gray-100 hover:scale-[1.02]`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Logout from EVE Online"
          >
            {isLoading === eveonlineLogout.templateId ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              <span>Logout EVE Online</span>
            )}
          </motion.button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-center">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-sm text-gray-300">Character History</div>
            <div className="text-xs text-gray-500">Complete pilot record</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm text-gray-300">Privacy Protected</div>
            <div className="text-xs text-gray-500">Zero-knowledge proofs</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-sm text-gray-300">Verified Achievements</div>
            <div className="text-xs text-gray-500">Cryptographic proof</div>
          </div>
        </div>

        {/* How it works */}
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-200">
            How Opacity Multipass Works
          </h3>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-cyan-400">1</span>
              </div>
              <div>
                <span className="text-gray-300">
                  Connect your EVE Online account
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  Securely authenticate with EVE Online SSO
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-cyan-400">2</span>
              </div>
              <div>
                <span className="text-gray-300">
                  Generate cryptographic proof
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  Create zero-knowledge proof of your character history
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-cyan-400">3</span>
              </div>
              <div>
                <span className="text-gray-300">Share your verification</span>
                <div className="text-xs text-gray-500 mt-1">
                  Prove your pilot credentials without revealing sensitive data
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tiny footnote */}
        <div className="h-12 w-full flex flex-col items-center justify-end space-y-2">
          <span className="text-gray-600 text-[10px]">Secured with</span>
          <img
            src="/images/opacity-name-logo.png"
            className="h-[20px] w-[73px]"
            alt="opacity name logo"
          />
        </div>
      </main>
    </div>
  );
}
