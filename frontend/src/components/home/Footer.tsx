import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-16 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl font-bold text-white">Nexorith Studio</p>
          <p className="mt-2 text-sm text-white/40">
            © {new Date().getFullYear()} Nexorith Studio. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-white/50">
          <a href="#services" className="hover:text-white">
            Services
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
          <Link href="/status" className="hover:text-white">
            Track Project
          </Link>
          {\* <Link href="/admin/login" className="hover:text-white">
            Admin
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
