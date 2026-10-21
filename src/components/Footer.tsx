import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    // NEU: Footer-Links - alle Links besitzen echte Ziele und zugängliche Namen.
    <footer className="footer border-t border-[#44536A] bg-[#1C2636] p-10 text-[#A9B5C7] sm:footer-horizontal">
      <nav aria-label="Seitennavigation im Footer">
        <h2 className="footer-title text-white">Navigation</h2>
        <Link className="link-hover link" to="/">Startseite</Link>
        <Link className="link-hover link" to="/events">Events</Link>
        <Link className="link-hover link" to="/about">Über uns</Link>
      </nav>

      <nav aria-label="Projektlinks">
        <h2 className="footer-title text-white">Projekt</h2>
        <a
          className="link-hover link"
          href="https://github.com/Neykeb/eventBoard"
          target="_blank"
          rel="noreferrer"
          aria-label="Event Board auf GitHub öffnen"
        >
          GitHub-Repository
        </a>
      </nav>

      <p className="self-end">© 2026 Event Board</p>
    </footer>
  );
}
