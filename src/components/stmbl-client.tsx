"use client";

import { useCallback, useEffect, useState } from "react";
import type { DiscoveryItem, DiscoveryMode } from "@/lib/mock-discovery";

async function loadItem(mode: DiscoveryMode): Promise<DiscoveryItem> {
  const response = await fetch(`/api/discover?mode=${mode}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load discovery item");
  const data = (await response.json()) as { item: DiscoveryItem };
  return data.item;
}

function itemTypeLabel(item: DiscoveryItem) {
  return item.type === "cast" ? "Cast" : "Person";
}

function contextLabel(item: DiscoveryItem) {
  return item.type === "cast" ? item.channel : "Profile";
}

export function StmblClient() {
  const [mode] = useState<DiscoveryMode>("random");
  const [item, setItem] = useState<DiscoveryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);

  const refresh = useCallback(async (nextMode: DiscoveryMode) => {
    setLoading(true);
    try {
      const nextItem = await loadItem(nextMode);
      setItem(nextItem);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(mode);
  }, [mode, refresh]);

  const onSave = () => {
    if (!item) return;
    setSaved((current) => (current.includes(item.id) ? current : [...current, item.id]));
  };

  return (
    <div className="stmbl-shell">
      <header className="glass-panel hero-panel">
        <div>
          <h1>Find your next corner of Farcaster.</h1>
          <p className="hero-copy">
            STMBL is a fast way to surface people, casts, and niche pockets worth opening when the main feed feels noisy.
          </p>
        </div>
      </header>

      <section className="glass-panel control-panel" aria-label="Discovery controls">
        <button type="button" className="stumble-button" onClick={() => void refresh(mode)}>
          STUMBLE
        </button>
      </section>

      <section className="glass-panel card-panel" aria-label="Discovery result">
        {loading || !item ? (
          <div className="loading-state">
            <div className="loading-orb" />
            <p>Finding something worth your tap…</p>
          </div>
        ) : (
          <>
            <div className="card-meta-row">
              <span className="item-type">{itemTypeLabel(item)}</span>
              <span className="score-chip">{mode === "people" ? "people pick" : mode === "niche" ? "deep cut" : "fresh pick"}</span>
            </div>
            <h2>{item.author}</h2>
            <p className="handle-line">{item.handle}</p>
            <p className="reason-line">{item.reason}</p>
            {item.type === "cast" ? <p className="body-copy">“{item.text}”</p> : <p className="body-copy">{item.bio}</p>}
            <div className="detail-grid">
              <div>
                <span className="detail-label">Where</span>
                <p>{contextLabel(item)}</p>
              </div>
              <div>
                <span className="detail-label">Why now</span>
                <p>{item.engagement}</p>
              </div>
            </div>
            <div className="action-row">
              <button type="button" className="action-button" onClick={() => void refresh(mode)}>
                Next
              </button>
              <button type="button" className="action-button" onClick={onSave}>
                {saved.includes(item.id) ? "Saved" : "Save"}
              </button>
              <a href={item.href} target="_blank" rel="noreferrer" className="action-button is-link">
                Open
              </a>
            </div>
          </>
        )}
      </section>

    </div>
  );
}
