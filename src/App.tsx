import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md">
        <div className="flex gap-4 justify-center mb-6">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo h-16 w-16 hover:scale-110 transition-transform" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react h-16 w-16 hover:scale-110 transition-transform" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Vite + React</h1>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-4">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Count is {count}
          </button>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Edit <code className="bg-gray-200 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-center text-sm text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
        
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p className="font-semibold">✅ Tailwind CSS is working!</p>
          <p className="text-sm">If you see this styled correctly, Tailwind is configured properly.</p>
        </div>
      </div>
    </div>
  )
}

export default App
