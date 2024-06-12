import { PositionsStyle } from '@/types/common.type';

const gamePositions = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors',
} as const;

const positions = Object.values(gamePositions);

Object.freeze(gamePositions);

const positionsStyle: PositionsStyle = {
    [gamePositions.rock]: {
        borderColor: 'border-yolo-blue',
        textColor: 'text-yolo-blue',
        hoverColor: 'bg-[#211E4E]',
        bgColor: 'bg-[#211E4E]',
    },
    [gamePositions.paper]: {
        borderColor: 'border-yolo-green',
        textColor: 'text-yolo-green',
        hoverColor: 'bg-[#211E4E]',
        bgColor: 'bg-[#1B381C]',
    },
    [gamePositions.scissors]: {
        borderColor: 'border-yolo-red',
        textColor: 'text-yolo-red',
        hoverColor: 'bg-[#211E4E]',
        bgColor: 'bg-[#50081F]',
    },
};

Object.freeze(positionsStyle);

const winMapping = {
    [gamePositions.scissors]: gamePositions.paper,
    [gamePositions.paper]: gamePositions.rock,
    [gamePositions.rock]: gamePositions.scissors,
};

Object.freeze(winMapping);

export { positionsStyle, winMapping, gamePositions, positions };
