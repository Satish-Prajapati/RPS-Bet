import React, { useEffect, useMemo, useState } from 'react';
import { GenerateDisplayResultProps } from './GenerateDisplayResult.type';
import {
    betPositionsAtom,
    bettingDataAtom,
    bettingStatusAtom,
} from '@/atoms/bettingAtom';
import { positionsStyle, positions, winMapping } from '@/constants/positions';
import { BettingStatus } from '@/types/bettingStatus.type';
import { BetPosition, BettingData, GamePosition } from '@/types/common.type';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { useAtom } from 'jotai';

const GenerateDisplayResult: React.FC<GenerateDisplayResultProps> = ({
    updateWinningBet,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setBettingData] = useAtom<BettingData>(bettingDataAtom);
    const [bettingStatus, setBettingStatus] =
        useAtom<string>(bettingStatusAtom);
    const [userBetPositions] = useAtom<BetPosition>(betPositionsAtom);
    const [computerPosition, setComputerPosition] =
        useState<GamePosition | null>(null);
    const [winningBet, setWinningBet] = useState<{
        name: GamePosition;
        won: number;
    } | null>();
    const [tieLoss, setTieLoss] = useState<string | null>(null);

    const userBettingPositions = useMemo(() => {
        return Object.keys(userBetPositions);
    }, [userBetPositions]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 3);
        const computerChoice = positions[randomIndex];
        const userChoices = userBettingPositions as GamePosition[];
        const winningPosition = userChoices.find(
            (bet) => winMapping[bet] === computerChoice
        ) as GamePosition;

        setComputerPosition(computerChoice);

        if (winningPosition) {
            return processWinning(winningPosition, userChoices);
        }
        if (userChoices.length > 1) {
            return processLosing();
        }
        const isTie = userChoices.some((choice) => choice === computerChoice);
        if (isTie) {
            return processTie(userChoices[0]);
        }
        return processLosing();
    }, []);

    const processTie = (userPosition: GamePosition) => {
        setTimeout(() => {
            setBettingStatus(BettingStatus.RESULT);
            setTieLoss("IT'S TIE!");
            setBettingData((prev) => ({
                ...prev,
                bet: prev.bet + 1,
                balance: prev.balance + (userBetPositions[userPosition] || 0),
            }));
        }, 1000);
    };

    const processLosing = () => {
        setTimeout(() => {
            setBettingStatus(BettingStatus.RESULT);
            setTieLoss('YOU LOSE!');
            setBettingData((prev) => ({
                ...prev,
                bet: prev.bet + 1,
            }));
        }, 1000);
    };

    const processWinning = (
        winningPosition: GamePosition,
        userPositions: string[]
    ) => {
        setTimeout(() => {
            updateWinningBet(winningPosition);
            setBettingStatus(BettingStatus.RESULT);
            const multiplier = userPositions.length === 1 ? 14 : 3;
            const amountWon =
                (userBetPositions[winningPosition] || 1) * multiplier;
            setWinningBet({ name: winningPosition, won: amountWon });
            setBettingData((prev) => ({
                bet: prev.bet + 1,
                win: prev.win + 1,
                balance: prev.balance + amountWon,
            }));
        }, 1000);
    };

    return (
        <div>
            {bettingStatus === BettingStatus.BETTING && computerPosition && (
                <div className="flex items-center justify-center relative w-full text-6xl font-semibold uppercase">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <span className="text-yolo-primary text-4xl">VS</span>
                    </div>
                    <div className="flex-1 text-right absolute right-24">
                        <span>{computerPosition}</span>
                    </div>
                    <div className="flex-1 text-left absolute left-24">
                        {userBettingPositions.map((position) => (
                            <div key={position}>{position}</div>
                        ))}
                    </div>
                </div>
            )}
            {bettingStatus === BettingStatus.RESULT &&
                (winningBet ? (
                    <div className="uppercase space-y-4">
                        <div
                            className={`text-5xl font-semibold ${positionsStyle[winningBet.name as GamePosition].textColor}`}
                        >
                            {winningBet.name} WON
                        </div>
                        <div className="text-3xl font-medium text-center">
                            <span className="text-yolo-primary">YOU WIN</span>{' '}
                            {formatCurrency(winningBet.won)}
                        </div>
                    </div>
                ) : (
                    tieLoss && (
                        <div className={`text-5xl font-semibold`}>
                            {tieLoss}
                        </div>
                    )
                ))}
        </div>
    );
};

export default GenerateDisplayResult;
