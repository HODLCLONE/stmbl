import Link from "next/link";
import { StmblClient } from "@/components/stmbl-client";

export default function Home() {
  return (
    <main className="page-shell">
      <nav className="top-nav" aria-label="Primary">
        <div className="brand-block">
          <span className="brand-mark">ST</span>
          <div>
            <p className="brand-name">STMBL</p>
          </div>
        </div>
        <div className="nav-links">
          <Link href="/settings">Settings</Link>
        </div>
      </nav>
      <StmblClient />
    </main>
  );
}
