"use client";

import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    const scriptId = "termly-jssdk";

    // Check if the script is already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://app.termly.io/embed-policy.min.js";
      script.async = true;

      document.body.appendChild(script);
    }

    // Cleanup function to remove the script if the component unmounts
    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="text-center pt-28">
      <div
        name="termly-embed"
        data-id="2af0c5c8-cdab-40bf-8ed7-7b53eb40c695"
      ></div>
    </div>
  );
}
