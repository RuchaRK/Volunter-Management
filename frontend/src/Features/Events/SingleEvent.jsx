import styled from '@emotion/styled';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import { KeyValuePair } from '../../Components/KeyValuePair';

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

export const SingleEvent = () => {
  const { id } = useParams();
  const [singleEvent, setSingleEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const fetchAEvent = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/events/${id}`);

      setSingleEvent(response.data?.event);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAEvent(id);
  }, []);

  if (loading) return <Title>Loading...</Title>;
  if (error) return <Title>Something went wrong</Title>;

  const date = new Date(singleEvent?.date);

  return (
    <MainContainer>
      <Title>
        <h2>{singleEvent?.eventName}</h2>
      </Title>
      <DataContainer>
        <KeyValuePair keyText={'Location'} valueText={singleEvent?.location} />
        <KeyValuePair keyText={'Description'} valueText={singleEvent?.description} />
        <KeyValuePair keyText={'Date'} valueText={date.toLocaleDateString()} />

        <KeyValuePair keyText={'Time'} valueText={date.toLocaleTimeString('en-US')} />
        <KeyValuePair
          keyText={'Volunteers Required'}
          valueText={singleEvent?.roleSpecificVolunteers
            .map((volunteer) => ` ${volunteer.role} - ${volunteer.volunteers}`)
            .join(',')}
        />
      </DataContainer>
    </MainContainer>
  );
};
