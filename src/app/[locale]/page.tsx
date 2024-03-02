"use client"

import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  const t = useTranslations('IndexPage');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>{t('SignOutButton')}</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>{t('SignInbutton')}</Button>
        </SignInButton>
      </SignedOut>

      <LocaleSwitcher />

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}

      <Button onClick={() =>
        createFile({ name: "Hello World", })}>{t('ClickMeButton')}</Button>
    </main>
  );
}
