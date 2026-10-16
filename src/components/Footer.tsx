import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    // NEU: Footer-Links - alle Links besitzen echte Ziele und zugängliche Namen.
    <footer className="footer bg-base-300 p-10 text-base-content sm:footer-horizontal">
      <nav aria-label="Seitennavigation im Footer">
        <h2 className="footer-title">Navigation</h2>
        <Link className="link-hover link" to="/">Startseite</Link>
        <Link className="link-hover link" to="/events">Events</Link>
        <Link className="link-hover link" to="/about">Über uns</Link>
      </nav>

      <nav aria-label="Projektlinks">
        <h2 className="footer-title">Projekt</h2>
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
