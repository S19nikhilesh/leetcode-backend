const Submission = require('../Models/submission');
const Problem=require('../Models/problem');
const {executeCode,checkOutput}=require("../utils/problemUtility");


const submitCode=async (req,res) => {
    try{
        const userId=req.result._id;
        const problemId=req.params.id;
        console.log(problemId)
        const{code,language}=req.body;

        if(!userId||!problemId||!code||!language)
            return res.status(400).send("some fields are missing")
        
        //fetch problem from database 
        const problem= await Problem.findById(problemId);
        
        console.log(problem.title)
        // pehle sirf code ,language store karwa dete hai , pending status mai , aur baad mai fir update krwa denge
        // bcz maan lo koi error aagya kabhi Jdoodle mai , so that's why 

        const submittedResult=await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesTotal:0,
            status:'pending'

        })
        // ab bhejo Jdoodle ko

        let numberOfTestCasesPassed=0;
        let runTime=0;
        let memoryUsage=0;
        let status='accepted';
        let errorMessage=null;

        const combinedInput =
        problem.hiddenTestCases.length + "\n" +
        problem.hiddenTestCases.map(tc => tc.input).join("\n");


        const submitResult=await executeCode(combinedInput,language,code);

        if (!submitResult.isCompiled) {
            status = "compile_error";
            errorMessage = submitResult.error || "CompileTime error";
        }
        
        else if (!submitResult.isExecutionSuccess) {
            status = "runtime_error";
            errorMessage = submitResult.error || "RunTime error";
        }
        
        else {
        
            numberOfTestCasesPassed = checkOutput(submitResult, problem.hiddenTestCases);
        
            if (numberOfTestCasesPassed === problem.hiddenTestCases.length) {
                status = "accepted";
                runTime=submitResult.cpuTime;
                memoryUsage=submitResult.memory;
            } 
            else {
                status = "wrong_answer";
                errorMessage = `Passed ${numberOfTestCasesPassed} / ${problem.hiddenTestCases.length} testcases`;
            }
        }

        submittedResult.testCasesPassed=numberOfTestCasesPassed;
        submittedResult.testCasesTotal=problem.hiddenTestCases.length;
        submittedResult.runTime=runTime;
        submittedResult.memoryUsage=memoryUsage;
        submittedResult.status=status;
        submittedResult.errorMessage=errorMessage;

        await submittedResult.save();
        
        if(!req.result.ProblemSolved.includes(problemId)){
            req.result.ProblemSolved.push(problemId);
            await req.result.save();
        }


        console.log(numberOfTestCasesPassed);
        res.status(200).send("Given solution added to submission database")

    }catch(err){
        res.status(500).send( "Internal Server error" +err);
    }
}

const runCode=async (req,res) => {
    try{
        const userId=req.result._id;
        const problemId=req.params.id;
        console.log(problemId)
        const{code,language}=req.body;

        if(!userId||!problemId||!code||!language)
            return res.status(400).send("some fields are missing")
        
        //fetch problem from database 
        const problem= await Problem.findById(problemId);
        
        console.log(problem.title)
        

        const combinedInput =
        problem.visibleTestCases.length + "\n" +
        problem.visibleTestCases.map(tc => tc.input).join("\n");


        const submitResult=await executeCode(combinedInput,language,code);
        const numberOfTestCasesPassed = checkOutput(submitResult, problem.visibleTestCases);
        
        
        res.status(200).send(`Passed ${numberOfTestCasesPassed} / ${problem.visibleTestCases.length} testcases`)

    }catch(err){
        res.status(500).send( "Internal Server error" +err);
    }
}

module.exports={submitCode,runCode};