const axios = require("axios");
require('dotenv').config();

const getLanguageName = (lang) => {

  if (!lang) {
    throw new Error("Language is missing");
  }
    const languageMap = {
      "c++": "cpp",
      "c": "c",
      "python": "python3",
      "java": "java"
    };
  
    return languageMap[lang.toLowerCase()];
};

const getDriverTemplate=(lang,USER_CODE)=>{
  const driverTemplate={
    "c++": `
      #include <iostream>
      using namespace std;

      int main() {
          int t;
          cin >> t;

          while(t--) {
            ${USER_CODE}
          }

          return 0;
      }
      `,
    "c": `
      #include <stdio.h>

      int main() {
          int t;
          scanf("%d", &t);

          while(t--) {
              ${USER_CODE}
          }

          return 0;
      }
      `,
    "python":`
        t = int(input())
      for _ in range(t):
        ${USER_CODE}`

  }
  if (!driverTemplate[lang.toLowerCase()]) {
    throw new Error("Driver template not found for language");
  }
  return driverTemplate[lang.toLowerCase()];
  
};


const executeCode = async (combinedInput, language, code) => {
  // console.log(language,combinedInput,code)
  const response = await axios.post(
    "https://api.jdoodle.com/v1/execute",
    {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      // clientId: "ddb0ab0e35c3db904124de75369028af",
      // clientSecret: "96691beb865d06bd45dac9e1bff4bd086941b9c5a2c2bfb965e7c5dc65839813",
      script: getDriverTemplate(language,code),  
      stdin: combinedInput,
      language: getLanguageName(language),
      versionIndex: "4"
    }
    
  );
 console.log(getLanguageName(language))
  return response.data;
};

module.exports = executeCode ;


