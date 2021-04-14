import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => {
  return (
    <>
      <Container>
        <Toast type="info" hasDescription>
          <FiAlertCircle />

          <div>
            <strong>Aconteceu um Erro</strong>
            <p>Não foi possível fazer login na aplicação</p>
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>

        <Toast type="success" hasDescription={false}>
          <FiAlertCircle />

          <div>
            <strong>Aconteceu um Erro</strong>
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>

        <Toast type="error" hasDescription>
          <FiAlertCircle />

          <div>
            <strong>Aconteceu um Erro</strong>
            <p>Não foi possível fazer login na aplicação</p>
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>
      </Container>
    </>
  );
};

export default ToastContainer;
