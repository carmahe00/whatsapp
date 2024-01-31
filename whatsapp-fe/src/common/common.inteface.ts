export interface ConversationInterface {
    _id:           string;
    name:          string;
    picture:       string;
    isGroup:       boolean;
    users:         User[];
    createdAt:     Date;
    updatedAt:     Date;
    __v:           number;
    latestMessage: Converation;
}

export interface Converation {
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


export interface Messages {
    _id:          string;
    sender:       Sender;
    message:      string;
    conversation: Conversation;
    files:        any[];
    createdAt:    Date;
    updatedAt:    Date;
    __v:          number;
}

export interface Conversation {
    _id:           string;
    name:          string;
    picture:       string;
    isGroup:       boolean;
    users:         string[];
    createdAt:     Date;
    updatedAt:     Date;
    __v:           number;
    latestMessage: string;
}

export interface Sender {
    _id:     string;
    name:    string;
    email:   string;
    picture: string;
    status:  string;
}
