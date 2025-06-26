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
    if (!file) return alert("Please upload a file!");

    const formData = new FormData();
    formData.append("data", file); // Must be "data" for n8n webhook to accept binary

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://140.228.254.22:5678/webhook/pdf-bot", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setResponse(data.message || "✅ File sent successfully.");
    } catch (error) {
      console.error(error);
      setResponse("❌ Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-md space-y-4">
        <Label htmlFor="upload">Upload PDF or Sheet</Label>
        <Input
          id="upload"
          type="file"
          accept=".pdf,.xlsx,.xls,.csv"
          onChange={handleFileChange}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </Button>
        {response && <p className="text-sm text-muted-foreground">{response}</p>}
      </div>
    </main>
  );
}
