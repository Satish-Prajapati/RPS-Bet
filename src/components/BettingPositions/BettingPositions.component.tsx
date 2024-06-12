import React, { useCallback, useMemo, useState } from 'react';
import {
    betPositionsAtom,
    bettingDataAtom,
    bettingStatusAtom,
} from '@/atoms/bettingAtom';
import { BettingStatus } from '@/types/bettingStatus.type';
import { BetPosition, BettingData, GamePosition } from '@/types/common.type';
import GenerateDisplayResult from '@components/GenerateDisplayResult/GenerateDisplayResult.component';
import PositionButton from '@components/PositionButton/PositionButton.component';
import { positions } from '@constants/positions';
import { useAtom } from 'jotai';

const BettingPositions: React.FC = () => {
    const [bettingData, setBettingData] = useAtom<BettingData>(bettingDataAtom);
    const [bettingStatus, setBettingStatus] =
        useAtom<string>(bettingStatusAtom);
    const [userBetPositions, setUserBetPositions] =
        useAtom<BetPosition>(betPositionsAtom);
    const [winningBet, setWinningBet] = useState<GamePosition>();

    const disabledPosition = useMemo(() => {
        if (userBetPositions && Object.keys(userBetPositions).length !== 2) {
            return '';
        }
        return positions.find((position) => !userBetPositions[position]) || '';
    }, [userBetPositions]);

    const handleWinningBetUpdate = useCallback((bet: GamePosition) => {
        setWinningBet(bet);
    }, []);

    const handleBet = useCallback(
        (position: GamePosition): void => {
            if (bettingData.balance < 500) {
                alert('Out of balance');
                return;
            }
            setBettingData((prev) => ({
                ...prev,
                balance: prev.balance - 500,
            }));
            setUserBetPositions((prev) => ({
                ...prev,
                [position]: (prev[position] || 0) + 500,
            }));
        },
        [bettingData.balance]
    );

    const handlePlay = () => {
        setBettingStatus(BettingStatus.BETTING);
    };

    const handleClearBets = () => {
        setUserBetPositions({});
        setBettingStatus(BettingStatus.SELECTION);
    };

    return (
        <div className="h-[95vh]">
            <div className="h-[45%] flex flex-col items-center justify-center">
                {bettingStatus !== BettingStatus.SELECTION && (
                    <GenerateDisplayResult
                        updateWinningBet={handleWinningBetUpdate}
                    />
                )}
            </div>
            <div className="h-[55%] flex flex-col items-center">
                <span className="text-yolo-primary font-medium h-12">
                    {bettingStatus === BettingStatus.SELECTION && (
                        <span>PICK YOUR POSITION</span>
                    )}
                </span>
                <div className="flex gap-4">
                    {positions.map((position) => (
                        <PositionButton
                            key={position}
                            betAmount={userBetPositions[position] || 0}
                            isDisabled={
                                disabledPosition === position ||
                                bettingStatus !== BettingStatus.SELECTION
                            }
                            isWinning={winningBet === position}
                            position={position}
                            onClick={() => handleBet(position)}
                        />
                    ))}
                </div>
                <div className="flex gap-4 mt-28">
                    {(bettingStatus === BettingStatus.SELECTION ||
                        bettingStatus === BettingStatus.BETTING) && (
                        <button
                            className={`w-44 h-20 border-2 rounded-[35px] border-yolo-primary bg-black text-2xl text-yolo-primary ${bettingStatus !== BettingStatus.SELECTION || Object.keys(userBetPositions).length < 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105 transition-transform duration-300'}`}
                            disabled={
                                bettingStatus !== BettingStatus.SELECTION ||
                                Object.keys(userBetPositions).length < 1
                            }
                            onClick={handlePlay}
                        >
                            PLAY
                        </button>
                    )}
                    {bettingStatus === BettingStatus.RESULT && (
                        <button
                            className="w-44 h-20 border-2 rounded-[35px] border-yolo-primary bg-black text-2xl text-yolo-primary cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={handleClearBets}
                        >
                            CLEAR
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BettingPositions;
