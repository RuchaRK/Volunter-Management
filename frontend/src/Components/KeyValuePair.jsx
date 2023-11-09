import * as React from 'react';

import styled from '@emotion/styled';

const KeyValueContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  font-size: 15px;
  align-items: center;
  font-weight: 600;
  width: 50%;
`;
export const KeyValuePair = ({ keyText, valueText }) => {
  return (
    <KeyValueContainer>
      <h4>{keyText}</h4>:<h4>{valueText}</h4>
    </KeyValueContainer>
  );
};
