export function objToQuery(obj) {
  const queries = Object.keys(obj).map(key => {
    const value = obj[key];
    return `${key}=${value}`;
  });

  return queries.join('&');
}

export function objDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
