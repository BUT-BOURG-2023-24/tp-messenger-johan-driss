import { Request, Response } from "express";
import ConversationModel, { IConversation } from "../Models/ConversationModel";
//import * from ConversationService 

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

async function addMessageToConversation(req: Request, res: Response){
    try {
        const idConv = req.params.
    }
}

async function getConversationWithParticipants(req: Request, res: Response){
    
}