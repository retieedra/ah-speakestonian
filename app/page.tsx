"use client";

import { useState } from "react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import SignUpPrompt from "@/components/SignUpPrompt";
import SneakPeekLesson from "@/components/SneakPeekLesson";

export default function Home() {
  return (
    <>
      <Authenticated>
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur-sm sm:px-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-[#0072ce]" />
            <span className="text-xl font-bold text-black sm:text-2xl">SpeakEstonian</span>
          </div>
          <UserButton />
        </header>
        <main className="mx-auto flex max-w-4xl flex-col gap-8 overflow-x-hidden px-6 py-8 sm:px-8 md:px-12">
          <Content />
        </main>
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedFlow />
      </Unauthenticated>
    </>
  );
}

type UnauthenticatedView = "lesson" | "signup";

function UnauthenticatedFlow() {
  const [view, setView] = useState<UnauthenticatedView>("lesson");

  if (view === "signup") {
    return <SignUpPrompt onBack={() => setView("lesson")} />;
  }

  return (
    <SneakPeekLesson onComplete={() => setView("signup")} />
  );
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8">
      <p>Welcome {viewer ?? "Anonymous"}!</p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <button
          className="min-h-[44px] rounded-xl bg-estonian-blue px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:min-h-[48px]"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : (numbers?.join(", ") ?? "...")}
      </p>
      <p>
        Edit{" "}
        <code className="rounded-md bg-black/10 px-1 py-0.5 font-mono text-sm font-bold">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code className="rounded-md bg-black/10 px-1 py-0.5 font-mono text-sm font-bold">
          app/page.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        See the{" "}
        <Link href="/server" className="underline hover:no-underline">
          /server route
        </Link>{" "}
        for an example of loading data in a server component
      </p>
      <div className="flex flex-col">
        <p className="text-lg font-bold">Useful resources:</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks, and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 overflow-auto rounded-xl border-2 border-black/10 bg-white p-4 shadow-sm">
      <a href={href} className="text-sm font-medium text-estonian-blue underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs text-black/70">{description}</p>
    </div>
  );
}
