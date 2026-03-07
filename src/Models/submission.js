const mongoose =require ("mongoose")
const Schema= mongoose.Schema;

const submissionSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    problemId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:['cpp','c','python']
    },
    status:{
        type:String,
        enum:['accepted','rejected','wrong','error'],
        default:"pending"
    },
    runTime:{
        type:Number,
        default:0
    },
    memoryUsage:{
        type:Number,
        default:0
    },
    errorMessage:{
        type:String,
        default:''
    }
})

const Submissions=mongoose.model('Submissions',submissionSchema);
module.exports=Submissions;

