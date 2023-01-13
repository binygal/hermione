export function promisifyRequest(request: IDBRequest): Promise<void> {
  return new Promise((resolve, reject) => {
    request.addEventListener('success', () => {
      resolve();
    }, { once: true });
    request.addEventListener('error', (e) => {
      reject(e);
    }, { once: true });
  });
}

const exports = {
  promisifyRequest,
};

export default exports;
