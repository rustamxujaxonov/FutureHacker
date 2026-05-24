require('dotenv').config();
const mongoose = require('mongoose');
const Stage = require('./models/Stage');

const stages = [
  {
    id: 1,
    title: "1-BOSQICH — RAZVEDKA",
    description: "Maqsad serverga ulanib yashirin faylni topish",
    coins: 100,
    prompt: "fh@kali:~$",
    order: 1,
    advisorText: "Salom, yosh hacker! yovuzlar.com saytiga kirib yashirin faylni top.",
    errorHint: "connect → login → ls → open → download ketma-ketligiga amal qiling",
    commands: [
      { input: "connect yovuzlar.com", output: "[+] Ulanish muvaffaqiyatli! Login va parolni kiriting.", progress: 20 },
      { input: "login admin 12345678", output: "[+] KIRISH MUVAFFAQIYATLI — Xush kelibsiz, admin!", progress: 40 },
      { input: "ls", output: "drwx------ Yashirin_Fayllar/\n-rw-r--r-- README.txt", progress: 60 },
      { input: "open yashirin_fayllar", output: "[+] Kirish berildi!\n-rwx------ secret_data.dat", progress: 80 },
      { input: "download secret_data.dat", output: "[+] Fayl muvaffaqiyatli yuklab olindi!", progress: 100, isWin: true },
    ]
  },
  {
    id: 2,
    title: "2-BOSQICH — PORT SKANERLASH",
    description: "Nmap yordamida zaif portlarni topish",
    coins: 150,
    prompt: "fh@kali:~/recon$",
    order: 2,
    advisorText: "target-corp.net serverini skaner qiling va zaiflikni toping.",
    errorHint: "nmap → check port 21 → exploit ftp",
    commands: [
      { input: "nmap -sv target-corp.net", output: "21/tcp open ftp vsftpd 2.3.4 ← ZAIF!\n22/tcp open ssh OpenSSH 8.9", progress: 33 },
      { input: "check port 21", output: "vsftpd 2.3.4 — CVE-2011-2523 — Backdoor zaiflik aniqlandi!", progress: 66 },
      { input: "exploit ftp", output: "[+] ROOT ACCESS OLINDI!\nuid=0(root) gid=0(root)", progress: 100, isWin: true },
    ]
  },
  {
    id: 3,
    title: "3-BOSQICH — KRIPTOGRAFIYA",
    description: "MD5 hash ni crack qilish",
    coins: 200,
    prompt: "fh@kali:~/crypto$",
    order: 3,
    advisorText: "Hash faylini tahlil qiling va parolni aniqlang.",
    errorHint: "cat → hashid → hashcat → verify password",
    commands: [
      { input: "cat hash.txt", output: "5f4dcc3b5aa765d61d8327deb882cf99", progress: 25 },
      { input: "hashid hash.txt", output: "[+] Aniqlandi: MD5 (95%)", progress: 50 },
      { input: "hashcat -a0 hash.txt", output: "[+] TOPILDI! Hash → password", progress: 75 },
      { input: "verify password", output: "[+] PAROL TASDIQLANDI! MD5('password') ✓", progress: 100, isWin: true },
    ]
  },
  {
    id: 4,
    title: "4-BOSQICH — TARMOQ TAHLILI",
    description: "tcpdump bilan shubhali trafik aniqlash",
    coins: 250,
    prompt: "fh@kali:~/network$",
    order: 4,
    advisorText: "Tarmoq trafigini tinglang va shubhali paketlarni toping.",
    errorHint: "ifconfig → tcpdump -i eth0 → filter http → analyze packets",
    commands: [
      { input: "ifconfig", output: "eth0: inet 10.0.0.5 netmask 255.255.255.0", progress: 25 },
      { input: "tcpdump -i eth0", output: "10.0.0.99 → HTTP GET /admin/config ← SHUBHALI!", progress: 50 },
      { input: "filter http", output: "Authorization: Basic YWRtaW46cGFzc3dvcmQ= (admin:password)", progress: 75 },
      { input: "analyze packets", output: "[+] ARP Poisoning + HTTP Sniffing aniqlandi! Hisobot saqlandi.", progress: 100, isWin: true },
    ]
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Stage.deleteMany({});
  await Stage.insertMany(stages);
  console.log('✅ Barcha bosqichlar bazaga yuklandi!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
