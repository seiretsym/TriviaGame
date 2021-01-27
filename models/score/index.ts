import mongoose, { Schema, Document } from "mongoose";

// typescript
export interface Score extends Document {
  name: string,
  score: number,
  date: Date,
}

// create schema
const ScoreSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// export model
export default mongoose.model<Score>('Score', ScoreSchema);