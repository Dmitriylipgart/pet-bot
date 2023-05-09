import { FULLNESS, MOOD, WALK } from './consts';
import { BUTTONS } from '../bot/bot.buttons';

export const resolveFullness = (fullness: number): string => {
  if (fullness < 3) return FULLNESS.STARVING;
  if (fullness < 8) return FULLNESS.NOT_FULL;
  return FULLNESS.FULL;
};

export const resolveWalk = (walk: number): string => {
  if (walk < 3) return WALK.PROBLEM;
  if (walk < 8) return WALK.NOT_OK;
  return WALK.OK;
};

export const resolveMood = (mood: number): string => {
  if (mood < 3) return MOOD.PROBLEM;
  if (mood < 8) return MOOD.NOT_OK;
  return MOOD.OK;
};

export const getStatusKeyBoard = () => {
  return [BUTTONS.FEED, BUTTONS.WALK, BUTTONS.PLAY, BUTTONS.BACK];
};
