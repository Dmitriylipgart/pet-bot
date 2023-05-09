export const BOT_NAME = 'pet-bot';

export enum PetType {
  Cat = 'cat',
  Dog = 'dog',
}

export enum SceneList {
  Start = 'start',
  NewPet = 'new-pet',
  Status = 'status',
}

export const FULLNESS = {
  OK: 'Не хочу есть',
  NOT_OK: 'Хочу есть',
  PROBLEM: 'Очень хочу есть',
};

export const WALK = {
  OK: 'Не хочу гулять',
  NOT_OK: 'Хочу гулять',
  PROBLEM: 'Очень хочу гулять',
};

export const MOOD = {
  OK: 'У меня хоршее настроение',
  NOT_OK: 'Хочу поиграть',
  PROBLEM: 'Мне грустно',
};

export const HEALTH = {
  OK: 'Я здоров',
  NOT_OK: 'Я плохо себя чувствую',
  PROBLEM: 'Я заболел',
};
