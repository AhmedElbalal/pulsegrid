export type EventInput = {
  type: string;
  userId: string;
  props?: Record<string, any>;
  ts?: Date;
};
