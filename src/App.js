import { useState, useEffect, createContext } from 'react'
import Bar from './components/Bar'
import Main from './components/Main'
import './styles/App.css'

const App = () => {
  const [loading, setLoading] = useState(true)
  const loadingContext = createContext()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 5000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <loadingContext.Provider value={loading}>
      <div className="App">
        <div className="wrapper">
          <div className="container">
            <Main />
            <Bar />
            <footer className="footer" />
          </div>
        </div>
      </div>
    </loadingContext.Provider>
  )
}

export default App
