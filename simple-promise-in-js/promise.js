class PromiseSimple {
  // callback which is passed to PromiseSimple that is used as executionFunction here
  constructor(executionFunction) {
    this.promiseChain = [];
    this.handleError = () => {};

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    executionFunction(this.onResolve, this.onReject);
  }

  //   public methods
  //   In native Promise, then and catch return a new Promise but here I've only returned this
  then(handleSuccess) {
    this.promiseChain.push(handleSuccess);
    return this;
  }

  catch(handleError) {
    this.handleError = handleError;
    return this;
  }

  //   internal methods
  onResolve(value) {
    let storedValue = value;

    try {
      this.promiseChain.forEach((nextFunction) => {
        storedValue = nextFunction(storedValue);
      });
    } catch (error) {
      this.promiseChain = [];
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

const fakeApi = () => {
  const user = {
    username: "treyhuffine",
    favoriteNumber: 42,
    profile: "https://gitconnected.com/treyhuffine",
  };

  //   Introduce a randomizer to simulate the probability of encountering an error
  if (Math.random() > 0.05) {
    return {
      data: user,
      statusCode: 200,
    };
  } else {
    return {
      statusCode: 404,
      message: "Could not find user",
      error: "Not Found",
    };
  }
};

const makeApiCall = () => {
  return new PromiseSimple((resolve, reject) => {
    // Use a timeout to simulate the network delay waiting for the response.
    // This is THE reason you use a promise. It waits for the API to respond
    // and after received, it executes code in the `then()` blocks in order.
    // If it executed is immediately, there would be no data.
    setTimeout(() => {
      const apiResponse = fakeApi();

      if (apiResponse.statusCode >= 400) {
        reject(apiResponse);
      } else {
        resolve(apiResponse.data);
      }
    }, 5000);
  });
};

makeApiCall()
  .then((user) => {
    console.log("In the first .then()");
    return user;
  })
  .then((user) => {
    console.log(
      `User ${user.username}'s favorite number is ${user.favoriteNumber}`
    );
    return user;
  })
  .then((user) => {
    console.log("The previous .then() told you the favoriteNumber");
    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log("This is last then()");
  })
  .catch((error) => {
    console.log(error.message);
  });
