/**
 * Stik Content Moderation Utility
 */

const SLANG_KEYWORDS = ['욕설1', '욕설2', '나쁜말']; // Example slang
const NOSTALGIA_KEYWORDS = ['그때', '추억', '우리', '선생님', '학교', '매점', '급식', '교실', '공부', '운동장', '친구'];

export interface ModerationResult {
  isSafe: boolean;
  reason?: string;
}

export function validateContent(content: string): ModerationResult {
  // 1. URL Filter
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (urlRegex.test(content)) {
    return { isSafe: false, reason: 'URL은 포함할 수 없습니다.' };
  }

  // 2. Phone Number Filter
  const phoneRegex = /(\d{2,3}?\d{3,4}?\d{4})/g;
  if (phoneRegex.test(content.replace(/-/g, '').replace(/ /g, ''))) {
    return { isSafe: false, reason: '전화번호는 포함할 수 없습니다.' };
  }

  // 3. Slang Filter
  for (const slang of SLANG_KEYWORDS) {
    if (content.includes(slang)) {
      return { isSafe: false, reason: '부적절한 표현이 포함되어 있습니다.' };
    }
  }

  // 4. AI Context Check (Simulated Nostalgia Score)
  const nostalgiaCount = NOSTALGIA_KEYWORDS.filter(k => content.includes(k)).length;
  // If content is too short and has no nostalgia keywords, mark as "Low Context"
  if (content.length > 10 && nostalgiaCount === 0) {
    // This is a simple heuristic: if it's a long message but doesn't feel like a memory
    // In a real app, this would be a call to an LLM
    // return { isSafe: false, reason: '추억과 관련 없는 내용인 것 같아요.' };
  }

  return { isSafe: true };
}
