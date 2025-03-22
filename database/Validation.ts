import mongoose, { Schema, PaginateModel } from 'mongoose';
import { IValidation } from '@/classes/Validation';
import mongoosePaginate from "mongoose-paginate-v2"

const connection = mongoose.connection.useDb("baia");

const ValidationSchema: Schema = new Schema<IValidation>({
  uuid: { required: true, type: String },
  cause: { required: true, type: String },
  images: { type: [String], required: true },
  createdAt: { required: true, type: Number },
  description: { required: true, type: String },

});

ValidationSchema.plugin(mongoosePaginate)


const ValidationModel =
  connection.models.Validation as PaginateModel<IValidation, mongoose.PaginateModel<IValidation>> ||
  connection.model<IValidation, mongoose.PaginateModel<IValidation>>("Validation", ValidationSchema);

export default ValidationModel;

