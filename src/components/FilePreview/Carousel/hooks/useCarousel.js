// based on: https://blog.logrocket.com/building-carousel-component-react-hooks/

import { useReducer, useEffect } from 'react';

import { useSwipeable, LEFT, RIGHT } from 'react-swipeable';

const initialCarouselState = {
  offset: 0,
  desired: 1,
  active: 1,
};

function previous(length, current) {
  return (current - 1 + length) % length;
}

function next(length, current) {
  return (current + 1) % length;
}

function threshold(target) {
  const width = target.clientWidth;
  return width / 3;
}

function carouselReducer(state, action) {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        desired: next(action.length, state.active),
      };
    case 'prev':
      return {
        ...state,
        desired: previous(action.length, state.active),
      };
    case 'done':
      return {
        ...state,
        offset: NaN,
        active: 1,
        desired: 1,
      };
    case 'drag':
      return {
        ...state,
        offset: action.offset,
      };
    default:
      return state;
  }
}

function swiped(e, dispatch, length, dir) {
  const t = threshold(e.event.target);
  const d = dir * e.deltaX;

  if (d >= t) {
    dispatch({
      type: dir < 0 ? 'next' : 'prev',
      length,
    });
  } else {
    dispatch({
      type: 'drag',
      offset: 0,
    });
  }
}

const transitionTime = 400;
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
const smooth = `transform ${transitionTime}ms ease`;

function useCarousel({ length, maxVisible = 3, onSwipeLeft, onSwipeRight }) {
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
  const handlers = useSwipeable({
    onSwiping(e) {
      dispatch({
        type: 'drag',
        offset: e.deltaX,
      });
    },
    onSwiped(e) {
      if (e.dir === LEFT) {
        swiped(e, dispatch, length, -1);
      }
      if (e.dir === RIGHT) {
        swiped(e, dispatch, length, 1);
      }
    },
    trackMouse: false,
    trackTouch: true,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch({ type: 'done' });
      const dir = Math.sign(state.desired - state.active);
      if (dir === -1) {
        onSwipeLeft();
      }
      if (dir === 1) {
        onSwipeRight();
      }
    }, transitionTime);
    return () => clearTimeout(id);
  }, [state.desired, state.active]);

  const style = {
    transform: 'translateX(0)',
    width: `${100 * length}%`,
    left: `-${state.active * 100}%`,
  };

  if (state.desired !== state.active) {
    const dist = Math.abs(state.active - state.desired);
    const pref = Math.sign(state.offset || 0);
    const dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active);
    const shift = (100 * (pref || dir)) / maxVisible;
    style.transition = smooth;
    style.transform = `translateX(${shift}%)`;
  } else if (!Number.isNaN(state.offset)) {
    if (state.offset !== 0) {
      style.transform = `translateX(${state.offset}px)`;
    } else {
      style.transition = elastic;
    }
  }

  return [handlers, style];
}

export default useCarousel;
