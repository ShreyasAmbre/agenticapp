export interface ChatHistory {
  id: number;
  dateTime: string;
  senderName: string;
  message: string;
  isSender: boolean; // true if current user is the sender
}
