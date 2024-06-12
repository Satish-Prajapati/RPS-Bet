import React, { useMemo } from 'react';
import { PositionButtonProps } from './PositionButton.type';
import { positionsStyle } from '@/constants/positions';

const PositionButton: React.FC<PositionButtonProps> = ({
    position,
    betAmount,
    isDisabled,
    isWinning,
    onClick,
}) => {
    console.log({ position });
    const style = useMemo(() => {
        return positionsStyle[position];
    }, [position]);
    return (
        <div
            className={`w-48 ${style.bgColor} flex flex-col items-center py-4 ${isWinning ? 'border-4' : 'border-2'} rounded-md ${style.borderColor} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105 transition-transform duration-300'}`}
            onClick={!isDisabled ? onClick : undefined}
        >
            <div className="h-20 w-20 flex justify-center items-center">
                {betAmount > 0 && (
                    <div className="rounded-full border-4 border-[#225EFF] bg-white text-black h-[50px] w-[50px] flex justify-center items-center font-medium">
                        {betAmount}
                    </div>
                )}
            </div>
            <span className={`${style.textColor} uppercase text-2xl`}>
                {position}
            </span>
        </div>
    );
};

export default PositionButton;
