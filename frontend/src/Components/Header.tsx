import styled from '@emotion/styled';
import { CgProfile } from 'react-icons/cg';
import * as React from 'react';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 32px;
  border-bottom: 1px solid #cbd5e1;
  background: #fff;
  max-height: 100px;
  height: 100%;
  align-items: center;
  width: 100%;
`;

const Greetings = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: flex-start;
  color: #00738c;
`;

const IconContainer = styled.div``;

export const Header = () => {
  return (
    <HeaderContainer>
      <Greetings>
        <h2 style={{ fontSize: '35px' }}>Event Mosaic</h2>
        We handle the stress so your event is a success.
      </Greetings>

      <CgProfile size={25} />
    </HeaderContainer>
  );
};
