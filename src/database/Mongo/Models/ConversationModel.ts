import mongoose, { Schema, Document, Types } from "mongoose";
import { MongooseID } from "../../../types";

export interface IConversation extends Document {
	title: string;
	participants: Types.Array<Types.ObjectId | string>;
	messages: Types.Array<Types.ObjectId | string>;
	lastUpdate: Date;
	seen: Map<number, number>;
  }

const conversationSchema: Schema<IConversation> = new Schema<IConversation>({
	title: {
		type: String,
		required: true,
	  },
	  participants: {
		type: [{ type: Schema.Types.ObjectId, ref: "User" }], // Remplace "User" par le modèle réel de l'utilisateur si nécessaire.
		required: true,
	  },
	  messages: {
		type: [{ type: Schema.Types.ObjectId, ref: "Message" }], // Remplace "Message" par le modèle réel du message si nécessaire.
		required: true,
	  },
	  lastUpdate: {
		type: Date,
		required: true,
	  },
	  seen: {
		type: Map,
		of: Number,
		required: true,
	  },
});

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;