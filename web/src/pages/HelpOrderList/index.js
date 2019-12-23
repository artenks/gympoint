import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';

import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import EmptyState from '~/components/EmptyState';
import LoadingState from '~/components/LoadingState';
import { displayAnswerDialog } from '~/components/AnswerDialog';
import { Wrapper, Container } from './styles';

export default function HelpOrderList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('helpOrders'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.get('/help-orders');

      setHelpOrders(response.data);
      setIsLoading(false);
    })();
  }, []);

  function handleAction({ id, question }) {
    displayAnswerDialog(id, question);
  }

  function RenderCurrentState() {
    if (isLoading) return <LoadingState />;

    if (!helpOrders.length) return <EmptyState />;

    return (
      <Table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th className="centered">Feita em</th>
            <th className="collapsing" />
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(helpOrder => (
            <tr key={helpOrder.id}>
              <td>{helpOrder.student.name}</td>
              <td className="fill centered">
                {format(
                  parseISO(helpOrder.created_at),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: pt,
                  }
                )}
              </td>
              <td className="collapsing actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => handleAction(helpOrder)}
                >
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Wrapper>
      <Container>
        <TopBar title="Pedidos de auxílio" />

        <RenderCurrentState />
      </Container>
    </Wrapper>
  );
}
