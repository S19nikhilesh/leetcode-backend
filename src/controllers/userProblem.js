const Problem=require("../Models/problem");
const submitBatch=require("../utils/problemUtility");

const createProblem=async(req,res)=>{
    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator}=req.body;

    try{
        const combinedInput =
        visibleTestCases.length + "\n" +
        visibleTestCases.map(tc => tc.input).join("\n");

        for (const{language,completeCode} of referenceSolution){
        
            console.log(language)
            const submitResult=await submitBatch(combinedInput,language,completeCode);
            


            if (submitResult.statusCode !== 200) {
                return res.status(400).send("Reference solution failed to execute");
            }

            const actualOutputs = submitResult.output.trim().split("\n");

            for (let i = 0; i < visibleTestCases.length; i++) {
                const expected = visibleTestCases[i].output.trim();
                const actual = (actualOutputs[i] || "").trim();
        
                if (expected !== actual) {
                   return res.status(400).send("Reference solution does not match expected outputs");
                }
            }

            
        }
        // If reference solution is correct → Save problem
        const userProblem= await Problem.create(
            {...req.body,
            problemCreator:req.result._id
        }) //admin middleware , result mai id store krwa rha tha

        res.status(201).send("Problem Saved Successfully")
    }catch(err){
        res.status(500).send( "Server error" +err);
    }
}
const updateProblem=async(req,res)=>{
    const {id}=req.params
    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator}=req.body;

    try{
        if(!id){
            res.status(400).send("Missing Id Field");
        }

        const DsaProblem=await Problem.findById(id);
        if(!DsaProblem){
            res.status(404).send("This id is not present in Server");
        }

        const combinedInput =
        visibleTestCases.length + "\n" +
        visibleTestCases.map(tc => tc.input).join("\n");

        for (const{language,completeCode} of referenceSolution){
        
            console.log(language)
            const submitResult=await submitBatch(combinedInput,language,completeCode);
            


            if (submitResult.statusCode !== 200) {
                return res.status(400).send("Reference solution failed to execute");
            }

            const actualOutputs = submitResult.output.trim().split("\n");

            for (let i = 0; i < visibleTestCases.length; i++) {
                const expected = visibleTestCases[i].output.trim();
                const actual = (actualOutputs[i] || "").trim();
        
                if (expected !== actual) {
                   return res.status(400).send("Reference solution does not match expected outputs");
                }
            }

            
        }

        const newProblem= await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true ,new :true})

        res.status(200).send(newProblem)
    }catch(err){
        res.status(404).send( "Error:" +err);
    }
}
const deleteProblem=async(req,res)=>{
    const {id}=req.params;
    try{
        if(!id){
            res.status(400).send("Missing Id Field");
        }
        const deletedProblem= await Problem.findByIdAndDelete(id);

            if(!deletedProblem)
                return res.status(404).send("Problem not found")
            res.status(200).send("Problem Deleted");
    }catch(err){
        res.status(500).send("Error:"+err)
    }
}
const getProblemById=async(req,res)=>{
    const {id}=req.params;
    try{
        if(!id){
            res.status(404).send("Id is Missing");
        }
        const getProblem=await Problem.findById(id);
        if(!getProblem){
            return res.status(404).send("Problem not found")
        }
        res.status(200).send(getProblem);
    }catch(err){
        res.status(500).send("Error:"+err)
    }
}

module.exports={createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem};

// curl -X POST "https://api.jdoodle.com/v1/auth-token" \
// -H "Content-Type: application/json" \
// -d '{
//   "clientId": "your_client_id_here",
//   "clientSecret": "your_client_secret_here",
//   "script": "print(\"Hello, World!\")",
//   "stdin": "",
//   "language": "python3",
//   "versionIndex": "3",
//   "compileOnly": False
// }'
// c , 4 : cpp, 4: java,4 :python ,4

// {
//     "output": "Hello, World!\n",
//     "statusCode": 200,
//     "memory": "1024",
//     "cpuTime": "0.01",
//     "compilationStatus": 0
//   }