export interface ConversationInterface {
    _id:           string;
    name:          string;
    pucture:       string;
    isGroup:       boolean;
    users:         User[];
    createdAt:     Date;
    updatedAt:     Date;
    __v:           number;
    latestMessage: LatestMessage;
}

export interface LatestMessage {
    _id:          string;
    sender:       Sender;
    message:      string;
    conversation: string;
    files:        any[];
    createdAt:    Date;
    updatedAt:    Date;
    __v:          number;
}

export interface Sender {
    _id:     string;
    name:    string;
    email:   string;
    picture: string;
    status:  string;
}

export interface User {
    _id:       string;
    name:      string;
    email:     string;
    picture:   string;
    status:    string;
    createdAt: Date;
    updatedAt: Date;
}
