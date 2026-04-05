"use client";

import { useCallback, useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import type { DiscoveryItem } from "@/lib/mock-discovery";

async function loadItem(excludeIds: string[] = []): Promise<DiscoveryItem> {
  const query = excludeIds.length > 0 ? `?exclude=${encodeURIComponent(excludeIds.join(","))}` : "";
  const response = await fetch(`/api/discover${query}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load discovery item");
  const data = (await response.json()) as { item: DiscoveryItem };
  return data.item;
}

export function StmblClient() {
  const [item, setItem] = useState<DiscoveryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [seenIds, setSeenIds] = useState<string[]>([]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const nextItem = await loadItem(seenIds);
      setItem(nextItem);
      setSeenIds((current) => {
        if (current.includes(nextItem.id)) return current;
        return [...current, nextItem.id];
      });
    } finally {
      setLoading(false);
    }
  }, [seenIds]);

  useEffect(() => {
    void sdk.actions.ready().catch(() => {
      // Ignore when outside Farcaster mini app host.
    });
  }, []);

  useEffect(() => {
    if (!item) {
      void refresh();
    }
  }, [item, refresh]);

  return (
    <div className="stmbl-shell">
      <header className="glass-panel hero-panel">
        <div>
          <h1>Find your next corner of Farcaster.</h1>
          <p className="hero-copy">STMBL surfaces real users, channels, and casts.</p>
        </div>
      </header>

      <section className="glass-panel control-panel" aria-label="Discovery controls">
        <button type="button" className="stumble-button" onClick={() => void refresh()}>
          STUMBLE
        </button>
      </section>

      <section className="glass-panel card-panel" aria-label="Discovery result">
        {loading || !item ? (
          <div className="loading-state">
            <div className="loading-orb" />
          </div>
        ) : (
          <>
            <a href={item.href} target="_blank" rel="noreferrer" className="result-link">
              <h2>{item.author}</h2>
              <p className="handle-line">{item.handle}</p>
              <p className="body-copy">“{item.text}”</p>
              <div className="detail-grid">
                <div>
                  <span className="detail-label">Where</span>
                  <p>{item.channel}</p>
                </div>
                <div>
                  <span className="detail-label">Why now</span>
                  <p>{item.engagement}</p>
                </div>
              </div>
            </a>
            <div className="action-row">
              <a href={item.href} target="_blank" rel="noreferrer" className="action-button text-link">
                Open
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
