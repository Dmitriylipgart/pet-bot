import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneList } from '../shared/consts';
import { BotService } from '../bot/bot.service';
import { Context } from '../bot/model/interfaces/context.interface';
import { Markup } from 'telegraf';
import { getStatusKeyBoard, resolveFullness, resolveMood, resolveWalk } from '../shared/utils';

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
      Markup.keyboard(getStatusKeyBoard()).resize(),
    );
  }
}
