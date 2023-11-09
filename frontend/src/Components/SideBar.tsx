import styled from '@emotion/styled';
import * as React from 'react';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { BiSolidDashboard, BiLogOut } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { routeName } from '../App.routes';

const SideBarComponent = styled.div`
  display: flex;
  padding: 0 24px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-right: 1px solid #e2e8f0;
  height: 100%;
  min-width: 250px;
  width: 250px;
  background: #fff;
  box-shadow:
    0px 5px 22px 4px rgba(0, 0, 0, 0.02),
    0px 12px 17px 2px rgba(0, 0, 0, 0.03);
`;

const Header = styled.div`
  color: #002b9a;
  border-bottom: 1px solid #cbd5e1;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
const IconContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0px 50px 50px 0px;
  background: transparent;
  box-shadow: 5px 2px 9px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
`;

const FooterComponent = styled.div`
  width: 100%;
`;
const menu = [
  {
    route: routeName.DASHBOARD,
    label: 'Dashboard',
    icon: <BiSolidDashboard />
  },
  {
    route: routeName.VOLUNTEERS,
    label: 'Volunteers',
    icon: <BsPeopleFill />
  },
  {
    route: routeName.EVENTS,
    label: 'Events',
    icon: <MdOutlineEventAvailable />
  }
];

export const SideBar = () => {
  return (
    <SideBarComponent>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
        <Header>
          <img src="/images/event.svg" height="150px" width="100px" />
        </Header>

        <PagesContainer>
          {menu.map((item) => (
            <NavLink
              to={item.route}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? 'bold' : '',
                  color: isActive ? '#FFB800' : '#006B82',
                  backgroundColor: isActive ? '#006B82' : '',
                  borderRadius: '0px 50px 50px 0px'
                };
              }}>
              <IconContainer>
                {item.icon}
                {item.label}
              </IconContainer>
            </NavLink>
          ))}
        </PagesContainer>
      </div>
      <FooterComponent>
        <IconContainer>
          <BiLogOut />
          <h5>Logout</h5>
        </IconContainer>
      </FooterComponent>
    </SideBarComponent>
  );
};
