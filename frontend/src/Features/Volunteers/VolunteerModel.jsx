import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Model } from '../../Components/Model';
import { ButtonContainer, FormContainer, Title } from '../../Components/Model.styles';
import { Formik, Field, Form, FieldArray } from 'formik';

export const VolunteerModel = ({ modalIsOpen, closeModal, handleSubmit, initialState }) => {
  const { wizardStatus } = useSelector((state) => state.events);

  const initialValues = {
    eventName: '',
    location: '',
    description: '',
    date: '',
    roleSpecificVolunteers: [{}]
  };

  useEffect(() => {
    if (wizardStatus === 'success') {
      closeModal();
    }
  }, [wizardStatus]);

  // const onSubmit = (values) => {
  //   handleSubmit(values);
  //   closeModal();
  // };

  const onSubmit = (values, { setErrors }) => {
    // Check if the roleSpecificVolunteers array is empty
    if (
      !values.roleSpecificVolunteers ||
      values.roleSpecificVolunteers.length === 0 ||
      values.roleSpecificVolunteers.role === '' ||
      values.roleSpecificVolunteers.volunteers === ''
    ) {
      setErrors({
        roleSpecificVolunteers: 'At least one role-specific volunteer is required.'
      });
      return;
    }
    handleSubmit(values);
    closeModal();
  };

  return (
    <div>
      <Model isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                        <div>
                          {values.roleSpecificVolunteers.map((_, index) => (
                            <div key={index}>
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
                              <button type="button" onClick={() => remove(index)}>
                                Remove
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={() => push({ role: '', volunteers: '' })}>
                            Add Volunteer
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
