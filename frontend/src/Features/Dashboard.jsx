import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { fetchEvents } from '../Reducer/event.slice';
import { fetchVolunteers } from '../Reducer/volunteer.slice';
import { isSameDay } from 'date-fns';

const MainContainer = styled.div`
  background:
    linear-gradient(90deg, #0098b9 0%, rgba(255, 255, 255, 0) 100%),
    url(/images/volunteer.svg) lightgray 50% / cover no-repeat;
  height: 100%;
  padding: 23px 67px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 23px 67px;
  gap: 20px;
`;

const InfoCard = styled.div`
  display: flex;
  padding: 20px;
  gap: 10px;
  align-items: flex-start;
  justify-content: center;
  border-radius: 15px;
  background: #fff;
  width: 22%;
  height: 150px;
`;

const Title = styled.h3`
  color: #00738c;
  font-size: 12px;
`;

const Data = styled.p`
  font-weight: 700;
  font-size: 24px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const Dashboard = () => {
  const { events, status: eventStatus } = useSelector((state) => state.events);
  const { volunteers, status: volunteerStatus } = useSelector((state) => state.volunteers);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (eventStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

  React.useEffect(() => {
    if (volunteerStatus === 'idle') {
      dispatch(fetchVolunteers());
    }
  }, [volunteerStatus, dispatch]);

  const currentDate = new Date();

  const upcomingEvents =
    events?.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate > currentDate;
    }) ?? [];

  const todaysEvents =
    events?.filter((event) => isSameDay(currentDate, new Date(event.date))) ?? [];

  return (
    <MainContainer>
      <CardContainer>
        <InfoCard>
          <Content>
            <Title>Total Events</Title>
            <Data>{eventStatus === 'loading' ? 'loading...' : events.length}</Data>
          </Content>
        </InfoCard>

        <InfoCard>
          <Content>
            <Title>Total Volunteers</Title>
            <Data>{volunteerStatus === 'loading' ? 'loading...' : volunteers.length}</Data>
          </Content>
        </InfoCard>

        <InfoCard>
          <Content>
            <Title>Volunteers available on Weekends</Title>
            <Data>
              {volunteerStatus === 'loading'
                ? 'loading...'
                : volunteers.reduce(
                    (count, member) =>
                      (member.availability.includes('weekend-morning') ||
                      member.availability.includes('weekend-evening')
                        ? 1
                        : 0) + count,
                    0
                  )}
            </Data>
          </Content>
        </InfoCard>

        <InfoCard>
          <Content>
            <Title>Volunteers available on Weekdays</Title>
            <Data>
              {volunteerStatus === 'loading'
                ? 'loading...'
                : volunteers.reduce(
                    (count, member) =>
                      (member.availability.includes('weekdays-morning') ||
                      member.availability.includes('weekdays-evening')
                        ? 1
                        : 0) + count,
                    0
                  )}
            </Data>
          </Content>
        </InfoCard>

        <InfoCard style={{ height: 'auto', width: '45%' }}>
          <Content>
            <Title>Upcoming Events</Title>
            <Data>
              {eventStatus === 'loading'
                ? 'loading...'
                : upcomingEvents.map((festival) => <p key={festival._id}>{festival.eventName}</p>)}
            </Data>
          </Content>
        </InfoCard>

        <InfoCard style={{ height: '400px', width: '46%' }}>
          <Content>
            <Title>Todays Events</Title>
            <Data>
              {eventStatus === 'loading'
                ? 'loading...'
                : todaysEvents.map((festival) => <p key={festival._id}>{festival.eventName}</p>)}
            </Data>
          </Content>
        </InfoCard>
      </CardContainer>
    </MainContainer>
  );
};
