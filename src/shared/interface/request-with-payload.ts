export interface RequestWithPayload extends Request {
  user: { id: string; birthdayDate: Date };
}
