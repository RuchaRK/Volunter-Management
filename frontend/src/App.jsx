import { Route, Routes } from 'react-router-dom';
import { routeName } from './App.routes';
import { Volunteer } from './Features/Volunteers/Volunteer';
import { PageWrapper } from './Components/PageWrapper';
import { Event } from './Features/Events/Event';
import { Dashboard } from './Features/Dashboard';
import { SingleVolunteer } from './Features/Volunteers/SingleVolunteer';
import { SingleEvent } from './Features/Events/SingleEvent';

function App() {
  return (
    <>
      <PageWrapper>
        <Routes>
          <Route path={routeName.DASHBOARD} element={<Dashboard />} />
          <Route path={routeName.EVENTS} element={<Event />} />
          <Route path={routeName.VOLUNTEERS} element={<Volunteer />} />
          <Route path="/volunteers/:id" element={<SingleVolunteer />} />
          <Route path="/events/:id" element={<SingleEvent />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
