import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortCode(null);

    try {
      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
      } else {
        setShortCode(data.shortCode);
        setUrl(""); // Clear input after successful submission
      }
    } catch (err) {
      setError("Failed to shorten URL");
    }
  }

  return (
    <main className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          aria-label="URL to shorten"
        />
        <button type="submit">Shorten</button>
      </form>
      
      {error && <p className="error" role="alert">{error}</p>}
      {shortCode && (
        <p>
          Shortened URL: <a href={`http://localhost:3000/${shortCode}`} target="_blank" rel="noopener noreferrer">
            {`http://localhost:3000/${shortCode}`}
          </a>
        </p>
      )}
    </main>
  );
}

export default App;
