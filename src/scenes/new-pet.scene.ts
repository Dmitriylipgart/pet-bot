import { Ctx, Hears, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneList } from '../shared/consts';
import { BotService } from '../bot/bot.service';
import { Context } from '../bot/model/interfaces/context.interface';
import { BUTTONS } from '../bot/bot.buttons';
import { Markup } from 'telegraf';

@Scene(SceneList.NewPet)
export class NewPetWizard {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.replyWithSticker({
      source: 'src/assets/stickers/lick-dog.tgs',
    });
    await ctx.replyWithHTML(
      [
        `Ура!!! ❤️❤️❤️`,
        `Я обещаю, что ты не пожалеешь о своем выборе. 
        `,
        `Как ты меня назовешь? `,
      ].join('\n'),
      Markup.keyboard([[BUTTONS.BACK]]).resize(),
    );
  }

  @Hears(BUTTONS.BACK)
  async onBack(@Ctx() context: Context) {
    await context.scene.enter(SceneList.Start);
  }

  @On('text')
  async onText(@Message('text') name: string, @Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      [`Меня зовут ${name}?`].join('\n'),
      Markup.keyboard([[BUTTONS.YES]]).resize(),
    );
  }

  @Hears(BUTTONS.YES)
  async onYes(@Ctx() context: Context) {
    await context.scene.enter(SceneList.Start);
  }
}
