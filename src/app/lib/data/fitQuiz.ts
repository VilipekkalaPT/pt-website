export interface FitQuiz {
  steps: FitQuizStep[];
}

export interface FitQuizStep {
  id: number;
  question: string;
  subtitle: string;
  options: FitQuizOption[];
}

export interface FitQuizOption {
  id: string;
  label: string;
  description: string;
}

export const fitQuizData: FitQuiz = {
  steps: [
    {
      id: 0,
      question: "Welcome to the Fit Quiz!",
      subtitle: "Let's find your perfect fitness match.",
      options: [],
    },
    {
      id: 1,
      question: "What is your fitness goal?",
      subtitle: "Pick what fits your vibe first",
      options: [
        {
          id: "solo",
          label: "Just me (Solo)",
          description:
            "You want 1-on-1 attention to focus fully on your personal fitness journey",
        },
        {
          id: "duo",
          label: " Me + someone (Duo)",
          description:
            "You and a friend or partner want to train together and slay side-by-side",
        },
      ],
    },
    {
      id: 2,
      question: "What are you looking for?",
      subtitle: "Choose one or more focus areas.",
      options: [
        {
          id: "gym",
          label: "Gym Training",
          description: "In-person form & strength coaching",
        },
        {
          id: "plan",
          label: "Personal Training Plan",
          description: "Structured, progressive plan for your goals",
        },
        {
          id: "diet",
          label: "Dietary Coaching",
          description: "Nutrition support to fuel your fitness.",
        },
      ],
    },
  ],
};
