import { Route, Routes } from 'react-router-dom';
import { routeName } from './App.routes';
import { Volunteer } from './Features/Volunteers/Volunteer';
import { PageWrapper } from './Components/PageWrapper';
import { Event } from './Features/Events/Event';
import { Dashboard } from './Features/Dashboard';

function App() {
  return (
    <>
      <PageWrapper>
        <Routes>
          <Route path={routeName.DASHBOARD} element={<Dashboard />} />
          <Route path={routeName.EVENTS} element={<Event />} />
          <Route path={routeName.VOLUNTEERS} element={<Volunteer />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
