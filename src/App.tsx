import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import { AppThemeContextProvider } from './context/AppThemeContext';
import { AppContextProvider } from './context/AppContext';
import NoteLayout from './pages/NoteLayout';
import NotesList from './pages/NotesList';
import NoteView from './pages/NoteView';
import EditNote from './pages/EditNote';
import NewNote from './pages/NewNote';
import './App.css';

export default function App() {
  return (
    <AppThemeContextProvider>
      <Box sx={{
        padding: '10px 0',
        textAlign: 'center',
        display: 'flex',
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}>
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
      </Box>
    </AppThemeContextProvider>
  );
}