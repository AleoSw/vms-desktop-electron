import MainContent from './components/MainContent/MainContent'
import Sidebar from './components/Sidebar/Sidebar'
import ToolBar from './components/ToolBar/ToolBar'

function App() {
  return (
    <main className='main-cameras'>
      <ToolBar />
      <Sidebar />
      <MainContent />
    </main>
  )
}

export default App
