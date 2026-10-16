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
          className="navbar bg-base-100 shadow-sm"
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
                className="btn btn-ghost lg:hidden"
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
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
            <Link to="/" className="text-2xl text-[#F95F7A]">
              Event Board
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
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
              <Link to="/login" className="btn">
                Anmelden
              </Link>
            )}
          </div>
        </nav>
      </>
    );
}
