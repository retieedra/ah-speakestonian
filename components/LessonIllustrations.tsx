"use client";

import Image from "next/image";

interface IconProps {
  className?: string;
  size?: number;
}

const LessonImage = ({
  src,
  alt,
  className = "",
  size = 80,
}: IconProps & { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={className}
    style={{ width: size, height: size, objectFit: "contain" }}
  />
);

export function HelloIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/hello.jpg" alt="Hello" className={className} size={size} />;
}

export function MorningIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/good-morning.jpg" alt="Good morning" className={className} size={size} />;
}

export function NightIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/good-night.jpg" alt="Good evening" className={className} size={size} />;
}

export function HowAreYouIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/how-are-you.png" alt="How are you?" className={className} size={size} />;
}

export function IAmGoodIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/i-am-good.jpg" alt="I am good" className={className} size={size} />;
}

export function ThankYouIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/thank-you.jpg" alt="Thank you" className={className} size={size} />;
}

export function PleaseIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/please.png" alt="Please" className={className} size={size} />;
}

export function GoodbyeIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/goodbye.png" alt="Goodbye" className={className} size={size} />;
}

export function NiceToMeetYouIcon({ className = "", size = 80 }: IconProps) {
  return <LessonImage src="/nice-to-meet-you.png" alt="Nice to meet you" className={className} size={size} />;
}

const BLUE = "#0072CE";
const BLACK = "#000000";

export function YesIcon({ className = "", size = 80 }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke={BLACK}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="40" cy="40" r="18" fill={BLUE} opacity={0.2} />
      <circle cx="40" cy="40" r="18" />
      <path
        d="M26 40 L36 50 L54 32"
        strokeWidth="3"
        stroke={BLUE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 40 L36 50 L54 32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NoIcon({ className = "", size = 80 }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke={BLACK}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="40" cy="40" r="18" fill={BLUE} opacity={0.1} />
      <circle cx="40" cy="40" r="18" />
      <path d="M28 28 L52 52 M52 28 L28 52" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export const LESSON_ICONS: Record<
  string,
  React.ComponentType<IconProps>
> = {
  hello: HelloIcon,
  morning: MorningIcon,
  night: NightIcon,
  howAreYou: HowAreYouIcon,
  iAmGood: IAmGoodIcon,
  thankYou: ThankYouIcon,
  please: PleaseIcon,
  goodbye: GoodbyeIcon,
  yes: YesIcon,
  no: NoIcon,
  niceToMeetYou: NiceToMeetYouIcon,
};
