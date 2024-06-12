import { GamePosition } from '@/types/common.type';

export interface GenerateDisplayResultProps {
    updateWinningBet: (bet: GamePosition) => void;
}
