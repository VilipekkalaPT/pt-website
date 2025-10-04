import { FitQuiz } from "../types/type";

export const fitQuizData: FitQuiz = {
  steps: [
    {
      id: 0,
      title: "Pick training style",
      options: [
        {
          id: "solo",
          label: "Solo",
          description: "1-on-1 personal fitness journey",
        },
        {
          id: "duo",
          label: "Duo",
          description: "You and a partner want to train together",
        },
      ],
    },
    {
      id: 1,
      title: "Choose one or more focus areas",
      options: [
        {
          id: "gym",
          label: "Gym training",
          description: "In-person form correction, strength-building sessions",
        },
        {
          id: "plan",
          label: "Personal training plan",
          description: "Structured, progressive plan for your goals",
        },
        {
          id: "diet",
          label: "Dietary coaching",
          description: "Nutrition support to fuel your fitness.",
        },
      ],
    },
    {
      id: 2,
      title: "Select the format of package",
      options: [
        {
          id: "online",
          label: "Online",
          description: "Train anywhere, fully guided online",
        },
        {
          id: "offline",
          label: "Offline",
          description: "Face-to-face gym sessions with support",
        },
        {
          id: "hybrid",
          label: "Hybrid",
          description: "Blend online flexibility with in-person coaching",
        },
      ],
    },
    {
      id: 3,
      title: "",
      options: [],
    },
  ],
};
