const crypto = require('crypto');

function verifyTelegramWebAppData(initData) {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');

  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.BOT_TOKEN)
    .digest();

  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return calculatedHash === hash;
}

module.exports = function telegramAuth(req, res, next) {
  const initData = req.headers['x-telegram-init-data'];
  if (!initData) return res.status(401).json({ error: 'initData yoq' });
  if (!verifyTelegramWebAppData(initData)) return res.status(403).json({ error: 'Telegram auth xatolik' });

  const params = new URLSearchParams(initData);
  const user = JSON.parse(params.get('user') || '{}');
  req.telegramUser = user;
  next();
};
