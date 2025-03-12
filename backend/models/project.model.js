import moongose from 'mongoose';


const projectSchema = new moongose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim:true,
        unique: [true,'Project name must be unique']
    },
    users: [
        {
            type: moongose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    fileTree : {
        type: Object,
        default: {}
    },
});

const Project = moongose.model('project', projectSchema);

export default Project;