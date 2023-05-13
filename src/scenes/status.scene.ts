import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneList } from '../shared/consts';
import { BotService } from '../bot/bot.service';
import { Context } from '../bot/model/interfaces/context.interface';
import { replyStatus } from '../shared/utils';
import { COMMANDS } from '../bot/bot.buttons';

@Scene(SceneList.Status)
export class StatusScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const user = await this.botService.getUser(ctx.from.id);
    const pet = user.pet;
    await replyStatus(
      ctx,
      'src/assets/stickers/smile-dog.tgs',
      `👋 Привет ${ctx.from.first_name}!`,
      pet,
    );
  }

  @Action(COMMANDS.BACK)
  async onBack(@Ctx() ctx: Context) {
    ctx.scene.leave();
  }

  @Action(COMMANDS.FEED)
  async onFEED(@Ctx() ctx: Context) {
    const pet = await this.botService.feed(ctx.from.id);
    await replyStatus(
      ctx,
      'src/assets/stickers/lick-dog.tgs',
      'Мммм... Вкуснятина!!!',
      pet,
    );
  }

  @Action(COMMANDS.WALK)
  async onWalk(@Ctx() ctx: Context) {
    const pet = await this.botService.walk(ctx.from.id);
    await replyStatus(
      ctx,
      'src/assets/stickers/smile-dog.tgs',
      'Классно погуляли!!! Спасибо!',
      pet,
    );
  }

  @Action(COMMANDS.PLAY)
  async onPlay(@Ctx() ctx: Context) {
    const pet = await this.botService.play(ctx.from.id);
    await replyStatus(
      ctx,
      'src/assets/stickers/smile-dog.tgs',
      'Как весело!!!',
      pet,
    );
  }
}
