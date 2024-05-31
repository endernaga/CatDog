import { Routes, Route, HashRouter, } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages'

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}