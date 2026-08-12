import React, { useState, useEffect } from 'react'
import { useIsMobile } from './hooks/use-mobile.jsx'

export default function App() {
  const isMobile = useIsMobile()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  // Simulation de réception de données en temps réel
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        const systemMessages = [
          "Connexion stable au serveur NGteam...",
          "Nouvelle mise à jour synchronisée.",
          "Utilisateur connecté à l'application."
        ]
        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)]
        setMessages((prev) => [...prev, { id: Date.now(), text: randomMessage, time: new Date().toLocaleTimeString() }])
      }, 7000)
      return () => clearInterval(interval)
    }
  }, [user])

  const handleLogin = (e) => {
    e.preventDefault()
    setUser({ name: "Développeur NGteam" })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages((prev) => [...prev, { id: Date.now(), text: input, time: new Date().toLocaleTimeString(), self: true }])
    setInput('')
  }

  // Écran de Connexion si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
        <div className="w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-center text-teal-400 mb-2">NGteam</h2>
          <p className="text-sm text-slate-400 text-center mb-6">Application Temps Réel {isMobile ? '(Mobile)' : '(Bureau)'}</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Identifiant</label>
              <input type="text" required className="w-full rounded bg-slate-700 p-2 text-white border border-slate-600 focus:outline-none focus:border-teal-500" placeholder="Votre nom" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <input type="password" required className="w-full rounded bg-slate-700 p-2 text-white border border-slate-600 focus:outline-none focus:border-teal-500" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full rounded bg-teal-500 p-2 font-semibold text-slate-950 hover:bg-teal-400 transition">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Écran Principal de l'Application Temps Réel
  return (
    <div className="flex h-screen flex-col bg-slate-900 text-slate-100">
      {/* Barre supérieure */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4 shadow">
        <h1 className="text-xl font-bold text-teal-400">NGteam Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-slate-400 hidden sm:inline">Flux Temps Réel Actif</span>
          <button onClick={() => setUser(null)} className="ml-4 text-xs bg-slate-800 px-2 py-1 rounded hover:bg-slate-700">Déconnexion</button>
        </div>
      </header>

      {/* Zone principale */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="bg-slate-800/50 p-3 rounded border border-slate-700 text-xs text-slate-400">
          Mode d'affichage détecté : <span className="text-teal-400 font-mono font-bold">{isMobile ? "MOBILE" : "DESKTOP"}</span>
        </div>

        {messages.length === 0 ? (
          <p className="text-center text-slate-500 my-8 text-sm">En attente de données ou de messages en temps réel...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col max-w-[80%] rounded p-3 ${msg.self ? 'bg-teal-600 ml-auto text-slate-950' : 'bg-slate-800 mr-auto border border-slate-700'}`}>
              <p className="text-sm font-medium">{msg.text}</p>
              <span className="text-[10px] opacity-60 self-end mt-1">{msg.time}</span>
            </div>
          ))
        )}
      </main>

      {/* Formulaire d'envoi en bas */}
      <footer className="border-t border-slate-800 bg-slate-950 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Envoyer une commande ou un message..." className="flex-1 rounded bg-slate-800 p-2 text-white border border-slate-700 focus:outline-none focus:border-teal-500 text-sm" />
          <button type="submit" className="rounded bg-teal-500 px-4 py-2 font-semibold text-slate-950 hover:bg-teal-400 text-sm">Envoyer</button>
        </form>
      </footer>
    </div>
  )
      }
