import { useEffect } from 'react';
import PropTypes from 'prop-types';

function useKeyUp({ handlers }) {
  useEffect(() => {
    const onKeyUp = ({ code }) => {
      if (handlers[code]) {
        handlers[code]();
      }
    };
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [handlers]);
}

useKeyUp.propTypes = {
  handlers: PropTypes.shape({
    ArrowLeft: PropTypes.function,
    ArrowRight: PropTypes.function,
    Escape: PropTypes.function,
  }),
};

export default useKeyUp;
