"use client";

import { useState } from "react";
import {
  HelloIcon,
  MorningIcon,
  NightIcon,
  HowAreYouIcon,
  IAmGoodIcon,
  ThankYouIcon,
  PleaseIcon,
  GoodbyeIcon,
  NiceToMeetYouIcon,
} from "@/components/LessonIllustrations";
import { useColorBlindMode } from "@/components/version3/ColorBlindModeContext";
import LessonDisplayMenu from "@/components/version3/LessonDisplayMenu";
import { useSpeakEstonian } from "@/components/version3/useSpeakEstonian";

type QuestionType = "multiple_choice" | "type" | "word_blocks";

interface LessonPhrase {
  id: string;
  estonian: string;
  english: string;
  pronunciation: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  sentenceEstonian: string;
  sentenceEnglish: string;
  multipleChoiceOptions: string[];
  wordBlocks: string[];
}

const LESSON_PHRASES: LessonPhrase[] = [
  {
    id: "hello",
    estonian: "Tere",
    english: "Hello",
    pronunciation: "TEH-reh",
    Icon: HelloIcon,
    sentenceEstonian: "Tere! Kuidas läheb?",
    sentenceEnglish: "Hello! How are you?",
    multipleChoiceOptions: ["Tere", "Jah", "Ei", "Palun"],
    wordBlocks: ["Tere", "!", "Kuidas", "läheb", "?"],
  },
  {
    id: "morning",
    estonian: "Tere hommikust",
    english: "Good morning",
    pronunciation: "TEH-reh HOHM-mee-koost",
    Icon: MorningIcon,
    sentenceEstonian: "Tere hommikust! Head hommikut.",
    sentenceEnglish: "Good morning! Have a good morning.",
    multipleChoiceOptions: ["Tere hommikust", "Tere õhtust", "Head aega", "Tere"],
    wordBlocks: ["Tere", "hommikust", "!", "Head", "hommikut", "."],
  },
  {
    id: "night",
    estonian: "Tere õhtust",
    english: "Good evening",
    pronunciation: "TEH-reh OHKH-toost",
    Icon: NightIcon,
    sentenceEstonian: "Tere õhtust! Ilus õhtu.",
    sentenceEnglish: "Good evening! Beautiful evening.",
    multipleChoiceOptions: ["Tere õhtust", "Tere hommikust", "Head aega", "Tänan"],
    wordBlocks: ["Tere", "õhtust", "!", "Ilus", "õhtu", "."],
  },
  {
    id: "howAreYou",
    estonian: "Kuidas läheb?",
    english: "How are you?",
    pronunciation: "KOO-ee-dahs LAE-hehb",
    Icon: HowAreYouIcon,
    sentenceEstonian: "Tere! Kuidas läheb?",
    sentenceEnglish: "Hello! How are you?",
    multipleChoiceOptions: ["Kuidas läheb?", "Mul läheb hästi", "Tänan", "Palun"],
    wordBlocks: ["Kuidas", "läheb", "?"],
  },
  {
    id: "iAmGood",
    estonian: "Mul läheb hästi",
    english: "I am good",
    pronunciation: "mool LAE-hehb HAESH-tee",
    Icon: IAmGoodIcon,
    sentenceEstonian: "Kuidas läheb? Mul läheb hästi.",
    sentenceEnglish: "How are you? I am good.",
    multipleChoiceOptions: ["Mul läheb hästi", "Kuidas läheb?", "Tänan", "Ei"],
    wordBlocks: ["Kuidas", "läheb", "?", "Mul", "läheb", "hästi", "."],
  },
  {
    id: "thankYou",
    estonian: "Tänan",
    english: "Thank you",
    pronunciation: "TAE-nahn",
    Icon: ThankYouIcon,
    sentenceEstonian: "Tänan! Palun.",
    sentenceEnglish: "Thank you! You're welcome.",
    multipleChoiceOptions: ["Tänan", "Palun", "Jah", "Ei"],
    wordBlocks: ["Tänan", "!", "Palun", "."],
  },
  {
    id: "please",
    estonian: "Palun",
    english: "Please / You're welcome",
    pronunciation: "PAH-loon",
    Icon: PleaseIcon,
    sentenceEstonian: "Palun, aitäh!",
    sentenceEnglish: "Please, thank you!",
    multipleChoiceOptions: ["Palun", "Tänan", "Jah", "Head aega"],
    wordBlocks: ["Palun", ",", "aitäh", "!"],
  },
  {
    id: "goodbye",
    estonian: "Head aega",
    english: "Goodbye",
    pronunciation: "HEH-ahd AH-eh-gah",
    Icon: GoodbyeIcon,
    sentenceEstonian: "Head aega! Nägemist.",
    sentenceEnglish: "Goodbye! See you.",
    multipleChoiceOptions: ["Head aega", "Tere", "Tere hommikust", "Palun"],
    wordBlocks: ["Head", "aega", "!"],
  },
  {
    id: "niceToMeetYou",
    estonian: "Meeldiv tutvuda",
    english: "Nice to meet you",
    pronunciation: "MAYL-deev TOOT-voo-dah",
    Icon: NiceToMeetYouIcon,
    sentenceEstonian: "Tere! Meeldiv tutvuda.",
    sentenceEnglish: "Hello! Nice to meet you.",
    multipleChoiceOptions: ["Meeldiv tutvuda", "Head aega", "Tänan", "Palun"],
    wordBlocks: ["Meeldiv", "tutvuda", "."],
  },
];

/** Per phrase: flashcard → MC → word order → type (fixed order for every phrase). */
const QUESTION_PROGRESSION: QuestionType[] = [
  "multiple_choice",
  "word_blocks",
  "type",
];

interface SneakPeekLessonV3Props {
  onComplete: () => void;
  onBack?: () => void;
}

type StepType = "flashcard" | "question";

interface LessonStep {
  phraseIndex: number;
  stepType: StepType;
  questionType?: QuestionType;
}

function buildLessonSteps(): LessonStep[] {
  const steps: LessonStep[] = [];
  for (let i = 0; i < LESSON_PHRASES.length; i++) {
    steps.push({ phraseIndex: i, stepType: "flashcard" });
    for (const questionType of QUESTION_PROGRESSION) {
      steps.push({
        phraseIndex: i,
        stepType: "question",
        questionType,
      });
    }
  }
  return steps;
}

const LESSON_STEPS = buildLessonSteps();

/** Lenient compare for typed answers: ignore case, collapse spaces, trim outer quotes, optional trailing ! ? . */
function normalizeTypedPhrase(s: string): string {
  let t = s.trim().toLowerCase().replace(/\s+/g, " ");
  t = t.replace(/^["'`\u201C\u201D\u201E]+/, "").replace(/["'`\u201C\u201D\u201E]+$/u, "");
  t = t.replace(/\s*[!?.…]+$/u, "").trim();
  return t;
}

/** Default: purple → blue → green. Accessible: navy → blue → amber (no red–green axis). */
function progressBarFillColor(
  progressPercent: number,
  colorBlindFriendly: boolean
): string {
  const t = Math.min(1, Math.max(0, progressPercent / 100));
  const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

  if (colorBlindFriendly) {
    const navy = { h: 222, s: 72, l: 30 };
    const blue = { h: 204, s: 85, l: 42 };
    const amber = { h: 38, s: 96, l: 48 };
    let h: number;
    let s: number;
    let l: number;
    if (t <= 0.5) {
      const u = t / 0.5;
      h = lerp(navy.h, blue.h, u);
      s = lerp(navy.s, blue.s, u);
      l = lerp(navy.l, blue.l, u);
    } else {
      const u = (t - 0.5) / 0.5;
      h = lerp(blue.h, amber.h, u);
      s = lerp(blue.s, amber.s, u);
      l = lerp(blue.l, amber.l, u);
    }
    return `hsl(${h} ${s}% ${l}%)`;
  }

  const purple = { h: 275, s: 58, l: 48 };
  const blue = { h: 210, s: 72, l: 46 };
  const green = { h: 138, s: 58, l: 40 };
  let h: number;
  let s: number;
  let l: number;
  if (t <= 0.5) {
    const u = t / 0.5;
    h = lerp(purple.h, blue.h, u);
    s = lerp(purple.s, blue.s, u);
    l = lerp(purple.l, blue.l, u);
  } else {
    const u = (t - 0.5) / 0.5;
    h = lerp(blue.h, green.h, u);
    s = lerp(blue.s, green.s, u);
    l = lerp(blue.l, green.l, u);
  }
  return `hsl(${h} ${s}% ${l}%)`;
}

/** Height follows content; caps at viewport so long steps scroll inside, not off-screen */
const LESSON_CARD_SHELL =
  "flex w-full max-h-[90vh] min-h-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-xl sm:p-5";
const LESSON_CARD_BODY =
  "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]";

function PronunciationGuide({
  phrase,
  speakText,
  className = "",
}: {
  phrase: LessonPhrase;
  /** Estonian text for TTS */
  speakText: string;
  className?: string;
}) {
  const speak = useSpeakEstonian();
  const { colorBlindFriendly: cb } = useColorBlindMode();
  const listenBtn = cb
    ? "inline-flex items-center gap-2 rounded-full border-2 border-[#0b4f8c] bg-blue-50 px-4 py-2 text-sm font-semibold text-[#0b4f8c] transition hover:bg-blue-100"
    : "inline-flex items-center gap-2 rounded-full border border-[#0072ce]/35 bg-[#0072ce]/8 px-4 py-2 text-sm font-semibold text-[#0072ce] transition hover:bg-[#0072ce]/15";

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <p className="text-center text-sm font-medium tracking-wide text-black/70">
        {phrase.pronunciation}
      </p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          speak(speakText);
        }}
        className={listenBtn}
      >
        <span aria-hidden className="text-xs">
          ▶
        </span>
        Listen
      </button>
    </div>
  );
}

function FlippableFlashcard({
  phrase,
  onFlip,
}: {
  phrase: LessonPhrase;
  onFlip: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = phrase.Icon;
  const speak = useSpeakEstonian();
  const { colorBlindFriendly: cb } = useColorBlindMode();
  const backFace = cb
    ? "absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-2xl border-2 border-black/15 bg-blue-50 p-4 shadow-xl backface-hidden transform-[rotateY(180deg)] sm:p-5"
    : "absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-2xl border border-black/10 bg-[#0072ce]/5 p-4 shadow-xl backface-hidden transform-[rotateY(180deg)] sm:p-5";
  const listenOutline = cb
    ? "inline-flex items-center gap-2 rounded-full border-2 border-[#0b4f8c] bg-white px-4 py-2 text-sm font-semibold text-[#0b4f8c] transition hover:bg-blue-50"
    : "inline-flex items-center gap-2 rounded-full border border-[#0072ce]/35 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0072ce] transition hover:bg-white";
  const continueBtn = cb
    ? "mt-4 w-full min-h-[48px] rounded-xl bg-[#0b4f8c] px-8 py-3 font-semibold text-white transition hover:bg-[#083a68] active:scale-[0.98]"
    : "mt-4 w-full min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] active:scale-[0.98]";

  const handleClick = () => {
    setIsFlipped((f) => !f);
  };

  return (
    <div className="w-full perspective-[1000px]">
      <div
        className={`relative h-[400px] cursor-pointer transform-3d transition-transform duration-500 sm:h-[420px] ${
          isFlipped ? "transform-[rotateY(180deg)]" : ""
        }`}
        onClick={handleClick}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-2xl border border-black/10 bg-white p-4 shadow-xl backface-hidden sm:p-5">
          <div>
            <Icon size={220} />
          </div>
          <p className="mt-2 text-2xl font-bold text-black sm:text-3xl">{phrase.estonian}</p>
          <div
            className="mt-3 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <PronunciationGuide phrase={phrase} speakText={phrase.estonian} />
          </div>
          <p className="mt-4 text-sm text-black/50">Tap card to reveal</p>
        </div>

        <div className={backFace}>
          <p className="text-2xl font-bold text-black sm:text-3xl">{phrase.english}</p>
          <p className="mt-3 text-sm text-black/65">{phrase.pronunciation}</p>
          <div
            className="mt-4"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => speak(phrase.estonian)}
              className={listenOutline}
            >
              <span aria-hidden className="text-xs">
                ▶
              </span>
              Listen
            </button>
          </div>
          <p className="mt-4 text-sm text-black/50">Tap card to flip back</p>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onFlip();
        }}
        className={continueBtn}
      >
        Continue
      </button>
    </div>
  );
}

function MultipleChoiceQuestion({
  phrase,
  onCorrect,
}: {
  phrase: LessonPhrase;
  onCorrect: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [options] = useState(() =>
    [...phrase.multipleChoiceOptions].sort(() => Math.random() - 0.5)
  );
  const { colorBlindFriendly: cb } = useColorBlindMode();

  const handleSelect = (opt: string) => {
    if (isCorrect === true) return;
    setSelected(opt);
    const correct = opt === phrase.estonian;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 600);
    }
  };

  return (
    <div>
      <PronunciationGuide phrase={phrase} speakText={phrase.estonian} className="mb-4" />
      <p className="mb-4 text-center text-lg text-black/70">
        What does &quot;{phrase.english}&quot; mean in Estonian?
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
        {options.map((opt) => {
          const chosen = selected === opt;
          const correct = opt === phrase.estonian;
          let bg = "bg-white border-black/20 hover:bg-black/5";
          if (chosen) {
            if (cb) {
              bg = correct
                ? "border-[3px] border-[#0b4f8c] bg-blue-100"
                : "border-[3px] border-amber-700 bg-amber-100";
            } else {
              bg = correct
                ? "bg-green-500/20 border-green-500"
                : "bg-red-500/20 border-red-500";
            }
          }
          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              disabled={isCorrect === true}
              className={`flex min-h-[5.5rem] w-full items-center justify-center rounded-xl border-2 px-3 py-3 text-center text-base font-medium leading-snug transition sm:min-h-[6.25rem] ${bg}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {isCorrect === false && (
        <p
          className={
            cb
              ? "mt-4 text-center text-sm font-medium text-amber-950"
              : "mt-4 text-center text-sm text-red-600"
          }
        >
          Try again! The correct answer is &quot;{phrase.estonian}&quot;
        </p>
      )}
    </div>
  );
}

function TypeQuestion({
  phrase,
  onCorrect,
}: {
  phrase: LessonPhrase;
  onCorrect: () => void;
}) {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { colorBlindFriendly: cb } = useColorBlindMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCorrect === true) return;
    const correct =
      normalizeTypedPhrase(input) === normalizeTypedPhrase(phrase.estonian);
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 600);
    }
  };

  return (
    <div>
      <PronunciationGuide phrase={phrase} speakText={phrase.estonian} className="mb-4" />
      <p className="mb-4 text-center text-lg text-black/70">
        Type the Estonian for &quot;{phrase.english}&quot;:
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isCorrect === true}
          placeholder="Type your answer..."
          className={`min-h-[56px] rounded-xl border-2 px-4 py-3 text-center text-lg ${
            isCorrect === true
              ? cb
                ? "border-[#0b4f8c] bg-blue-50"
                : "border-green-500 bg-green-500/10"
              : isCorrect === false
                ? cb
                  ? "border-amber-700 bg-amber-50"
                  : "border-red-500 bg-red-500/10"
                : "border-black/20"
          }`}
          autoFocus
        />
        <button
          type="submit"
          disabled={!input.trim() || isCorrect === true}
          className={
            cb
              ? "min-h-[48px] rounded-xl bg-[#0b4f8c] px-8 py-3 font-semibold text-white transition hover:bg-[#083a68] disabled:opacity-50"
              : "min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] disabled:opacity-50"
          }
        >
          Check
        </button>
      </form>
      {isCorrect === false && (
        <p
          className={
            cb
              ? "mt-4 text-center text-sm font-medium text-amber-950"
              : "mt-4 text-center text-sm text-red-600"
          }
        >
          The correct answer is{" "}
          <span className="font-semibold text-black">{phrase.estonian}</span>
        </p>
      )}
    </div>
  );
}

function WordBlocksQuestion({
  phrase,
  onCorrect,
}: {
  phrase: LessonPhrase;
  onCorrect: () => void;
}) {
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [remainingBlocks, setRemainingBlocks] = useState<string[]>(() =>
    [...phrase.wordBlocks].sort(() => Math.random() - 0.5)
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { colorBlindFriendly: cb } = useColorBlindMode();

  const targetOrder = phrase.wordBlocks;
  const userAnswer = selectedBlocks.join(" ").replace(/\s+/g, " ").trim();
  const correctAnswer = targetOrder.join(" ").replace(/\s+/g, " ").trim();

  const addBlock = (block: string, index: number) => {
    if (isCorrect === true) return;
    setSelectedBlocks((prev) => [...prev, block]);
    setRemainingBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const removeBlock = (index: number) => {
    if (isCorrect === true) return;
    const block = selectedBlocks[index];
    setSelectedBlocks((prev) => prev.filter((_, i) => i !== index));
    setRemainingBlocks((prev) => [...prev, block].sort(() => Math.random() - 0.5));
  };

  const handleCheck = () => {
    if (isCorrect === true) return;
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 600);
    }
  };

  return (
    <div>
      <PronunciationGuide phrase={phrase} speakText={phrase.estonian} className="mb-4" />
      <p className="mb-4 text-center text-lg text-black/70">
        Arrange the words to translate: &quot;{phrase.sentenceEnglish}&quot;
      </p>
      <div className="mb-4 min-h-[56px] rounded-xl border-2 border-dashed border-black/20 bg-black/5 p-3">
        <div className="flex flex-wrap gap-2">
          {selectedBlocks.map((block, i) => (
            <button
              key={`${block}-${i}`}
              type="button"
              onClick={() => removeBlock(i)}
              disabled={isCorrect === true}
              className="rounded-lg bg-white px-4 py-2 text-base font-medium shadow-sm transition hover:bg-black/5 disabled:opacity-70"
            >
              {block}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {remainingBlocks.map((block, i) => (
          <button
            key={`${block}-${i}`}
            type="button"
            onClick={() => addBlock(block, i)}
            disabled={isCorrect === true}
            className="rounded-lg border-2 border-black/20 bg-white px-4 py-2 text-base font-medium transition hover:bg-black/5 disabled:opacity-70"
          >
            {block}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleCheck}
        disabled={selectedBlocks.length === 0 || isCorrect === true}
        className={
          cb
            ? "w-full min-h-[48px] rounded-xl bg-[#0b4f8c] px-8 py-3 font-semibold text-white transition hover:bg-[#083a68] disabled:opacity-50"
            : "w-full min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] disabled:opacity-50"
        }
      >
        Check
      </button>
      {isCorrect === false && (
        <p
          className={
            cb
              ? "mt-4 text-center text-sm font-medium text-amber-950"
              : "mt-4 text-center text-sm text-red-600"
          }
        >
          Correct order: &quot;{correctAnswer}&quot;
        </p>
      )}
    </div>
  );
}

export default function SneakPeekLessonV3({ onComplete, onBack }: SneakPeekLessonV3Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { colorBlindFriendly: cb } = useColorBlindMode();

  const step = LESSON_STEPS[currentStepIndex];
  const phrase = LESSON_PHRASES[step.phraseIndex];
  const isLast = currentStepIndex === LESSON_STEPS.length - 1;
  const progress = ((currentStepIndex + 1) / LESSON_STEPS.length) * 100;

  const handleNext = () => {
    if (isLast) {
      setIsComplete(true);
      onComplete();
    } else {
      setCurrentStepIndex((i) => i + 1);
    }
  };

  if (isComplete) {
    return null;
  }

  const Icon = phrase.Icon;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden bg-white">
      <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur-sm sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg px-3 py-2 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-black"
              aria-label="Back to home"
            >
              ← Back
            </button>
          )}
          <div
            className={
              cb
                ? "h-6 w-6 shrink-0 rounded-md bg-[#0b4f8c]"
                : "h-6 w-6 shrink-0 rounded-md bg-[#0072ce]"
            }
          />
          <span className="truncate font-bold text-black">SpeakEstonian</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-sm text-black/50 sm:inline">Free lesson</span>
          <LessonDisplayMenu />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl min-h-0 flex-1 flex-col px-5 py-4 sm:px-6 sm:py-5">
        <div className="mb-4 h-4 w-full shrink-0 overflow-hidden rounded-full bg-black/10 shadow-inner sm:mb-5 sm:h-[18px]">
          <div
            className="h-full rounded-full shadow-sm transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: progressBarFillColor(progress, cb),
            }}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-0 pb-4 pt-1 sm:pb-6 sm:pt-2">
          {step.stepType === "flashcard" ? (
            <div className={LESSON_CARD_SHELL}>
              <div className={`${LESSON_CARD_BODY} justify-center`}>
                <FlippableFlashcard phrase={phrase} onFlip={handleNext} />
              </div>
            </div>
          ) : (
            <div className={LESSON_CARD_SHELL}>
              <div className={LESSON_CARD_BODY}>
                {step.stepType === "question" && step.questionType === "multiple_choice" && (
                  <>
                    <div className="flex shrink-0 justify-center">
                      <Icon size={240} />
                    </div>
                    <MultipleChoiceQuestion phrase={phrase} onCorrect={handleNext} />
                  </>
                )}

                {step.stepType === "question" && step.questionType === "type" && (
                  <>
                    <div className="flex shrink-0 justify-center">
                      <Icon size={240} />
                    </div>
                    <TypeQuestion phrase={phrase} onCorrect={handleNext} />
                  </>
                )}

                {step.stepType === "question" && step.questionType === "word_blocks" && (
                  <>
                    <div className="flex shrink-0 justify-center">
                      <Icon size={240} />
                    </div>
                    <WordBlocksQuestion phrase={phrase} onCorrect={handleNext} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
