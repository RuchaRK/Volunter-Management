import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent, deleteEvent } from '../../Reducer/event.slice';
import { ListPage } from '../../Components/ListPage';
import { AiOutlineDelete } from 'react-icons/ai';
import { EditEvent } from './EditEvent';
import { EventModel } from './EventModel';

export const Event = () => {
  const { status, error, events } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addNewEvent = (patientData) => {
    dispatch(addEvent(patientData));
  };

  const deleteEventById = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Something is wrong {error}</p>}

      <div>
        <ListPage
          column={['Event Name', 'Location', 'Date', 'Time']}
          data={events.map((event) => [
            event.eventName,
            event.location,
            new Date(event.date).toISOString().split('T')[0],
            new Date(event.date).toISOString().split('T')[1].split('.')[0],

            <EditEvent key={event._id} objectToShow={event} />,
            <button key={event._id} onClick={() => deleteEventById(event._id)}>
              <AiOutlineDelete />
            </button>
          ])}
          title="Events"
          description=""
          image=""
          openForm={openModal}
        />
        <EventModel modalIsOpen={modalIsOpen} closeModal={closeModal} handleSubmit={addNewEvent} />
      </div>
    </div>
  );
};
