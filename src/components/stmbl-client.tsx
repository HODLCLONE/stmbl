"use client";

import { useCallback, useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import type { DiscoveryItem, DiscoveryResponse } from "@/lib/discovery";

const MAX_SEEN_IDS = 40;

async function loadItem(seenIds: string[] = []): Promise<DiscoveryResponse> {
  const params = new URLSearchParams();
  if (seenIds.length > 0) {
    params.set("seen", seenIds.join(","));
  }

  const query = params.toString();
  const response = await fetch(`/api/discover${query ? `?${query}` : ""}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load discovery item");
  return (await response.json()) as DiscoveryResponse;
}

async function openItem(item: DiscoveryItem) {
  const inMiniApp = await sdk.isInMiniApp().catch(() => false);

  if (inMiniApp) {
    if (item.type === "cast") {
      await sdk.actions.viewCast({ hash: item.hash, authorUsername: item.authorUsername });
      return;
    }

    if (item.type === "user" && item.fid) {
      await sdk.actions.viewProfile({ fid: item.fid });
      return;
    }

    await sdk.actions.openUrl(item.href);
    return;
  }

  window.location.href = item.href;
}

export function StmblClient() {
  const [item, setItem] = useState<DiscoveryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [seenIds, setSeenIds] = useState<string[]>([]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const payload = await loadItem(seenIds);
      setItem(payload.item);
      setSeenIds((current) => (current.includes(payload.item.id) ? current : [...current, payload.item.id].slice(-MAX_SEEN_IDS)));
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
      <section className="glass-panel control-panel" aria-label="Discovery controls">
        <button type="button" className="stumble-button" onClick={() => void refresh()}>
          STUMBLE
        </button>
      </section>

      <section className="glass-panel card-panel" aria-label="Discovery result">
        {loading || !item ? (
          <div className="loading-state">
            <div className="loading-orb" />
            <p>Scanning Farcaster…</p>
          </div>
        ) : (
          <>
            <div className="card-meta-row">
              <span className="item-type">{item.type}</span>
              <span className="score-chip">score {Math.round(item.neynarScore * 100)}</span>
            </div>
            <div className="result-link">
              <h2>{item.author}</h2>
              <p className="handle-line">{item.handle}</p>
              <p className="body-copy">{item.type === "cast" ? `“${item.text}”` : item.bio}</p>
              <div className="detail-grid">
                <div>
                  <span className="detail-label">Where</span>
                  <p>{item.type === "cast" ? item.channel : item.type === "channel" ? "Channel" : "Person"}</p>
                </div>
                <div>
                  <span className="detail-label">Signal</span>
                  <p>{item.engagement}</p>
                </div>
              </div>
            </div>
            <div className="action-row">
              <button type="button" className="action-button text-link" onClick={() => void openItem(item)}>
                Open
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
