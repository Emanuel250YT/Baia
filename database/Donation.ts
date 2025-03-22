import mongoose, { Schema, PaginateModel } from 'mongoose';
import { IDonation } from '@/classes/Donation';
import mongoosePaginate from "mongoose-paginate-v2"

const connection = mongoose.connection.useDb("baia");

const DonationSchema: Schema = new Schema<IDonation>({
  uuid: { required: true, type: String },
  cause: { required: true, type: String },
  createdAt: { required: true, type: Number },
  wallet: { required: true, type: String }
});

DonationSchema.plugin(mongoosePaginate)


const DonationModel =
  connection.models.Donation as PaginateModel<IDonation, mongoose.PaginateModel<IDonation>> ||
  connection.model<IDonation, mongoose.PaginateModel<IDonation>>("Donation", DonationSchema);

export default DonationModel;

