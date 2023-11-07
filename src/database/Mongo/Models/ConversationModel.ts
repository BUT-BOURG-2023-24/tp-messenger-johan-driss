import mongoose, { Schema, Document, Types } from "mongoose";

export interface IConversation extends Document {
	participants: string[];
	messages: Types.ObjectId[];
	title: string;
	lastUpdate: Date;
	seen: { [userId: string]: Types.ObjectId };
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>({
	participants: [{ type: String, required: true }],
	messages: [{ type: Types.ObjectId, ref: "Message" }],
	title: { type: String, required: true },
	lastUpdate: { type: Date, required: true },
	seen: { type: Map, of: Types.ObjectId },
});

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;
