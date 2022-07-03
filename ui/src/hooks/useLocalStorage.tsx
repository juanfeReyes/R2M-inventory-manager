import { useState } from "react"

export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try{
      const value = window.sessionStorage.getItem(keyName)

      if(value){
        return JSON.parse(value)
      }
  
      window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue))
      return defaultValue
    }
    catch(e){
      return defaultValue
    }
  })

  const setValue = (value: any) => {
    window.sessionStorage.setItem(keyName, JSON.stringify(value))
    setStoredValue(value)
  }

  return [storedValue, setValue]
}