import { SceneList } from '../shared/consts';
import { Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { BotService } from '../bot/bot.service';
import { Context } from '../bot/model/interfaces/context.interface';
import { Markup } from 'telegraf';
import { BUTTONS } from '../bot/bot.buttons';

@Scene(SceneList.Start)
export class StartScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const user = await this.botService.getUser(ctx.from.id);
    if (!user) {
      await ctx.replyWithSticker({
        source: 'src/assets/stickers/hi-dog.tgs',
      });
      await ctx.replyWithHTML(
        [
          `👋 Привет ${ctx.from.first_name}!`,
          '',
          `Я так рад тебя видеть!`,
          `Я хочу быть твоим щенком! Пожалуйста, забери меня с собой! `,
          'Я буду тебе верным другом! ',
          `Но я нуждаюсь в твоей заботе и любви.`,
          `Меня нужно кормить, выгуливать, играть со мной и лечить, если я заболею.`,
          `Я буду самым счастливым щенком на свете, если ты станешь моим хозяином!`,
        ].join('\n'),
        Markup.keyboard([[BUTTONS.GET_PET]]).resize(),
      );
    } else {
    }
  }

  @Hears(BUTTONS.GET_PET)
  async onNext(@Ctx() context: Context) {
    await context.scene.enter(SceneList.NewPet);
  }
}
