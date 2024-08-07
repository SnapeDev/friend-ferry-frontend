import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "termly-jssdk";
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="text-center pt-28">
      <h1>Privacy Policy</h1>
      <div
        name="termly-embed"
        data-id="2af0c5c8-cdab-40bf-8ed7-7b53eb40c695"
      ></div>
    </div>
  );
}
