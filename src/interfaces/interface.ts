export interface IuserInfo {
    avatar_url: string;
    id?: string;
    loginname: string;
    githubUsername?: string;
    create_at?: number;
    score?: number;
    recent_topics?: Itopics[]; 
    recent_replies?: Itopics[]; 
}

export interface Istore {
    userInfo: IuserInfo;
    accessToken: string;
    isLogin: boolean;
    messageCount: number;
    login(accessToken: string,userInfo: IuserInfo): () => void;
    logout(): () => void;
    checkLogin(): () => void;
    fetchMessageCount(): () => void;
}

export interface Itopics {
    id:string;
    title:string;
    content:string;
    author_id:string;
    author:IuserInfo
    tab:string;
    good:boolean;
    top:boolean;
    reply_count:number;
    visit_count:number;
    create_at:number;
    last_reply_at:number;
    is_collect:boolean;
    replies:Ireplie[]; 
}

export interface Ireplie {
    id: string;
    author: IuserInfo;
    content: string;
    ups: number[];
    create_at: string;
    reply_id: number;
    is_uped: boolean;
}

export interface Imessage {
    id: string;
    type: string;
    has_read: true;
    author: IuserInfo;
    topic: Itopics;
    reply: any;
    create_at: string;
}