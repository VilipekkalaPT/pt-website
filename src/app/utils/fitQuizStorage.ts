"use client";

import { FilteredPackage } from "app/landing-page/hooks/useFitQuizManager";

const FITQUIZ_KEY = "fitquiz";

export interface FitQuizData {
  answers: Map<number, string[]> | [number, string[]][];
  result: FilteredPackage[];
}

export function saveFitQuiz(fitQuizData: FitQuizData): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(FITQUIZ_KEY, JSON.stringify(fitQuizData));
  } catch (error) {
    console.error("Error saving FitQuiz result:", error);
  }
}

export function loadFitQuiz(): FitQuizData | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(FITQUIZ_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    parsed.answers = new Map(parsed.answers);
    return parsed as FitQuizData;
  } catch (error) {
    console.error("Error loading FitQuiz result:", error);
    return null;
  }
}

export function clearFitQuiz(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(FITQUIZ_KEY);
  } catch (error) {
    console.error("Error clearing FitQuiz result:", error);
  }
}
