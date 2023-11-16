import styled from '@emotion/styled';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import { KeyValuePair } from '../../Components/KeyValuePair';
import { useSelector } from 'react-redux';

const MainContainer = styled.div`
  display: flex;
  padding: 36px 0;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.div`
  padding: 29px 55px;
  font-style: normal;
  font-weight: 600;
  align-self: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  padding: 29px 66px;
`;

export const SingleVolunteer = () => {
  const { id } = useParams();
  const [singleVolunteer, setSingleVolunteer] = React.useState(null);
  const { events } = useSelector((state) => state.events);

  const fetchAVolunteer = async (id) => {
    const response = await axios.get(`/api/volunteers/${id}`);
    setSingleVolunteer(response.data?.volunteer);
  };

  React.useEffect(() => {
    fetchAVolunteer(id);
  }, []);

  console.log('Volunteer to see', singleVolunteer);

  const wardToDisplay = singleVolunteer?.assignedEvents
    .map((volunteer) => volunteer.eventName)
    .join(', ');

  console.log('ward to display', wardToDisplay);

  return (
    <MainContainer>
      <Title>
        <h2>{singleVolunteer?.name}</h2>
      </Title>
      <DataContainer>
        <KeyValuePair keyText={'Age'} valueText={singleVolunteer?.age} />
        <KeyValuePair keyText={'Gender'} valueText={singleVolunteer?.gender} />
        <KeyValuePair keyText={'Availability'} valueText={singleVolunteer?.availability} />
        <KeyValuePair keyText={'Contact'} valueText={singleVolunteer?.contactNumber} />
        <KeyValuePair
          keyText={'Skills'}
          valueText={singleVolunteer?.skills.map((skill) => skill)}
        />
        <KeyValuePair
          keyText={'Interest Area'}
          valueText={singleVolunteer?.interestAreas.map((area) => area).join(', ')}
        />
        {/* <KeyValuePair
          keyText={'Events Previously Worked On'}
          valueText={singleVolunteer?.history.map((area) => area)}
        /> */}
        <KeyValuePair
          keyText={'Current Events Working On'}
          valueText={singleVolunteer?.assignedEvents.map((event) => event.eventName).join(',')}
        />
      </DataContainer>
    </MainContainer>
  );
};
