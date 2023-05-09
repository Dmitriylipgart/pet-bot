import {
  Action,
  Ctx,
  Hears,
  Message,
  On,
  Scene,
  SceneEnter,
} from 'nestjs-telegraf';
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
      source: 'src/assets/stickers/lick-dog.tgs',
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
    console.log(ctx, name);
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
    console.log('context name', ctx.session.__scenes.state['name']);
    pet.name = ctx.session.__scenes.state['name'];
    const user = new UserEntity();
    user.id = ctx.from.id;
    user.pets = [pet];
    const savedUser = await this.botService.saveUser(user);
    console.log(savedUser);
    await ctx.scene.enter(SceneList.Status);
  }

  @Action(COMMANDS.NO)
  async onNo(@Ctx() ctx: Context) {
    ctx.scene.reenter();
  }
}
