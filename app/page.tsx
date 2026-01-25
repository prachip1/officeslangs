import Translator from '@/components/Translator'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#333C4D' }}>
              Office Slang Translator
            </h1>
            <p className="text-lg" style={{ color: '#333C4D' }}>
              Translate corporate language into clear, simple English
            </p>
          </header>
          
          <Translator />
        </div>
      </main>
    </div>
  )
}
