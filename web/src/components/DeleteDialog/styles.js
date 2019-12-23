import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 400px;
  min-width: 300px;
`;

export const Actions = styled.div`
  display: flex;
  margin-top: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    height: 45px;
    font-size: 16px;
    border: 0;
    padding: 0 16px;
    border-radius: 4px;
    font-weight: bold;
    text-transform: uppercase;

    &.primary {
      flex: 1;
      background: #ee4d64;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    &.secondary {
      background: #ccc;

      &:hover {
        background: ${darken(0.03, '#ccc')};
      }
    }

    & + button {
      margin-left: 16px;
    }
  }
`;
