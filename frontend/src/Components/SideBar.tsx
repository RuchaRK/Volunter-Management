import styled from '@emotion/styled';
import * as React from 'react';
import { BsHospitalFill } from 'react-icons/bs';
import { FaUserInjured, FaHospitalUser } from 'react-icons/fa';
import { BiLogOut, BiSolidNotepad } from 'react-icons/bi';
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
  width: 100%;
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
`;

const FooterComponent = styled.div``;
const menu = [
  {
    route: routeName.HOSPITAL,
    label: 'Hospital',
    icon: <BsHospitalFill />
  },
  {
    route: routeName.PATIENTS,
    label: 'Patient',
    icon: <FaUserInjured />
  },
  {
    route: routeName.WARD,
    label: 'Ward',
    icon: <FaHospitalUser />
  }
];

export const SideBar = () => {
  return (
    <SideBarComponent>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
        <Header>
          <h2>MediLab</h2>
        </Header>

        <PagesContainer>
          {menu.map((item) => (
            <NavLink
              to={item.route}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? 'bold' : '',
                  color: isActive ? '#002B9A' : 'black'
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
