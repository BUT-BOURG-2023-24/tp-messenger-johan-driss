import ConversationModel, { IConversation } from '../database/Mongo/Models/ConversationModel'
import { Types } from 'mongoose'
import UserModel, {IUser} from '../database/Mongo/Models/UserModel'

async function createConversation(participants: string[]) {
    try{
        let title = "Groupe de ";
        for (const participant in participants){
            const participantId: IUser | null = await UserModel.findById(participant);
            if (participantId){
                title+=participantId.username+" ";
            }else{
                title+="Unknown ";
            }
        }
        const conversation = new ConversationModel({title, participants});
        const saveConversation = conversation.save();
        return {conversation: saveConversation}
    }catch(error){
        return{error};
    }
}

async function getConversationById(idConv: string){
    try {
        return await ConversationModel.findById(idConv).exec()
    } catch (error) {
        return{error};
    }
}

async function getAllConversationsFromUser(userId: string){
    try {
        const conversations = await ConversationModel.find({ participants: { $in: [userId] } });
        return conversations;
    } catch (error) {
        return{error};
    }
}

async function deleteConversation(userId: string){
    try {
        const conversations = await ConversationModel.findByIdAndDelete({ participants: userId });
        return conversations;
    } catch (error) {
        return{ error };
    }
}

async function seenMessageInConversation(
    conversationId: string,
    updates: {
        seen?: { [userId: string]: Types.ObjectId };
    }
) {
    try {
        const updatedConversation = await ConversationModel.findByIdAndUpdate(
            conversationId,
            { $set: updates },
            { new: true }
        );

        return updatedConversation;
    } catch (error) {
        return{ error };
    }
}

async function getAllConversations(id: string) {
    try {
      const conversations = await ConversationModel.find({ participants: { $in: [id] } });
      return {conversations};
    } catch (error) {
      return { error };
    }
  }


async function addMessageToConversation(idConv: string, newMsg: string): Promise<string>{
    const conversation = await ConversationModel.findById(idConv);
    if(!conversation){
        return "Conversation not found";
    }
    if (!conversation.messages) {
        conversation.messages = [];
    }
    try {
        conversation.messages.push(newMsg);
        await conversation.save();
        return "Message added successfully";
    } catch (error) {
        return "Error adding message: " + error;
    }
}


export default [
    createConversation,
    getConversationById,
    getAllConversationsFromUser,
    getAllConversations,
    deleteConversation,
    seenMessageInConversation,
    addMessageToConversation
]