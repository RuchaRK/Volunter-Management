import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateEvent } from '../../Reducer/event.slice';
import { BiEdit } from 'react-icons/bi';
import { EventModel } from './EventModel';

export const EditEvent = ({ objectToShow }) => {
  const dispatch = useDispatch();

  const [editModal, setEditModal] = React.useState(false);

  function openEditModal() {
    setEditModal(true);
  }

  function closeEditModal() {
    setEditModal(false);
  }

  const editDetails = (updateData) => {
    dispatch(updateEvent({ id: updateData._id, updateData }));
  };

  return (
    <div>
      <button onClick={openEditModal}>
        <BiEdit />
      </button>
      <EventModel
        modalIsOpen={editModal}
        closeModal={closeEditModal}
        handleSubmit={editDetails}
        initialState={objectToShow}
      />
    </div>
  );
};
