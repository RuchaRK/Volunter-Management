import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolunteers, addVolunteer, deleteVolunteer } from '../../Reducer/volunteer.slice';
import { ListPage } from '../../Components/ListPage';
import { AiOutlineDelete } from 'react-icons/ai';
import { EditVolunteer } from './EditVolunteer';
import { VolunteerModel } from './VolunteerModel';

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
            subject.eventName,
            subject.location,
            new Date(subject.date).toISOString().split('T')[0],
            new Date(subject.date).toISOString().split('T')[1].split('.')[0],

            <EditVolunteer key={subject._id} objectToShow={subject} />,
            <button key={subject._id} onClick={() => deleteEventById(subject._id)}>
              <AiOutlineDelete />
            </button>
          ])}
          title="Volunteers"
          description=""
          image=""
          openForm={openModal}
        />
        <VolunteerModel modalIsOpen={modalIsOpen} closeModal={closeModal} handleSubmit={addNewEvent} />
      </div>
    </div>
  );
};
