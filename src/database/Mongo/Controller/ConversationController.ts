import express, { Request, Response } from "express";
import ConversationModel, { IConversation } from "../Models/ConversationModel";
import { MessageModel } from "../Models/MessageModel";
//import * as ConversationService from 

const router = express.Router();
async function createConversation(title: string, participants: string[], message: string[], lastUpdate: Date, seen: Map<number, number>): Promise<IConversation> {
    const conversation = new ConversationModel({title, participants, message, lastUpdate, seen})
    return await conversation.save();
}

async function getConversationById(idConv: number): Promise<IConversation | null> {
    return await ConversationModel.findById(idConv).exec();
}

async function deleteConversation(idConv: number): Promise<void> {
    await ConversationModel.findById(idConv)
}

async function addMessageToConversation(req: Request, res: Response, idConv: number): Promise<string>{
    let conversation: IConversation;
    conversation = getConversationById(idConv);

    if(!conversation){
        return "Conversation not found";
    }else{
        try {
            const message = conversation.;
            const lastUpdate = new Date(req.params.lastUpdate);
            const seen = new Map<number, number>();
            
            const newMessage = new MessageModel(message);

            const updatedConversation = await createConversation(req.params.title,req.params.participants,message,lastUpdate,seen)
        }
    }
}

async function getConversationWithParticipants(req: Request, res: Response){
    
}

function getAllConversationsForUser()
{

}

function setConversationSeenForUserAndMessage()
{

}
