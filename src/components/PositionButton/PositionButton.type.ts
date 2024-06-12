import { GamePosition } from '@/types/common.type';

export interface PositionButtonProps {
    position: GamePosition;
    betAmount: number;
    isDisabled: boolean;
    isWinning: boolean;
    onClick: () => void;
}
