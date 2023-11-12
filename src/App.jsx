import { createContext, useState } from 'react'
import * as S from './App.styles'
import { AppRoutes } from './components/routes'
import { GlobalStyle } from './components/GlobalStyle/GlobalStyle'

export const userContext = createContext()

const App = () => {
  
  const getUser = localStorage.getItem('user')
  const [user, setUser] = useState(getUser)
  console.log(getUser);

  const handleLogin = () => {
    localStorage.setItem('user', user)
    const getUser = localStorage.getItem('user')
    setUser(getUser)
  }

  const handleLogoff = () => {
    // localStorage.removeItem('user', user)
    setUser(null)
  }

  return (
    <userContext.Provider
      value={{ user, setUser, handleLogin, handleLogoff }}
    >
      <S.WrapperDiv>
        <GlobalStyle />
        <S.ContainerDiv>
          <AppRoutes />
        </S.ContainerDiv>
      </S.WrapperDiv>
    </userContext.Provider>
  )
}

export default App
