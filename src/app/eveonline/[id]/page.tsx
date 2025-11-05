"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, use } from "react";

interface EveonlineTemplateData {
  templateId: string;
  title?: string;
  id: string;
  url?: string;
  shortCode?: string;
  payload?: any;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IdPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [templateData, setTemplateData] =
    useState<EveonlineTemplateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const hasUserConnected = templateData?.payload !== undefined;

  const copyToClipboard = () => {
    if (templateData) {
      navigator.clipboard.writeText(JSON.stringify(templateData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fetchTemplateData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await fetch(`/api/memory?key=id:${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data?.value) {
          setTemplateData({ ...data.value, id });
          setLoading(false);
          return true;
        }
      }
      if (showLoading) {
        setError("Unable to find template data for this ID");
      }
      return false;
    } catch (err) {
      console.error("Error fetching template data:", err);
      if (showLoading) setError("Failed to load template data");
      return false;
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplateData(true);
  }, [id]);

  useEffect(() => {
    if (!hasUserConnected) {
      pollingIntervalRef.current = setInterval(() => {
        fetchTemplateData(false);
      }, 3000);
    }
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    };
  }, [hasUserConnected, id]);

  if (!loading && !templateData && !error) {
    router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-black to-blue-950 p-2 md:p-8 text-gray-100 pt-32 overflow-hidden">
      <main className="w-full max-w-4xl flex flex-col items-center space-y-8">
        <div className="flex flex-row items-center justify-center gap-6">
          <img
            src="/eve-logo.png"
            alt="EVE Online Logo"
            width={120}
            height={52}
            className="rounded-2xl"
          />
        </div>

        {templateData && (
          <div className="w-full bg-gray-950/60 border border-gray-700 shadow-lg backdrop-blur rounded-3xl p-8 text-center space-y-6">
            <h1 className="text-3xl font-bold">
              {hasUserConnected
                ? "EVE Online Profile Verified!"
                : "Connecting to EVE Online"}
            </h1>

            <p className="text-gray-300">
              {hasUserConnected
                ? "Your pilot profile has been verified! Here's the raw data:"
                : "Connect your EVE Online account to securely verify your character."}
            </p>

            <div className="relative">
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold transition"
              >
                {copied ? "Copied!" : "Copy JSON"}
              </button>
              <pre className="text-left bg-black p-6 rounded-2xl overflow-auto max-h-96 text-xs text-gray-300">
                {JSON.stringify(templateData, null, 2)}
              </pre>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {!hasUserConnected && templateData.url && (
                <a
                  href={templateData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-4 font-semibold shadow-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200"
                >
                  Connect EVE Online Account
                </a>
              )}
              <button
                onClick={() => router.push("/")}
                className="w-full rounded-full bg-gray-700 text-gray-200 px-6 py-4 font-semibold shadow hover:bg-gray-600 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full bg-gray-950/60 border border-gray-700 shadow-lg backdrop-blur rounded-3xl p-8 text-center space-y-6">
            <h1 className="text-3xl font-bold text-red-400">
              Something went wrong
            </h1>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="w-full rounded-full bg-gray-700 text-gray-200 px-6 py-4 font-semibold shadow hover:bg-gray-600 transition"
            >
              Back to Home
            </button>
          </div>
        )}

        <div className="h-12 w-full flex flex-col items-center justify-end space-y-2">
          <span className="text-gray-500 text-[10px]">Secured with</span>
          <img
            src="/images/opacity-name-logo.png"
            className="h-[20px] w-[73px] opacity-80"
            alt="opacity name logo"
          />
        </div>
      </main>
    </div>
  );
}
