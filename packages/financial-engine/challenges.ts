/**
 * Financial Challenges Module
 * Tracks and manages financial challenges for users.
 */

export interface FinancialChallenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number; // In minor units (cents)
  currentAmount: number;
  deadline: string; // ISO date string
  difficulty: "EASY" | "MEDIUM" | "HARD";
  category: "SAVING" | "SPENDING_CUT" | "INCOME_BOOST" | "BALANCED";
  isCompleted: boolean;
  createdAt: string;
  userId: string;
}

/**
 * Example challenges
 */
export const exampleChallenges: FinancialChallenge[] = [
  {
    id: "1",
    title: "Save KSh 1,000 in seven days",
    description: "Build the habit of saving regularly",
    targetAmount: 1000,
    currentAmount: 0,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    difficulty: "EASY",
    category: "SAVING",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    userId: "",
  },
  {
    id: "2",
    title: "No unnecessary spending for five days",
    description: "Identify and avoid non-essential expenses",
    targetAmount: 0, // Measured in days, not amount
    currentAmount: 0, // Days completed
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    difficulty: "EASY",
    category: "SPENDING_CUT",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    userId: "",
  },
  {
    id: "3",
    title: "Build a KSh 5,000 emergency fund",
    description: "Create a financial safety net",
    targetAmount: 5000,
    currentAmount: 0,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    difficulty: "MEDIUM",
    category: "SAVING",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    userId: "",
  },
  {
    id: "4",
    title: "Reduce entertainment spending by 15%",
    description: "Cut back on non-essential entertainment expenses",
    targetAmount: 15, // Percentage reduction
    currentAmount: 0,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    difficulty: "MEDIUM",
    category: "SPENDING_CUT",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    userId: "",
  },
];

/**
 * Check if a challenge is due
 */
export function isChallengeDue(deadline: string): boolean {
  const deadlineDate = new Date(`${deadline}T23:59:59`);
  const today = new Date();
  return deadlineDate < today;
}

/**
 * Check if a challenge is completed
 */
export function isChallengeCompleted(challenge: Pick<FinancialChallenge, "currentAmount" | "targetAmount" | "isCompleted">): boolean {
  return challenge.isCompleted || (challenge.targetAmount > 0 && challenge.currentAmount >= challenge.targetAmount);
}

/**
 * Update challenge progress
 */
export function updateChallengeProgress(
  challenge: FinancialChallenge,
  amount: number,
  date: Date
): FinancialChallenge {
  const newCurrentAmount = challenge.currentAmount + amount;
  const newIsCompleted =
    newCurrentAmount >= challenge.targetAmount ||
    challenge.targetAmount > 0 && newCurrentAmount >= challenge.targetAmount;

  return {
    ...challenge,
    currentAmount: newCurrentAmount,
    isCompleted: newIsCompleted,
  };
}

/**
 * Get active challenges for a user
 */
export function getActiveChallenges(
  challenges: FinancialChallenge[]
): FinancialChallenge[] {
  return challenges.filter(
    (c) => !c.isCompleted && !isChallengeDue(c.deadline)
  );
}

/**
 * Get completed challenges for a user
 */
export function getCompletedChallenges(
  challenges: FinancialChallenge[]
): FinancialChallenge[] {
  return challenges.filter((c) => c.isCompleted);
}

/**
 * Get due challenges for a user
 */
export function getDueChallenges(
  challenges: FinancialChallenge[]
): FinancialChallenge[] {
  return challenges.filter((c) => isChallengeDue(c.deadline) && !c.isCompleted);
}

export default {
  exampleChallenges,
  isChallengeDue,
  isChallengeCompleted,
  updateChallengeProgress,
  getActiveChallenges,
  getCompletedChallenges,
  getDueChallenges,
}
