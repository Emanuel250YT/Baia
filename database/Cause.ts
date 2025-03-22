import mongoose, { Schema, PaginateModel } from 'mongoose';
import { ICause } from '@/classes/Cause';
import mongoosePaginate from "mongoose-paginate-v2"

const connection = mongoose.connection.useDb("baia");

const CauseSchema: Schema = new Schema<ICause>({
  uuid: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  place: { type: String, required: true },
  description: { type: String, required: true },
  profile: { type: String, required: true },
  cause: { type: String, required: true },
  createdAt: { type: Number, required: true },
  pendingValuation: { type: Boolean, default: true },
  images: { type: [String], default: [] },
  fundsLimit: { type: Number },
  verificationLevel: String,
  detail: Object,
  wallet: { type: String, default: "0x427cc9d8e489287c221d4c75edd446723ee0e1a0", required: true },
  funds: { type: Number, default: 0 },
  validations: { type: Number, default: 0 },
  creationIndex: { type: Number, default: 0 }
});

CauseSchema.plugin(mongoosePaginate)


const CauseModel =
  connection.models.Cause as PaginateModel<ICause, mongoose.PaginateModel<ICause>> ||
  connection.model<ICause, mongoose.PaginateModel<ICause>>("Cause", CauseSchema);

export default CauseModel;

