export function rejected(actionType) {
  return `${actionType}/rejected`;
}

export function fulfilled(actionType) {
  return `${actionType}/fulfilled`;
}

export function createFulfilledAction(actionType, payload) {
  return {
    type: fulfilled(actionType),
    payload,
    error: null,
  };
}

export function createRejectedAction(actionType, error) {
  return {
    type: rejected(actionType),
    payload: null,
    error,
  };
}
