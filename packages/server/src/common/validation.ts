import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const mongooseIdValidationSchema = Joi.string().custom((id, helpers) =>
	isValidObjectId(id) ? id : helpers.message({ custom: 'invalid userId' })
);

export const documentIdsValidationSchema = Joi.array()
	.items(mongooseIdValidationSchema)
	.min(2)
	.unique()
	.required();
