import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Model } from '../../Components/Model';
import { ButtonContainer, FormContainer, Title } from '../../Components/Model.styles';
import { Formik, Field, Form, FieldArray } from 'formik';
import Select from 'react-select';
import { fetchEvents } from '../../Reducer/event.slice';
import { availabilityOptionsLookup, getEventOptions } from './VolunteersUtils';

export const VolunteerModel = ({ modalIsOpen, closeModal, handleSubmit, initialState }) => {
  const { status, events } = useSelector((state) => state.events);
  const { wizardStatus } = useSelector((state) => state.volunteers);
  const dispatch = useDispatch();

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

  const availabilityOptions = Object.values(availabilityOptionsLookup);

  const assignedEventsOptions = getEventOptions(events);

  useEffect(() => {
    if (wizardStatus === 'success') {
      closeModal();
    }
  }, [wizardStatus]);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const onSubmit = (values) => {
    console.log('inside submit');
    handleSubmit({
      ...values,
      availability: values.availability.map((availability) => availability.value),
      assignedEvents: values.assignedEvents.map((event) => event.value)
    });
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
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        alignItems: 'center'
                      }}>
                      <Field type="radio" name="gender" value="Male" />
                      Male
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        alignItems: 'center'
                      }}>
                      <Field type="radio" name="gender" value="Female" />
                      Female
                    </div>
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
                        onChange={(selectedOptions) => {
                          setFieldValue('availability', selectedOptions);
                        }}
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
