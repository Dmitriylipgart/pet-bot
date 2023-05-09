import { FULLNESS, HEALTH, MOOD, WALK } from './consts';
import { BUTTONS } from '../bot/bot.buttons';
import { PetEntity } from '../bot/model/entity/pet.entity';
import { Pet } from '../bot/model/model/pet';

export const resolveFullness = (fullness: number): string => {
  if (fullness < Pet.FULLNESS.PROBLEM) return FULLNESS.PROBLEM;
  if (fullness < Pet.FULLNESS.NOT_OK) return FULLNESS.NOT_OK;
  return FULLNESS.OK;
};

export const resolveWalk = (walk: number): string => {
  if (walk < Pet.WALK.PROBLEM) return WALK.PROBLEM;
  if (walk < Pet.WALK.NOT_OK) return WALK.NOT_OK;
  return WALK.OK;
};

export const resolveMood = (mood: number): string => {
  if (mood < Pet.MOOD.PROBLEM) return MOOD.PROBLEM;
  if (mood < Pet.MOOD.NOT_OK) return MOOD.NOT_OK;
  return MOOD.OK;
};

export const resolveHealth = (health: number): string => {
  if (health < Pet.HEALTH.PROBLEM) return HEALTH.PROBLEM;
  if (health < Pet.HEALTH.NOT_OK) return HEALTH.NOT_OK;
  return HEALTH.OK;
};

export const getStatusKeyBoard = () => {
  return [BUTTONS.FEED, BUTTONS.WALK, BUTTONS.PLAY, BUTTONS.BACK];
};
