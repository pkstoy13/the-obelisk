"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast } from "sonner";

const GENRES = [
  "hiphop",
  "rock",
  "pop",
  "r&B",
  "house",
  "jungle",
  "metal",
  "ambient",
  "experimental",
];

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || selectedGenres.length === 0) {
      toast("Please enter your name, email and select at least one genre.");
      return;
    }

    setSubmitted(true);

    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, genres: selectedGenres, message }),
    }).catch(() => toast("Something went wrong sending the form."));
  };

  if (submitted) {
    const shareUrl = "https://auxupnext.com";

    const handleShare = async () => {
      const shareData = {
        title: "AUX's The Obelisk",
        text: "Check out this underground music newsletter I'm into 🎧",
        url: shareUrl,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          toast("Thanks for sharing!");
        } catch {
          toast("Share cancelled or failed");
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast("Link Copied!");
        } catch {
          toast("Copy failed — please try manually.");
        }
      }
    };

    return (
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='text-center space-y-4'>
          <h2 className='text-3xl font-bold'>Thanks for signing up</h2>
          <p className='text-muted-foreground'>Expect some songs soon</p>

          <div className='flex justify-center gap-4 pt-4'>
            <Button
              variant='outline'
              size='icon'
              aria-label='Go back'
              onClick={() => window.location.reload()}
            >
              ←
            </Button>
            <Button
              variant='default'
              size='icon'
              aria-label='Share this newsletter'
              onClick={handleShare}
            >
              ↗
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-between bg-black overflow-hidden px-4'>
      <Image
        src='/Obelisk.png'
        alt='Obelisk'
        width={500}
        height={500}
        className='absolute inset-0 w-full h-full object-contain opacity-10 blur-sm scale-125 pointer-events-none'
      />

      <main className='flex-grow flex items-center justify-center w-full z-10 py-10'>
        <div className='w-full max-w-lg'>
          <Card className='bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl'>
            <CardContent className='p-6 flex flex-col items-center text-center space-y-4'>
              <p className='italic text-sm opacity-75'>AUX&apos;s</p>
              <h2 className='text-2xl font-bold'>the obelisk</h2>
              <p className='text-muted-foreground text-sm'>
                Pick your favorite genres and I&apos;ll send you underground
                songs weekly.
              </p>

              <form
                onSubmit={handleSubmit}
                className='space-y-4 w-full'
                aria-label='Newsletter signup form'
              >
                <div>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    placeholder='first & last'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='mt-2'
                  />
                </div>
                <div>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='mt-2'
                  />
                </div>

                <fieldset className='space-y-2'>
                  <legend className='text-sm font-medium'>Genres</legend>

                  <div className='flex justify-center'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='Any'
                        checked={selectedGenres.includes("Any")}
                        onCheckedChange={() =>
                          setSelectedGenres((prev) =>
                            prev.includes("Any") ? [] : ["Any"]
                          )
                        }
                      />
                      <Label htmlFor='Any' className='text-sm'>
                        Any
                      </Label>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                    {GENRES.filter((g) => g !== "Any").map((genre) => (
                      <div
                        key={genre}
                        className='flex items-center space-x-2'
                        title={`Subscribe to ${genre} music`}
                      >
                        <Checkbox
                          id={genre}
                          checked={selectedGenres.includes(genre)}
                          disabled={selectedGenres.includes("Any")}
                          onCheckedChange={() =>
                            setSelectedGenres((prev) =>
                              prev.includes(genre)
                                ? prev.filter((g) => g !== genre)
                                : [...prev, genre]
                            )
                          }
                        />
                        <Label htmlFor={genre} className='text-sm capitalize'>
                          {genre}
                        </Label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    className='h-24 mt-2'
                    placeholder='Optional'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button type='submit' className='w-full'>
                  Enter
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className='z-10 mb-4 text-white text-sm flex gap-4 items-center justify-center w-full'>
        <a
          href='https://instagram.com/auxupnext'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded'
        >
          Instagram
        </a>
        <a
          href='https://tiktok.com/@auxupnext'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded'
        >
          TikTok
        </a>
        <a
          href='mailto:contact@auxupnext.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded'
        >
          Contact
        </a>
      </footer>
    </div>
  );
}
