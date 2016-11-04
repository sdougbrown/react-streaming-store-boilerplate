function noop() {}

export default function bindValueTo(callback, event) {
  if (arguments.length < 2) {
    return handleEvent.bind(null, callback);
  }

  return handleEvent(callback, event);
}

function handleEvent(callback = noop, event) {
  callback(event.target.value);
}
