const styleDes = [
  { keyword: "assistant", emoji: "🔊", word: "助理" },
  { keyword: "chat", emoji: "🔊", word: "聊天" },
  { keyword: "customerservice", emoji: "🔊", word: "客服" },
  { keyword: "newscast", emoji: "🎤", word: "新闻" },
  { keyword: "affectionate", emoji: "😘", word: "深情" },
  { keyword: "angry", emoji: "😡", word: "生气" },
  { keyword: "calm", emoji: "😶", word: "冷静" },
  { keyword: "cheerful", emoji: "😄", word: "快乐" },
  { keyword: "disgruntled", emoji: "😠", word: "不满" },
  { keyword: "fearful", emoji: "😨", word: "害怕" },
  { keyword: "gentle", emoji: "😇", word: "温柔" },
  { keyword: "lyrical", emoji: "😍", word: "抒情" },
  { keyword: "sad", emoji: "😭", word: "伤心" },
  { keyword: "serious", emoji: "😐", word: "严肃" },
  { keyword: "poetry-reading", emoji: "🔊", word: "诗歌朗读" },
  { keyword: "narration-professional", emoji: "👩‍💼", word: "专业客观" },
  { keyword: "newscast-casual", emoji: "🔊", word: "通用随意语气发布一般新闻" },
  { keyword: "embarrassed", emoji: "😓", word: "尴尬" },
  { keyword: "depressed", emoji: "😔", word: "抑郁" },
  { keyword: "envious", emoji: "😒", word: "嫉妒" },
  { keyword: "narration-relaxed", emoji: "🎻", word: "舒缓悦耳" },
  {
    keyword: "Advertisement_upbeat",
    emoji: "🗣",
    word: "兴奋精力充沛的推广产品或服务",
  },
  { keyword: "Narration-relaxed", emoji: "🎻", word: "舒缓悦耳" },
  { keyword: "Sports_commentary", emoji: "⛹", word: "体育解说" },
  {
    keyword: "Sports_commentary_excited",
    emoji: "🥇",
    word: "快速且充满活力的播报体育赛事",
  },
  { keyword: "documentary-narration", emoji: "🎞", word: "记录片叙事" },
];
const roleDes = [
  { keyword: "YoungAdultFemale", emoji: "👱‍♀️", word: "年轻成年女性" },
  { keyword: "YoungAdultMale", emoji: "👱", word: "年轻成年男性" },
  { keyword: "OlderAdultFemale", emoji: "👩", word: "年长成年女性" },
  { keyword: "OlderAdultMale", emoji: "👨", word: "年长成年男性" },
  { keyword: "SeniorFemale", emoji: "👵", word: "老年女性" },
  { keyword: "SeniorMale", emoji: "👴", word: "老年男性" },
  { keyword: "Girl", emoji: "👧", word: "女孩" },
  { keyword: "Boy", emoji: "👦", word: "男孩" },
  { keyword: "Narrator", emoji: "🔊", word: "旁白" },
];
const getStyleDes = (key: string) => {
  return styleDes.find((item) => item.keyword === key);
};

const getRoleDes = (key: string) => {
  return roleDes.find((item) => item.keyword === key);
};

export { getStyleDes, getRoleDes };
