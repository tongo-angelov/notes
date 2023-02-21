import { Route, Routes } from 'react-router-dom';

import { AppContextProvider } from './context/AppContext';
import NoteLayout from './pages/NoteLayout';
import NotesList from './pages/NotesList';
import NoteView from './pages/NoteView';
import EditNote from './pages/EditNote';
import NewNote from './pages/NewNote';
import './App.css';

export default function App() {

  return (
    <AppContextProvider>
      <Routes>

        <Route path='/' element={<NotesList />} />

        <Route path='/new' element={<NewNote />} />

        <Route path='/:id' element={<NoteLayout />} >
          <Route index element={<NoteView />} />
          <Route
            path="edit"
            element={<EditNote />}
          />
        </Route>

        <Route path='*' element={<h1>404: Not found!</h1>} />
      </Routes>
    </AppContextProvider>
  );
}