export async function csrfFetch(url, options = {}) {
  // set options method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty oobject if there are no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "X-CSRF-Token" header to the value of the
    // "csrfToken"
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';

    const csrfToken = await fetch('/api/csrf/restore').then(res => res.json()).then(data => data.csrfToken);
    options.headers['X-CSRF-Token'] = csrfToken
  }

  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
    // error being in the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
    // next promise chain
  return res;
}


// call this to get the "X-CSRF-Token"
export function restoreCsrf() {
  return csrfFetch('/api/csrf/restore');
}
