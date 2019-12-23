import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.table`
  text-align: left;
  font-size: 16px;

  th,
  td {
    white-space: nowrap;
  }

  td.collapsing {
    width: 1px;
  }

  th.centered,
  td.centered {
    text-align: center;
  }

  td {
    color: #666;
    padding: 16px 0;

    &.actions {
      a,
      button {
        font-size: 16px;
        margin-left: 16px;
        border: none;
        background: none;

        &.primary {
          color: #de3b3b;

          &:hover {
            color: ${darken(0.1, '#de3b3b')};
          }
        }

        &.secondary {
          color: #4d85ee;

          &:hover {
            color: ${darken(0.1, '#4d85ee')};
          }
        }
      }
    }
  }

  th {
    color: #444;
    text-transform: uppercase;
    padding-bottom: 4px;
  }

  tr + tr {
    td {
      border-top: 1px solid #eee;
    }
  }

  tbody {
    tr:last-child {
      td {
        padding: 16px 0 0;
      }
    }
  }
`;
