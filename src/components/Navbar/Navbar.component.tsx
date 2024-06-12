import React from 'react';
import { bettingDataAtom } from '@/atoms/bettingAtom';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { useAtom } from 'jotai';

const Navbar: React.FC = () => {
    const [bettingData] = useAtom(bettingDataAtom);
    return (
        <div className="flex justify-center bg-[#161616]">
            <ul className="flex gap-16 py-2 font-semibold">
                <li>
                    <span className="text-yolo-primary">BALANCE</span>:{' '}
                    {formatCurrency(bettingData.balance)}
                </li>
                <li>
                    <span className="text-yolo-primary">BET</span>:{' '}
                    {bettingData.bet}
                </li>
                <li>
                    <span className="text-yolo-primary">WIN</span>:{' '}
                    {bettingData.win}
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
