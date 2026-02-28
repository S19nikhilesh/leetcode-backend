const axios = require("axios");

async function testJDoodle() {
  try {
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      {
        clientId: "ddb0ab0e35c3db904124de75369028af",
        clientSecret: "96691beb865d06bd45dac9e1bff4bd086941b9c5a2c2bfb965e7c5dc65839813",
        script: `
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from JDoodle" << endl;
    return 0;
}
        `,
        language: "cpp",
        versionIndex: "4",
        stdin: ""
      }
    );

    console.log("Output:");
    console.log(response.data);

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testJDoodle();