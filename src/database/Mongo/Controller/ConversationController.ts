import express, { Request, Response } from "express";
import ConversationModel, { IConversation } from "../Models/ConversationModel";
import ConversationService from "../../../service/ConversationService";
import { MessageModel } from "../Models/MessageModel";
import { Types } from "mongoose";
const jwt = require('jsonwebtoken');

const router = express.Router();

async function getUserByToken(req: Request) {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'your_secret_key') as { id: string };
    return decodedToken.id;
}

async function createConversation(req: Request, res: Response) {
    const { participants } = req.body;
    try {
        const conversation = await ConversationService.createConversation(participants);
        if (conversation.error) {
            return res.status(500).json({ error: conversation.error });
        }
        return res.status(201).json({ conversation: conversation.conversation });
    } catch (error) {
        return res.status(401).json({ error: 'Error creating conversation' });
    }
}

async function getConversationById(idConv: number): Promise<IConversation | null> {
    try {
        return await ConversationModel.findById(idConv).exec()
    } catch (error) {
        console.error("Error fetching conversation by ID:", error);
        return null;
    }
}

async function deleteConversation(idConv: number): Promise<void> {
    await ConversationModel.findById(idConv)
}

async function addMessageToConversation(req: Request, res: Response, idConv: number, newMsg: string): Promise<string>{
    let conversation: IConversation | null;
    conversation = await getConversationById(idConv);

    if(!conversation){
        return "Conversation not found";
    }else{
        if (!conversation.messages) {
            conversation.messages = [];
        }
        try {
            conversation.messages.push(newMsg);
            conversation.lastUpdate = new Date();
            return "Message added successfully";
        } catch (error) {
            return "Error adding message: " + error;
        }
    }
}

async function getConversationWithParticipants(req: Request, res: Response){
    const { participantsId } = req.params;
    const result = await ConversationService.getConversationWithParticipants(participantsId);
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.json(result);
}

async function getAllConversationsFromUser(req: Request, res: Response)
{
    const userId = getUserByToken(req);
    const result = await ConversationService.getAllConversationsFromUser(userId);
    if(result.error){
      return res.status(500).json(result);
    }
    return res.json(result);
}

function setConversationSeenForUserAndMessage()
{

}


export default [
    createConversation,
    getConversationById,
    deleteConversation,
    addMessageToConversation
]