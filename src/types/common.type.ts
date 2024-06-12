import { gamePositions } from '@constants/positions';

export type GamePosition = keyof typeof gamePositions;

export type PositionStyle = {
    borderColor: string;
    textColor: string;
    bgColor: string;
    hoverColor: string;
};

export type PositionsStyle = {
    [key in GamePosition]: PositionStyle;
};

export type BetPosition = {
    [key in GamePosition]?: number;
};

export type BettingData = {
    balance: number;
    bet: number;
    win: number;
};
