import mongoose, { Schema, Document } from "mongoose";
import { MongooseID } from "../../../types";

// Créez une interface pour représenter l'objet de réactions.
interface IReactions {
    [userId: string]: "HAPPY" | "SAD" | "THUMBSUP" | "THUMBSDOWN" | "LOVE";
}

export interface IMessage extends Document {
    conversationId: MongooseID; // Référence à la conversation.
    from: MongooseID; // Référence à l'utilisateur qui a envoyé le message.
    content: string; // Contenu du message.
    postedAt: Date; // Date de publication.
    replyTo: MongooseID | null; // Référence au message auquel on répond, peut être nul.
    edited: boolean; // Indique si le message a été modifié.
    deleted: boolean; // Indique si le message a été supprimé.
    reactions: IReactions; // Les réactions aux messages.
}

const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
    conversationId: { type: Schema.Types.ObjectId, required: true, ref: "Conversation" }, // Référencez le modèle de conversation.
    from: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // Référencez le modèle d'utilisateur.
    content: { type: String, required: true },
    postedAt: { type: Date, required: true },
    replyTo: { type: Schema.Types.ObjectId, ref: "Message" }, // Référencez le modèle de message, peut être nul.
    edited: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    reactions: { type: Map, of: String }, // Utilisez Map pour représenter l'objet de réactions.
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export { MessageModel, MessageSchema };
