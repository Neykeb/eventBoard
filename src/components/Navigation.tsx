import { UserButton, useAuth } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Navigation() {
  const { isSignedIn } = useAuth();
  // NEU: Mobiles Menü - React verwaltet den sichtbaren Zustand.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

    return (
      <>
        {/* NEU: Barrierefreiheit - nav kennzeichnet die Hauptnavigation. */}
        <nav
          className="navbar sticky top-0 z-40 border-b border-[#44536A] bg-[#222D3F]/95 px-4 text-white shadow-[0_8px_28px_rgba(12,19,31,0.18)] backdrop-blur sm:px-6 lg:px-8"
          aria-label="Hauptnavigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeMenu();
          }}
        >
          <div className="navbar-start">
            <div className="dropdown">
              {/* NEU: Barrierefreiheit - echter Button statt klickbarem div. */}
              <button
                type="button"
                aria-label={
                  isMenuOpen
                    ? "Navigationsmenü schließen"
                    : "Navigationsmenü öffnen"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className="btn btn-ghost text-[#CBD5E1] hover:bg-[#344359] lg:hidden"
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                 
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              {isMenuOpen ? (
                // NEU: Mobiles Menü - wird nur im geöffneten Zustand gerendert.
                <ul
                  id="mobile-navigation"
                  className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-xl border border-[#44536A] bg-[#29374A] p-2 text-[#CBD5E1] shadow-xl"
                >
                  <li>
                    <Link to="/" onClick={closeMenu}>
                      Startseite
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" onClick={closeMenu}>
                      Events
                    </Link>
                  </li>

                  <li>
                    <Link to="/about" onClick={closeMenu}>
                      Über uns
                    </Link>
                  </li>
                </ul>
              ) : null}
            </div>
            <Link to="/" className="text-xl font-semibold tracking-tight text-[#FF6B89]">
              Event Board
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 px-1 text-sm text-[#CBD5E1] [&_a]:rounded-lg [&_a]:px-4 [&_a]:py-2 [&_a]:transition [&_a:hover]:bg-[#344359] [&_a:hover]:text-white">
              <li>
                <Link to="/">Startseite</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>

              <li>
                <Link to="/about">Über uns</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link to="/login" className="rounded-xl border border-[#56657B] px-4 py-2 text-sm font-medium text-[#CBD5E1] transition hover:border-[#F45277] hover:text-white">
                Anmelden
              </Link>
            )}
          </div>
        </nav>
      </>
    );
}
