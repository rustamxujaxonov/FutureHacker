require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const WEBAPP_URL = process.env.FRONTEND_URL;

// /start komandasi
bot.start(async (ctx) => {
  const name = ctx.from.first_name || 'Hacker';
  await ctx.replyWithPhoto(
    { url: 'https://i.imgur.com/placeholder.png' }, // o'z rasmingizni qo'ying
    {
      caption: `👾 *Salom, ${name}!*\n\nFutureHacker CTF platformasiga xush kelibsiz!\n\n🎯 Bu yerda siz:\n• Real terminal buyruqlarini o'rganasiz\n• Kali Linux asoslarini egallaysiz\n• Kiberxavfsizlik bo'yicha bilim olasiz\n\n💰 Har bosqich uchun FH-Coins yig'asiz!\n\n🚀 Tayyor bo'lsangiz, quyidagi tugmani bosing:`,
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🖥️ Missiyani boshlash', WEBAPP_URL)],
        [Markup.button.callback('📊 Reyting', 'leaderboard')],
        [Markup.button.callback('ℹ️ Yordam', 'help')],
      ])
    }
  );
});

// Leaderboard tugmasi
bot.action('leaderboard', async (ctx) => {
  await ctx.answerCbQuery();
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/leaderboard`, {
      headers: { 'x-telegram-init-data': 'bot_request' }
    });
    // Sodda reyting xabari
    await ctx.reply(
      `🏆 *Top Hackerlar*\n\nReytingni ko'rish uchun ilovani oching:`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.webApp('🏆 Reytingni ko\'rish', WEBAPP_URL + '?tab=leaderboard')]
        ])
      }
    );
  } catch {
    await ctx.reply('Reyting hozircha mavjud emas.');
  }
});

// Yordam
bot.action('help', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `ℹ️ *FutureHacker CTF — Yordam*\n\n` +
    `🔹 Bu platforma *etik hacking* va kiberxavfsizlik asoslarini o'rgatadi\n` +
    `🔹 Har bosqichda real terminal buyruqlarini ishlatarsiz\n` +
    `🔹 Bosqichlarni bajarib FH-Coins yig'asiz\n\n` +
    `📚 *Mavzular:*\n` +
    `• Razvedka va ma'lumot yig'ish\n` +
    `• Port skanerlash (Nmap)\n` +
    `• Parol kriptografiyasi\n` +
    `• Tarmoq tahlili\n\n` +
    `⚠️ Bu faqat o'quv maqsadida!`,
    { parse_mode: 'Markdown' }
  );
});

// /profile komandasi
bot.command('profile', async (ctx) => {
  await ctx.reply(
    `👤 Profilingizni ko'rish uchun:`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('👤 Profilim', WEBAPP_URL + '?tab=profile')]
    ])
  );
});

bot.launch();
console.log('🤖 FutureHacker boti ishga tushdi!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
