import { Routes, Route } from 'react-router-dom'

import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome'

import LayoutComponent from './components/LayoutComponent'
import PublicComponent from './components/PublicComponent'
import DashLayoutComponent from './components/DashLayoutComponent'
import NotesListComponent from './features/notes/NotesListComponent'
import UsersListComponent from './features/users/UsersListComponent'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />}>
        <Route index element={<PublicComponent />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayoutComponent />}>

          <Route index element={<Welcome />} />

          <Route path="notes">
            <Route index element={<NotesListComponent />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersListComponent />} />
          </Route>

        </Route>

      </Route>
    </Routes>
  );
}

export default App;