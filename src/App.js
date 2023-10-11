import Bar from './components/Bar'
import Main from './components/Main'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <Main />

          <Bar />

          <footer className="footer" />

        </div>
      </div>
    </div>
  )
}

export default App
