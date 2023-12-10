import ConversationModel, {IConversation} from "../Models/ConversationModel";
import {IMessage, MessageModel} from "../Models/MessageModel";
import UserModel, {IUser} from "../Models/UserModel";

async function getConversationWithParticipants(participantIds: string) {
    try {
        const conversation = await ConversationModel.findOne({
            participants: participantIds,
        });
        return {conversation};
    } catch (error) {
        return {error};
    }
}

async function getAllConversationsForUser(userId: string) {
    try {
        const conversations = await ConversationModel.find({participants: userId})
            .populate({path: "participants"})
            .populate({path: "messages"}).exec();
        return conversations ?? [];
    } catch (error) {
        return {error};
    }
}

async function getConversationById(id: string) {
    try {
        const conversation = await ConversationModel.findById(id);
        return {conversation} || null;
    } catch (error) {
        return {error};
    }
}

async function createConversation(participants: string[]) {
    try {
        let title = "Conversation entre: ";
        for (const user of participants) {
            const userId: IUser | null = await UserModel.findById(user);
            if (userId) {
                title += userId.username + " ";
            }
        }
        const newConversation = new ConversationModel({
            participants,
            title: title,
        });
        const savedConversation = await newConversation.save();
        return {conversation: savedConversation};
    } catch (error) {
        return {error};
    }
}

async function addMessageToConversation(id: string, message: IMessage) {
    try {
        const conversation = await ConversationModel.findById(id);
        if (!conversation) {
            return {error: "Conversation non trouvée !"};
        }
        conversation.messages.push(message);
        const updatedConversation = await conversation.save();
        return {conversation: updatedConversation};
    } catch (error) {
        return {error};
    }

    async function setConversationSeenForUserAndMessage(id: string, messageId: string, userId: string) {
        try {
            const conversation = await ConversationModel.findById(id);
            if (!conversation) {
                return {error: "Conversation non trouvée !"};
            }
            conversation.seen[userId] = messageId;
            const updatedConversation = await conversation.save();
            return {conversation: updatedConversation};
        } catch (error) {
            return {error};
        }
    }

    async function deleteConversation(id: string) {
        try {
            const conversation = await ConversationModel.findByIdAndRemove(id);
            return {success: !!conversation};
        } catch (error) {
            return {error};
        }
    }
}
