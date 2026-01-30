import Translator from '@/components/Translator'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--cute-bg) 0%, var(--cute-bg-end) 50%, #F5F0FF 100%)',
      }}
    >
      <div className="relative z-10">
        <Navbar />
        <main className="py-10 sm:py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight" style={{ color: 'var(--cute-text)' }}>
                Ask me up!
              </h1>
              <p className="text-lg sm:text-xl" style={{ color: 'var(--cute-text-soft)' }}>
                Translate corporate speak into clear, simple English ✨
              </p>
            </header>

            <Translator />
          </div>
        </main>
      </div>
    </div>
  )
}
