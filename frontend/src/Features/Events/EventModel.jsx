import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Model } from '../../Components/Model';
import { ButtonContainer, FormContainer, Title } from '../../Components/Model.styles';
import { Formik, Field, Form, FieldArray } from 'formik';
import { AiOutlinePlusCircle, AiFillDelete } from 'react-icons/ai';

export const EventModel = ({ modalIsOpen, closeModal, handleSubmit, initialState }) => {
  const { wizardStatus } = useSelector((state) => state.events);

  const initialValues = {
    eventName: '',
    location: '',
    description: '',
    date: '2023-12-05T14:30:00',
    roleSpecificVolunteers: [{}]
  };

  useEffect(() => {
    if (wizardStatus === 'success') {
      closeModal();
    }
  }, [wizardStatus]);

  const onSubmit = (values) => {
    handleSubmit(values);
  };

  return (
    <div>
      <Model isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Formik initialValues={initialState ? initialState : initialValues} onSubmit={onSubmit}>
          {({ values }) => {
            return (
              <Form>
                <FormContainer>
                  <Title>New Event</Title>
                  Name:
                  <Field type="text" name="eventName" />
                  Location:
                  <Field type="text" name="location" />
                  Description:
                  <Field type="text" name="description" />
                  Date:
                  <Field type="datetime-local" name="date" />
                  Role Specific Volunteers:
                  <FieldArray name="roleSpecificVolunteers">
                    {({ push, remove }) => {
                      return (
                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                          {values.roleSpecificVolunteers.map((_, index) => (
                            <div key={index} style={{ display: 'flex', gap: '8px' }}>
                              <Field
                                type="text"
                                name={`roleSpecificVolunteers[${index}].role`}
                                placeholder="Role"
                              />
                              <Field
                                type="number"
                                name={`roleSpecificVolunteers[${index}].volunteers`}
                                placeholder="No of Volunteers"
                              />
                              {values.roleSpecificVolunteers.length > 1 && (
                                <button type="button" onClick={() => remove(index)}>
                                  <AiFillDelete />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ role: '', volunteers: '' })}
                            style={{ width: 'fit-content' }}>
                            <AiOutlinePlusCircle />
                          </button>
                        </div>
                      );
                    }}
                  </FieldArray>
                  <ButtonContainer>
                    <button type="submit" disabled={wizardStatus === 'loading'}>
                      {wizardStatus === 'loading' ? 'Submitting...' : 'Submit'}
                    </button>
                    <button onClick={closeModal}>close</button>
                  </ButtonContainer>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </Model>
    </div>
  );
};
