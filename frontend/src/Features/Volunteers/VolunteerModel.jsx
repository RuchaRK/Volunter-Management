import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Model } from '../../Components/Model';
import { ButtonContainer, FormContainer, Title } from '../../Components/Model.styles';
import { Formik, Field, Form, FieldArray } from 'formik';
import Select from 'react-select';

export const VolunteerModel = ({ modalIsOpen, closeModal, handleSubmit, initialState }) => {
  const { status, events } = useSelector((state) => state.events);
  const { wizardStatus } = useSelector((state) => state.volunteers);

  const initialValues = {
    name: '',
    age: '',
    gender: '',
    skills: '',
    contactNumber: '',
    availability: '',
    history: '',
    interestAreas: [],
    assignedEvents: []
  };

  const availabilityOptions = [
    { value: 'weekend-morning', label: 'Weekend - Morning' },
    { value: 'weekend-evening', label: 'Weekend - Evening' },
    { value: 'weekdays-morning', label: 'Weekdays - Morning' },
    { value: 'weekdays-evening', label: 'Weekdays - Evening' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const assignedEventsOptions = React.useMemo(
    () =>
      events.map((program) => ({
        value: program._id,
        label: [
          program.eventName,
          program.location,
          new Date(program.date).toISOString().split('T')[0],
          new Date(program.date).toISOString().split('T')[1].split('.')[0]
        ].join(' - ')
      })),
    [events]
  );

  useEffect(() => {
    if (wizardStatus === 'success') {
      closeModal();
    }
  }, [wizardStatus]);

  const onSubmit = (values) => {
    console.log(values);
    handleSubmit(values);
    closeModal();
  };

  return (
    <div>
      <Model isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Formik initialValues={initialState ? initialState : initialValues} onSubmit={onSubmit}>
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <FormContainer>
                  <Title>New Volunteer</Title>
                  Name:
                  <Field type="text" name="name" />
                  Age:
                  <Field type="number" name="age" />
                  Gender:
                  <div>
                    <Field type="radio" name="gender" value="Male" />
                    Male
                    <Field type="radio" name="gender" value="Female" />
                    Female
                  </div>
                  Skills:
                  <Field type="text" name="skills" />
                  Interest Areas:
                  <Field type="text" name="interestAreas" />
                  Contact Number:
                  <Field type="text" name="contactNumber" />
                  Availability:
                  <Field name="availability">
                    {({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={availabilityOptions}
                        onChange={(selectedOptions) =>
                          setFieldValue('availability', selectedOptions)
                        }
                        value={values.availability}
                      />
                    )}
                  </Field>
                  Assigned Events:
                  {status === 'loading' ? (
                    'Loading ...'
                  ) : (
                    <Field name="assignedEvents">
                      {({ field, form }) => (
                        <Select
                          {...field}
                          isMulti
                          options={assignedEventsOptions}
                          onChange={(selectedOptions) =>
                            form.setFieldValue('assignedEvents', selectedOptions)
                          }
                          value={form.values.assignedEvents}
                        />
                      )}
                    </Field>
                  )}
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
