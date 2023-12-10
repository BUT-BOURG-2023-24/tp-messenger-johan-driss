import mongoose, {Schema, Document, Types} from "mongoose";

export interface IMessage extends Document {
    conversationId: Types.ObjectId | string;
    from: Types.ObjectId | string;
    content: string;
    postedAt: Date;
    replyTo: Types.ObjectId | null | string;
    edited: boolean;
    deleted: boolean;
    reactions: { [userId: string]: string };
}

const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
    conversationId: { type: Schema.Types.ObjectId, required: true, ref: "Conversation" },
    from: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    postedAt: { type: Date, default: Date.now },
    replyTo: { type: Schema.Types.ObjectId, ref: "Message" },
    edited: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    reactions: { type: Map, of: { type: String, enum: ["LOVE", "THUMBSDOWN", "THUMBSUP", "SAD", "HAPPY"]} },
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export { MessageModel, MessageSchema };
