function noop() {}

/**
 * reject
 *
 * Handle rejection error messages
 *
 * @param {Object} ops - main arg
 * @param {Function} ops.onError - error callback (i.e. flyd stream)
 * @param {Function} ops.onExecute - (always fired)
 * @param {Function} ops.onRejection - (fired if error is present)
 * @returns {Function}
 */
export default function reject({
  onError = noop,
  onExecute = noop,
  onRejection = noop,
}) {
  /**
   * handleRejection
   *
   * Accepts a server response and calls the initialized onError fn
   *
   * @param {Object} rejection
   * @returns {String} - assuming onError returns it :)
   */
  return function handleRejection(rejection) {
    onExecute();

    // for mithril requests, this always runs - clear errors
    if (!rejection) {
      return onError('');
    }

    onRejection();

    if (rejection.error) {
      return onError(rejection.error.message);
    }

    return onError('Sorry, something bad happened');
  };
}
