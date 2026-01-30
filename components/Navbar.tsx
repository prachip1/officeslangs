'use client'

export default function Navbar() {
  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-bold tracking-tight rounded-2xl px-4 py-2 transition-shadow hover:shadow-[var(--shadow-hover)] text-[var(--text)] bg-[var(--surface)]"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              😋 officeslangs
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
