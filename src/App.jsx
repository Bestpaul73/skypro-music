import { createContext, useState } from 'react'
import * as S from './App.styles'
import { AppRoutes } from './components/routes'
import { GlobalStyle } from './components/GlobalStyle/GlobalStyle'

const App = () => {
  const userContext = createContext()
  
  const getUser = localStorage.getItem('user')
  const [user, setUser] = useState(getUser)

  const handleLogin = () => {
    localStorage.setItem('user', user)
    const getUser = localStorage.getItem('user')
    setUser(getUser)
  }

  const handleLogoff = () => {
    localStorage.removeItem('user', user)
    const getUser = localStorage.getItem('user')
    setUser(getUser)
  }

  return (
    <userContext.Provider
      value={{ user, setUser, handleLogin, handleLogoff }}
    >
      <S.WrapperDiv>
        <GlobalStyle />
        <S.ContainerDiv>
          <AppRoutes user={user} onClick={handleLogin} />
        </S.ContainerDiv>
      </S.WrapperDiv>{' '}
    </userContext.Provider>
  )
}

export default App
