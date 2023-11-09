import styled from '@emotion/styled';
import { FaUserInjured, FaHospitalUser } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { BiSolidInjection } from 'react-icons/bi';
import { BsCalendarEvent } from 'react-icons/bs';
import { GiTrophy } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { fetchEvents } from '../Reducer/event.slice';
import { fetchVolunteers } from '../Reducer/volunteer.slice';

const MainContainer = styled.div`
  display: flex;
  background:
    linear-gradient(90deg, #0098b9 0%, rgba(255, 255, 255, 0) 100%),
    url(/images/volunteer.svg) lightgray 50% / cover no-repeat;
  height: 100%;
  flex-wrap: wrap;
  padding: 23px 67px;
  gap: 20px;
`;

const InfoCard = styled.div`
  display: flex;
  padding: 20px;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 15px;
  background: #fff;
  width: 226px;
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

  const EventList = (occasion) => {
    const currentDate = new Date();

    const upcomingEvents = occasion.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate > currentDate;
    });
    return upcomingEvents;
  };

  const TodaysEvents = ({ events = [] }) => {
    const currentDate = new Date();

    const todaysEvents = events.filter((event) => event.date === currentDate);

    return todaysEvents;
  };

  return (
    <MainContainer>
      <InfoCard>
        <MdEventAvailable size={40} />
        <Content>
          <Title>Total Events</Title>
          <Data>{eventStatus === 'loading' ? 'loading...' : events.length}</Data>
        </Content>
      </InfoCard>

      <InfoCard>
        <IoIosPeople size={40} />
        <Content>
          <Title>Total Volunteers</Title>
          <Data>{volunteerStatus === 'loading' ? 'loading...' : volunteers.length}</Data>
        </Content>
      </InfoCard>

      <InfoCard>
        <IoIosPeople size={40} />
        <Content>
          <Title>Volunteers available on Weekends</Title>
          <Data>
            {volunteerStatus === 'loading'
              ? 'loading...'
              : volunteers.reduce(
                  (count, member) =>
                    (member.availability === 'weekend-morning' &&
                      member.availability === 'weekend-evening') + count,
                  0
                )}
          </Data>
        </Content>
      </InfoCard>

      <InfoCard>
        <IoIosPeople size={40} />
        <Content>
          <Title>Volunteers available on Weekdays</Title>
          <Data>
            {volunteerStatus === 'loading'
              ? 'loading...'
              : volunteers.reduce(
                  (count, member) =>
                    (member.availability === 'weekdays-morning' &&
                      member.availability === 'weekdays-evening') + count,
                  0
                )}
          </Data>
        </Content>
      </InfoCard>

      <InfoCard>
        <BsCalendarEvent size={40} />
        <Content>
          <Title>Upcoming Events</Title>
          <Data>
            {eventStatus === 'loading'
              ? 'loading...'
              : EventList(events).map((festival) => (
                  <p key={festival._id}>{festival.eventName}</p>
                ))}{' '}
          </Data>
        </Content>
      </InfoCard>

      <InfoCard>
        <BsCalendarEvent size={40} />
        <Content>
          <Title>Todays Events</Title>
          <Data>
            {eventStatus === 'loading'
              ? 'loading...'
              : TodaysEvents(events).map((festival) => (
                  <p key={festival._id}>{festival.eventName}</p>
                ))}
          </Data>
        </Content>
      </InfoCard>
    </MainContainer>
  );
};
