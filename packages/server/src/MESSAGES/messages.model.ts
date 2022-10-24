import { model, Schema } from 'mongoose';
import { IChatMsg } from '@messaging-app/shared';

const messageSchema = new Schema<IChatMsg>(
	{
		senderId: String,
		targetId: String,
		text: String,
		status: { type: String, default: 'sent' },
	},
	{
		versionKey: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

export default model('message', messageSchema);
