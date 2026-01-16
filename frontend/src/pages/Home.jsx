"use client"

import { useState, useEffect } from "react"
import { FiBell, FiSettings,  FiSun, FiMoon } from "react-icons/fi"
import IntegrationLogsSection from "../components/IntegrationLogsSection"
import PromptLibrarySection from "../components/PromptLibrarySection"
import PromptPlaygroundSection from "../components/PromptPlaygroundSection"
import AnalyticsSection from "../components/AnalyticsSection"
import SafetyConfigSection from "../components/SafetyConfigSection"
import "../styles/globals.css"

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState(null)

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDark])


  return (
    <div className="h-screen bg-background flex flex-col">
      
      {/* ===== Sticky Header ===== */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Title */}
          <div className="-ml-4 text-left">
  <h1 className="font-brighter font-semibold text-3xl text-foreground">
    Merchant Management System
  </h1>
  <p className="font-noto text-muted-foreground mt-1 text-sm">
    Keep track of your merchants, their contacts, and business information quickly and easily.
  </p>
</div>


          {/* Icons */}
      <div className="flex items-center space-x-4">
        {/* Dark / Light Toggle */}
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <FiSun className="w-5 h-5 text-foreground" />
          ) : (
            <FiMoon className="w-5 h-5 text-foreground" />
          )}
        </button>

        <FiBell className="w-6 h-6 text-foreground hover:text-accent cursor-pointer" />
        <FiSettings className="w-6 h-6 text-foreground hover:text-accent cursor-pointer" />
      </div>

        </div>
      </header>

      {/* ===== Scrollable Content ===== */}
      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-7xl mx-auto">

          {/* Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-3 h-[calc(115vh-217px)]">
              <PromptLibrarySection
                onSelectPrompt={setSelectedPrompt}
                selectedPrompt={selectedPrompt}
              />
            </div>

            <div className="lg:col-span-2 h-[calc(112vh-220px)]">
              <PromptPlaygroundSection selectedPrompt={selectedPrompt} />
            </div>
          </div>

          {/* Analytics */}
          <AnalyticsSection />

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <IntegrationLogsSection />
            <SafetyConfigSection />
          </div>

        </div>
      </main>
    </div>
  )
}
