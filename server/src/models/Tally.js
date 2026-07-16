import mongoose from "mongoose";

const tallySchema = new mongoose.Schema(
  {
    campus: { type: String, required: true },
    office: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: Date, default: "00:00:00.000Z" },
    clientType: { type: String },
    sex: { type: String },
    age: { type: String },
    cc1: { type: String },
    cc2: { type: String },
    cc3: { type: String },
    sqd0: { type: String },
    sqd1: { type: String },
    sqd2: { type: String },
    sqd3: { type: String },
    sqd4: { type: String },
    sqd5: { type: String },
    sqd6: { type: String },
    sqd7: { type: String },
    sqd8: { type: String },
    feedbackSuggestions: { type: String },
    reasonOfDissatisfaction: { type: String },
    secretariatID: { type: String, required: true },
  },
  { timestamps: true, strict: true },
);

const Tally = mongoose.model("Tally", tallySchema);
export default Tally;
