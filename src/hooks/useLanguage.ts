'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { Language, getTranslation, TranslationKey } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    // Fallback para cuando no hay contexto
    const [language, setLanguage] = useState<Language>('es')
    
    useEffect(() => {
      const savedLang = localStorage.getItem('language') as Language
      if (savedLang) {
        setLanguage(savedLang)
      }
    }, [])
    
    const t = (key: TranslationKey) => getTranslation(language, key)
    
    return { language, setLanguage, t }
  }
  return context
}

export const useLanguageStorage = () => {
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: TranslationKey) => getTranslation(language, key)

  return { language, setLanguage, t }
}
