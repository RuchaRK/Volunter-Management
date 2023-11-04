import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolunteers, addVolunteer, deleteVolunteer } from '../../Reducer/volunteer.slice';
import { ListPage } from '../../Components/ListPage';
import { AiOutlineDelete } from 'react-icons/ai';
import { EditEvent } from './EditEvent';
import { EventModel } from './EventModel';

export const Volunteer = () => {
  const { status, error, volunteers } = useSelector((state) => state.volunteers);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addNewVolunteer = (eventData) => {
    console.log('Hi inside add new event');
    console.log(eventData);
    return dispatch(addVolunteer(eventData));
  };

  const deleteVolunteerById = (id) => {
    dispatch(deleteVolunteer(id));
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Something is wrong {error}</p>}

      <div>
        <ListPage
          column={['Event Name', 'Location', 'Date', 'Time']}
          data={volunteers.map((subject) => [
            event.eventName,
            event.location,
            new Date(event.date).toISOString().split('T')[0],
            new Date(event.date).toISOString().split('T')[1].split('.')[0],

            <EditEvent key={event._id} objectToShow={event} />,
            <button key={event._id} onClick={() => deleteEventById(event._id)}>
              <AiOutlineDelete />
            </button>
          ])}
          title="Volunteers"
          description=""
          image=""
          openForm={openModal}
        />
        <EventModel modalIsOpen={modalIsOpen} closeModal={closeModal} handleSubmit={addNewEvent} />
      </div>
    </div>
  );
};
