import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { navigate } from '~/store/modules/navigation/actions';

import TopBar from '~/components/TopBar';
import { Wrapper, Container } from './styles';

export default function StudentEditor() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  return (
    <Wrapper>
      <Container>
        <TopBar title="Edição de aluno">
          <Link to="/students" className="secondary">
            <MdArrowBack size={20} color="#fff" />
            Voltar
          </Link>
          <button className="primary" type="button">
            <MdSave size={20} color="#fff" />
            Salvar
          </button>
        </TopBar>
      </Container>
    </Wrapper>
  );
}
