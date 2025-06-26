"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a PDF!");

    const formData = new FormData();
    formData.append("pdf", file);

    setLoading(true);

    try {
      const res = await fetch("https://your-n8n-domain.com/webhook/pdf-bot", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data.message || "PDF sent successfully.");
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Label htmlFor="pdf">Upload a PDF</Label>
        <Input id="pdf" type="file" accept="application/pdf" onChange={handleFileChange} />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </Button>
        {response && <p className="text-sm text-muted-foreground">{response}</p>}
      </div>
    </main>
  );
}
