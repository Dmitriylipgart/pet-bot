import {
  Action,
  Command,
  Ctx,
  InjectBot,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from './model/interfaces/context.interface';
import { SceneList } from '../shared/consts';
import { COMMANDS } from './bot.buttons';

@Update()
export class BotUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await this.bot.telegram.setMyCommands([
      { command: COMMANDS.START, description: 'Начать' },
      { command: COMMANDS.STATUS, description: 'Проверить щенка' },
    ]);
    await ctx.scene.enter(SceneList.Start);
  }

  @Command(COMMANDS.STATUS)
  async status(@Ctx() ctx: Context) {
    await ctx.scene.enter(SceneList.Status);
  }

  @Action(COMMANDS.STATUS)
  async statusAction(@Ctx() ctx: Context) {
    await ctx.scene.enter(SceneList.Status);
  }
}
