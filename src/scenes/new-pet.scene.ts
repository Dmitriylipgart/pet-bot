import { Action, Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneList } from '../shared/consts';
import { BotService } from '../bot/bot.service';
import { Context } from '../bot/model/interfaces/context.interface';
import { BUTTONS, COMMANDS } from '../bot/bot.buttons';
import { Markup } from 'telegraf';
import { PetEntity } from '../bot/model/entity/pet.entity';
import { UserEntity } from 'src/bot/model/entity/user.entity';

@Scene(SceneList.NewPet)
export class NewPetScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.replyWithSticker({
      source: 'dist/assets/stickers/love-dog.tgs',
    });
    await ctx.replyWithHTML(
      [
        `Ура!!! ❤️❤️❤️`,
        `Я обещаю, что ты не пожалеешь о своем выборе. 
        `,
        `Как ты меня назовешь? `,
      ].join('\n'),
      Markup.inlineKeyboard([BUTTONS.BACK]),
    );
  }

  @Action(COMMANDS.BACK)
  async onBack(@Ctx() context: Context) {
    await context.scene.enter(SceneList.Start);
  }

  @On('text')
  async onText(@Message('text') name: string, @Ctx() ctx: Context) {
    if ('text' in ctx.message && name !== '/start') {
      ctx.state.name = name;
      ctx.session.__scenes.state['name'] = name;
      await ctx.replyWithHTML(
        [`Меня зовут ${name}?`].join('\n'),
        Markup.inlineKeyboard([[BUTTONS.YES, BUTTONS.NO]]),
      );
    }
    if (name === '/start') {
      ctx.scene.enter(SceneList.Start);
    }
  }

  @Action(COMMANDS.YES)
  async onYes(@Ctx() ctx: Context) {
    const pet = new PetEntity();
    pet.name = ctx.session.__scenes.state['name'];
    let user = await this.botService.getUser(ctx.from.id);
    if (!user) {
      user = new UserEntity();
      user.id = ctx.from.id;
    }
    user.pet = pet;
    await this.botService.saveUser(user);
    await ctx.scene.enter(SceneList.Status);
  }

  @Action(COMMANDS.NO)
  async onNo(@Ctx() ctx: Context) {
    ctx.scene.reenter();
  }
}
