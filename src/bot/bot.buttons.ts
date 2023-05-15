import { Markup } from 'telegraf';

export const COMMANDS = {
  GET_PET: 'get_pet',
  BACK: 'back',
  FEED: 'feed',
  WALK: 'walk',
  PLAY: 'play',
  YES: 'yes',
  NO: 'no',
  STATUS: 'status',
  START: 'start',
};

export const BUTTONS = {
  GET_PET: Markup.button.callback('🐶 Взять щенка!', COMMANDS.GET_PET),
  BACK: Markup.button.callback('↩️ Назад', COMMANDS.BACK),
  FEED: Markup.button.callback('🧆 Покормить', COMMANDS.FEED),
  WALK: Markup.button.callback('🦮 Погулять', COMMANDS.WALK),
  PLAY: Markup.button.callback('⚽️ Поиграть', COMMANDS.PLAY),
  YES: Markup.button.callback('✅ ДА', COMMANDS.YES),
  NO: Markup.button.callback('❌ Нет', COMMANDS.NO),
  STATUS: (name: string) => {
    return Markup.button.callback(`🐶 Проверить ${name}`, COMMANDS.STATUS);
  },
};
