import { SceneList } from '../shared/consts';
import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { BotService } from '../bot/bot.service';
import { Context } from '../bot/model/interfaces/context.interface';

@Scene(SceneList.Start)
export class StartScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    ctx.reply(`Hi ${ctx.from.first_name} ${ctx.from.id}`);
  }
}
