import { useState } from 'react'
import * as S from './App.styles'
import { AppRoutes } from './components/routes'
import { GlobalStyle } from './components/GlobalStyle/GlobalStyle'

const App = () => {

  const getUser = localStorage.getItem('login');
  const [user, setUser] = useState(getUser);

  
  const handleLogin = () => {
    localStorage.setItem('login', 'SetLogin');
    const getUser = localStorage.getItem('login');
    setUser(getUser);
  }

  

  return (
      <S.WrapperDiv>
        <GlobalStyle />
        <S.ContainerDiv>
          <AppRoutes user={user} onClick={handleLogin}/>
        </S.ContainerDiv>
      </S.WrapperDiv>
  )
}

export default App
