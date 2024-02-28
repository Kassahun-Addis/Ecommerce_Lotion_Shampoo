import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
},
{ timestamps: true }
);


const PostModel = model('Post', PostSchema);
export default PostModel;
;