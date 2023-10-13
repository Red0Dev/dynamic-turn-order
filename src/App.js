import PlayersTable from 'components/PlayersTable';
import './App.css';
import { Typography } from '@mui/material';

function App() {
  return (
    <main className='container'>
      <Typography variant='h3' align='center' sx={{ mb: 4 }}>Dynamic Turn Order</Typography>
      <PlayersTable />
    </main>
  );
}

export default App;
