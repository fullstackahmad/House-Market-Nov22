import {useEffect, useState, useRef } from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const isMounted = useRef(true)

  useEffect( () => {
    if (isMounted) {
      const auth = getAuth()
      console.log('useAuthStatus is fired')
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setLoggedIn(true)
        }
        setCheckingStatus(false)
      })
    }

    // to avaoid memory leak , we first create isMounted with useRef(true)
    // and after processing our Auth , not we are returning isMounted with false to avoid memory leak
    return () => {
      isMounted.current = false 
    }
  }, [isMounted])

  return (
    {loggedIn, checkingStatus}
  )
}

// protected routes in V6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase


// clean up memory leaks
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks