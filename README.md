# React UseMobile Hook

Ce projet contient un hook personnalisé React permettant de détecter si l'utilisateur navigue sur un appareil mobile en fonction de la largeur de l'écran.

## Installation

Copiez le fichier `use-mobile.jsx` dans votre dossier de hooks (par exemple : `src/hooks/use-mobile.jsx`).

## Code du Hook

```jsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

## Utilisation

Voici comment utiliser ce hook dans un composant React :

```jsx
import { useIsMobile } from "./hooks/use-mobile"

function MonComposant() {
  const isMobile = useIsMobile()

  return (
    <div>
      {isMobile ? <p>Mode Mobile</p> : <p>Mode Bureau (Desktop)</p>}
    </div>
  )
}
```

