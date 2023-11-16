import * as React from 'react';
import { BiEdit } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { updateVolunteer } from '../../Reducer/volunteer.slice';
import { VolunteerModel } from './VolunteerModel';
import { availabilityOptionsLookup, getEventOptions } from './VolunteersUtils';

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
    dispatch(updateVolunteer({ id: updateData._id, updateData }));
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
        initialState={{
          ...objectToShow,
          availability: objectToShow.availability.map(
            (availability) => availabilityOptionsLookup[availability]
          ),
          assignedEvents: getEventOptions(objectToShow.assignedEvents)
        }}
      />
    </div>
  );
};
