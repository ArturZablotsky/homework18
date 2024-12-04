function concurrentPromises(promises, maxConcurrent) {
    return new Promise((resolve, reject) => {
      const results = [];
      let running = 0;
      let currentIndex = 0;
  
      const executeNext = () => {
        if (currentIndex >= promises.length && running === 0) {
          resolve(results);
          return;
        }
  
        if (running >= maxConcurrent || currentIndex >= promises.length) {
          return;
        }
  
        const index = currentIndex++;
        running++;
  
        promises[index]()
          .then((result) => {
            results[index] = result;
          })
          .catch((error) => {
            results[index] = error;
          })
          .finally(() => {
            running--;
            executeNext();
          });
        executeNext();
      };
      for (let i = 0; i < maxConcurrent; i++) {
        executeNext();
      }
    });
  }
  const createPromise = (id, delay) => () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(`Promise ${id} завершено через ${delay}ms`), delay)
    );
  
  const promises = [
    createPromise(1, 1000),
    createPromise(2, 500),
    createPromise(3, 800),
  ];
  
  concurrentPromises(promises, 3)
    .then((results) => console.log("Результати:", results));
    