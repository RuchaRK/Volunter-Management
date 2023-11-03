import * as React from 'react';
import { SideBar } from './SideBar';
import { Header } from './Header';
import styled from '@emotion/styled';

const MainContainer = styled.div`
  display: flex;
  height: 100%;
`;

const LeftHalf = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100%;
`;
const RightHalf = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Content = styled.div`
  background: #f1f5f9;
  height: 100%;
  overflow: auto;
`;

export const PageWrapper = ({ children }) => {
  return (
    <MainContainer>
      <LeftHalf>
        <SideBar />
      </LeftHalf>

      <RightHalf>
        <Header />
        <Content>{children}</Content>
      </RightHalf>
    </MainContainer>
  );
};
