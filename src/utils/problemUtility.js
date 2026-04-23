const axios = require("axios");
require('dotenv').config();

const getLanguageName = (lang) => {

  if (!lang) {
    throw new Error("Language is missing");
  }
    const languageMap = {
      "c++": "cpp",
      "c": "c",
      "python": "java",
      "java": "java"
    };
  
    return languageMap[lang.toLowerCase()];
};

const getDriverTemplate=(lang,USER_CODE,template_codes)=>{

    const config = template_codes.find(
      (c) => c.language.toLowerCase() === lang.toLowerCase()
  );

  if (!config) {
      throw new Error(`Configuration not found for language: ${lang}`);
  }

  const driverTemplate={
    "c++": `
      #include <iostream>
      using namespace std;
      ${USER_CODE} 
      int main() {
          int t;
          cin >> t;

          while(t--) {
            ${config.hiddenStartCode || ""}
            ${config.functionCall || ""}
            cout << endl;
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
              printf("\\n");
          }

          return 0;
      }
      `,
    "java": `
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            
            if (sc.hasNextInt()) {
                int t = sc.nextInt();
                
                while (t-- > 0) {
                    ${USER_CODE}
                    System.out.println();
                }
            }
            
            sc.close();
        }
    }
    `
  }

  if (!driverTemplate[lang.toLowerCase()]) {
    throw new Error("Driver template not found for language");
  }
  return driverTemplate[lang.toLowerCase()];
  
};


const executeCode = async (combinedInput, language, code,template_codes) => {
  // console.log(language,combinedInput,code)
  const response = await axios.post(
    "https://api.jdoodle.com/v1/execute",
    {
      // clientId: process.env.JDOODLE_CLIENT_ID,
      // clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      clientId: "d3b4a846768d2eef40b1096c65663a65",
      clientSecret: "3699aa71661f40a533a195a311ee6fa57cd3df437a72a49cbddaff876c64126c",

      // clientId: "ddb0ab0e35c3db904124de75369028af",
      // clientSecret: "96691beb865d06bd45dac9e1bff4bd086941b9c5a2c2bfb965e7c5dc65839813",
      script: getDriverTemplate(language,code,template_codes),  
      stdin: combinedInput,
      language: getLanguageName(language),
      versionIndex: "4"
    }
    
  );
 console.log(getLanguageName(language))
 console.log(response.data);
  return response.data;
};

const checkOutput = (submitResult, visibleTestCases) => {
  if (!submitResult || !visibleTestCases) return 0;
  
  // Safety: Ensure output is a string
  const output = String(submitResult.output || ""); 
  const allLines = output.split(/\r?\n/);
  const cleanLines = allLines.map(line => line.trim());

  let passedCount = 0;
  for (let i = 0; i < visibleTestCases.length; i++) {
      // Safety: Ensure database output exists
      const expected = String(visibleTestCases[i].output || "").trim();
      const actual = (cleanLines[i] !== undefined) ? cleanLines[i] : "";

      if (expected === actual) {
          passedCount++;
      } else {
          break; 
      }
  }
  return passedCount;
};


module.exports = {executeCode,checkOutput} ;


//output look like

// {
//   output: '5\n25',
//   error: null,
//   statusCode: 200,
//   memory: '3072',
//   cpuTime: '0.00',
//   compilationStatus: null,
//   projectKey: null,
//   isExecutionSuccess: true,
//   isCompiled: true
// }