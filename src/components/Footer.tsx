import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-2">
      <div className="mx-auto max-w-6xl px-5 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <p>
          © {new Date().getFullYear()} sandra tang · press ` on any page to
          open the terminal
        </p>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hover:text-accent">
            projects
          </Link>
          <Link href="/music" className="hover:text-accent">
            music
          </Link>
          <Link href="/resume" className="hover:text-accent">
            resume
          </Link>
          <a
            href="mailto:st2232@cornell.edu"
            className="hover:text-accent"
            aria-label="email"
          >
            email
          </a>
          <a
            href="https://www.linkedin.com/in/sandra-tang-651ab1333/"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-accent"
            aria-label="linkedin"
          >
            linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}
