import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateEvent } from '../../Reducer/event.slice';
import { BiEdit } from 'react-icons/bi';
import { VolunteerModel } from './VolunteerModel';

export const EditVolunteer = ({ objectToShow }) => {
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
      <VolunteerModel
        modalIsOpen={editModal}
        closeModal={closeEditModal}
        handleSubmit={editDetails}
        initialState={objectToShow}
      />
    </div>
  );
};
