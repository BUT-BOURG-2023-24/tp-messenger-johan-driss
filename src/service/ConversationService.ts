import express, {Request, Response} from 'express'
import Database from '../database/database'
import ConversationModel, { IConversation } from '../database/Mongo/Models/ConversationModel'
import { IMessage, MessageModel } from '../database/Mongo/Models/MessageModel'

async function createConversation(title: string, participants: string[], message: string[], lastUpdate: Date, seen: Map<number, number>): Promise<IConversation> {
    const conversation = new ConversationModel({title, participants, message, lastUpdate, seen})
    return await conversation.save();
}

async function getConversationById(idConv: number): Promise<IConversation | null> {
    return await ConversationModel.findById(idConv).exec();
}

async function updateConversation(idConv: number, newMsg: IMessage) {
    var conversation = await ConversationModel.findById(idConv);
    // conversation?.messages += newMsg.content;
}

async function deleteConversation(idConv: number): Promise<void> {
    await ConversationModel.findById(idConv)
}

async function addMessageToConversation(idConv: number){ //: Promise TODO
    let conversation = getConversationById(idConv);

    if(!conversation){
        return "Conversation not found";
    }else{
        try {
            const message = ;
            const lastUpdate = new Date(req.params.lastUpdate);
            const seen = new Map<number, number>();
            
            const newMessage = new MessageModel(message);

            const updatedConversation = await createConversation(req.params.title,req.params.participants,message,lastUpdate,seen)
        }
    }
}