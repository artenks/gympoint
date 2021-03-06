import React from 'react';

import PropTypes from 'prop-types';

import ActivityIndicator from '~/components/ActivityIndicator';
import Modal from '~/components/Modal';

import { Content, Actions } from './styles';

export default function ConfirmDialog({
  onConfirm,
  onCancel,
  isLoading,
  children,
  ...rest
}) {
  return (
    <Modal {...rest}>
      <Content>{children}</Content>
      <Actions>
        <button
          className="secondary"
          type="button"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button className="primary" type="button" onClick={onConfirm}>
          {isLoading ? <ActivityIndicator /> : 'Confirmar'}
        </button>
      </Actions>
    </Modal>
  );
}

ConfirmDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func]))
      .isRequired,
  ]).isRequired,
};

ConfirmDialog.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
  isLoading: false,
};
