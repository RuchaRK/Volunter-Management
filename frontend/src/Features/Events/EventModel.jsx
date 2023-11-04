import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Model } from '../../Components/Model';
import { ButtonContainer, FormContainer, Title } from '../../Components/Model.styles';
import { Formik, Field, Form, FieldArray } from 'formik';

export const EventModel = ({ modalIsOpen, closeModal, handleSubmit, initialState }) => {
  const { wizardStatus, events } = useSelector((state) => state.events);

  const initialValues = {
    eventName: '',
    location: '',
    description: '',
    date: '',
    roleSpecificVolunteers: [
      {
        role: '',
        volunteers: ''
      }
    ]
  };

  useEffect(() => {
    if (wizardStatus === 'success') {
      closeModal();
    }
  }, [wizardStatus]);

  console.log(events);

  const onSubmit = (values) => {
    console.log('Form submitted with values:', values);
    // You can send the form data to your server or perform other actions here.
  };

  return (
    <div>
      <Model isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {/* //  onSubmit={async (values) => {
      //       handleSubmit(values);
      //       closeModal();
      //     }}> */}
          <FormContainer>
            <Title>New Event</Title>
            <Form>
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
                {({ push, remove, values }) => {
                  console.log(values);
                  return (
                    <div>
                      {values?.roleSpecificVolunteers.map((_, index) => (
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
                        Add Role-Specific Volunteer
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
              <ButtonContainer>
                {/* <button
                  disabled={wizardStatus === 'loading'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(values);
                    closeModal();
                  }}>
                  {wizardStatus === 'loading' ? 'Submitting...' : 'Submit'}
                </button>
                <button onClick={closeModal}>close</button> */}
                <button type="submit">Submit</button>
              </ButtonContainer>
            </Form>
          </FormContainer>
        </Formik>
      </Model>
    </div>
  );
};
