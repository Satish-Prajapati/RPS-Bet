import { BettingStatus } from '@/types/bettingStatus.type';
import { BetPosition } from '@/types/common.type';
import { atom } from 'jotai';

export const bettingDataAtom = atom<{
    balance: number;
    bet: number;
    win: number;
}>({
    balance: 5000,
    bet: 0,
    win: 0,
});

export const bettingStatusAtom = atom<string>(BettingStatus.SELECTION);

export const betPositionsAtom = atom<BetPosition>({});
