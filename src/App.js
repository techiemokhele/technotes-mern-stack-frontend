import { Routes, Route } from 'react-router-dom'

import Login from './features/auth/Login'
import Prefetch from './features/auth/Prefetch'
import Welcome from './features/auth/Welcome'

import LayoutComponent from './components/LayoutComponent'
import PublicComponent from './components/PublicComponent'
import DashLayoutComponent from './components/dashboard/DashLayoutComponent'
import NotesListComponent from './features/notes/NotesListComponent'
import UsersListComponent from './features/users/UsersListComponent'

import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import PersistLogin from './features/auth/persistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'


function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />}>
        {/* Public routes */}
        <Route index element={<PublicComponent />} />
        <Route path="login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayoutComponent />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.manager, ROLES.admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersListComponent />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesListComponent />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;