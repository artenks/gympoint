import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  input {
    flex: 1;
    border-radius: 0 4px 4px 0 !important;
    text-align: right;
  }
`;

export const Currency = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 15px;
  color: #666;
  padding: 0 16px;
  border-width: 1px 0 1px 1px;
  border-color: #ddd;
  border-radius: 4px 0 0 4px;
  border-style: solid;
`;
