async function sequenceAsync(asyncFunctions) {
    let result;
    for (const asyncFunction of asyncFunctions) {
     result = await asyncFunction(result);
    };
  
    return result;
  };
  
  const asyncFunctions = [
    async (result) => {
      console.log("1 , result:", result);
      return 1;
    },
    async (result) => {
      console.log("2 , result:", result);
      return result + 2;
    },
    async (result) => {
      console.log("3 , result:", result);
      return result * 3;
    },
  ];
  sequenceAsync(asyncFunctions)
    .then((result) => console.log("Результат:", result));