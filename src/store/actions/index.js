export function rejected(actionType) {
  return `${actionType}/rejected`;
}

export function fulfilled(actionType) {
  return `${actionType}/fulfilled`;
}

export function createFulfilledAction(actionType, request, payload) {
  return {
    type: fulfilled(actionType),
    payload,
    error: null,
    meta: {
      requestId: request.options.headers.get('x-request-id'),
    },
  };
}

export function createRejectedAction(actionType, request, error) {
  return {
    type: rejected(actionType),
    payload: null,
    error,
    meta: {
      requestId: request.options.headers.get('x-request-id'),
    },
  };
}
