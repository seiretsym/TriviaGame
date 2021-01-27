import mongoose, { Schema, Document } from "mongoose";

// typescript
export interface Song extends Document {
  name: string,
  url: string
}

// create schema
const SongSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

// export model
export default mongoose.model<Song>("Song", SongSchema);