
// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();  
import i18n from '@/assets/i18n/i18n';
const { t } = i18n.global;
const styleDes = [
  { keyword: "assistant", emoji: "🔊", word: t('assistant') },
  { keyword: "chat", emoji: "🔊", word: t('chat') },
  { keyword: "customerservice", emoji: "🔊", word: t('customerservice') },
  { keyword: "newscast", emoji: "🎤", word: t('newscast') },
  { keyword: "affectionate", emoji: "😘", word: t('affectionate') },
  { keyword: "angry", emoji: "😡", word: t('angry') },
  { keyword: "calm", emoji: "😶", word: t('calm') },
  { keyword: "cheerful", emoji: "😄", word: t('cheerful') },
  { keyword: "disgruntled", emoji: "😠", word: t('disgruntled') },
  { keyword: "fearful", emoji: "😨", word: t('fearful') },
  { keyword: "gentle", emoji: "😇", word: t('gentle') },
  { keyword: "lyrical", emoji: "😍", word: t('lyrical') },
  { keyword: "sad", emoji: "😭", word: t('sad') },
  { keyword: "serious", emoji: "😐", word: t('serious') },
  { keyword: "poetry-reading", emoji: "🔊", word: t('poetry-reading') },
  { keyword: "narration-professional", emoji: "👩‍💼", word: t('narration-professional') },
  { keyword: "newscast-casual", emoji: "🔊", word: t('newscast-casual') },
  { keyword: "embarrassed", emoji: "😓", word: t('embarrassed') },
  { keyword: "depressed", emoji: "😔", word: t('depressed') },
  { keyword: "envious", emoji: "😒", word: t('envious') },
  { keyword: "narration-relaxed", emoji: "🎻", word: t('narration-relaxed') },
  {
    keyword: "Advertisement_upbeat",
    emoji: "🗣",
    word: t('Advertisement_upbeat'),
  },
  { keyword: "Narration-relaxed", emoji: "🎻", word: t('Narration-relaxed') },
  { keyword: "Sports_commentary", emoji: "⛹", word: t('Sports_commentary') },
  {
    keyword: "Sports_commentary_excited",
    emoji: "🥇",
    word: t('Sports_commentary_excited'),
  },
  { keyword: "documentary-narration", emoji: "🎞", word: t('documentary-narration') },
  { keyword: "excited", emoji: "😁", word: t('excited') },
  { keyword: "friendly", emoji: "😋", word: t('friendly') },
  { keyword: "terrified", emoji: "😱", word: t('terrified') },
  { keyword: "shouting", emoji: "📢", word: t('shouting') },
  { keyword: "unfriendly", emoji: "😤", word: t('unfriendly') },
  { keyword: "whispering", emoji: "😶", word: t('whispering') },
  { keyword: "hopeful", emoji: "☀️", word: t('hopeful') },
];
const roleDes = [
  { keyword: "YoungAdultFemale", emoji: "👱‍♀️", word: t('YoungAdultFemale') },
  { keyword: "YoungAdultMale", emoji: "👱", word: t('YoungAdultMale') },
  { keyword: "OlderAdultFemale", emoji: "👩", word: t('OlderAdultFemale') },
  { keyword: "OlderAdultMale", emoji: "👨", word: t('OlderAdultMale') },
  { keyword: "SeniorFemale", emoji: "👵", word: t('SeniorFemale') },
  { keyword: "SeniorMale", emoji: "👴", word: t('SeniorMale') },
  { keyword: "Girl", emoji: "👧", word: t('Girl') },
  { keyword: "Boy", emoji: "👦", word: t('Boy') },
  { keyword: "Narrator", emoji: "🔊", word: t('Narrator') },
];
const getStyleDes = (key: string) => {
  return styleDes.find((item) => item.keyword === key);
};

const getRoleDes = (key: string) => {
  return roleDes.find((item) => item.keyword === key);
};

export { getStyleDes, getRoleDes };
