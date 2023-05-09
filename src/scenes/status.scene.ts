import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneList } from '../shared/consts';
import { BotService } from '../bot/bot.service';
import { Context } from '../bot/model/interfaces/context.interface';
import { Markup } from 'telegraf';
import {
  getStatusKeyBoard,
  resolveFullness,
  resolveMood,
  resolveWalk,
} from '../shared/utils';
import { COMMANDS } from '../bot/bot.buttons';

@Scene(SceneList.Status)
export class StatusScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const user = await this.botService.getUser(ctx.from.id);
    const pet = user.pets[0];

    await ctx.replyWithSticker({
      source: 'src/assets/stickers/smile-dog.tgs',
    });
    await ctx.replyWithHTML(
      [
        `👋 Привет ${ctx.from.first_name}!`,
        '',
        `🧆 ${resolveFullness(pet.fullness)}`,
        `🦮 ${resolveWalk(pet.walk)}`,
        `⚽ ${resolveMood(pet.mood)}`,
      ].join('\n'),
      Markup.inlineKeyboard(getStatusKeyBoard(), {
        columns: 1,
      }),
    );
  }

  @Action(COMMANDS.BACK)
  async onBack(@Ctx() ctx: Context) {
    ctx.scene.leave();
  }
  @Action(COMMANDS.FEED)
  async onFEED(@Ctx() ctx: Context) {
    await this.botService.feed(ctx.from.id);
    await ctx.replyWithSticker({
      source: 'src/assets/stickers/lick-dog.tgs',
    });
    await ctx.replyWithHTML('Мммм... Вкуснятина!!!',
      Markup.inlineKeyboard(getStatusKeyBoard(), {
        columns: 1,
      }),);
  }

  @Action(COMMANDS.WALK)
  async onWalk(@Ctx() ctx: Context) {
    await this.botService.walk(ctx.from.id);
    await ctx.replyWithSticker({
      source: 'src/assets/stickers/smile-dog.tgs',
    });
    await ctx.replyWithHTML('Классно погуляли!!! Спасибо!',
      Markup.inlineKeyboard(getStatusKeyBoard(), {
        columns: 1,
      }),);
  }

  @Action(COMMANDS.PLAY)
  async onPlay(@Ctx() ctx: Context) {
    await this.botService.play(ctx.from.id);
    await ctx.replyWithSticker({
      source: 'src/assets/stickers/smile-dog.tgs',
    });
    await ctx.replyWithHTML('Как весело!!!',
      Markup.inlineKeyboard(getStatusKeyBoard(), {
        columns: 1,
      }),);
  }
}
