export interface IFlashSale {
  _id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  isOnGoing: boolean;
  listItems: object[];
}
