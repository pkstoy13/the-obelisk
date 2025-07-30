"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
//import Obelisk from "@/public/Obelisk.png";
//import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

const GENRES = ["indie Rock", "hip-hop", "r&B", "house", "jungle", "ambient"];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedGenres.length === 0) {
      toast("Please enter your email and select at least one genre.");
      return;
    }

    setSubmitted(true); // Show "Thank you" immediately

    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        genres: selectedGenres,
        message,
      }),
    }).catch(() => {
      // You can show a toast or fallback message if you want
      toast("Something went wrong sending the form.");
    });
  };

  if (submitted) {
    const shareUrl = "https://auxupnext.com"; // Replace with your actual site

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
        } catch (err) {
          console.error("Share cancelled or failed", err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast("Link Copied!");
        } catch (err) {
          console.error(err);
          toast("Copy failed — please try manually.");
        }
      }
    };

    return (
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='text-center space-y-4'>
          <h2 className='text-3xl font-bold'>thanks for signing up</h2>
          <p className='text-muted-foreground'>expect some songs soon</p>

          {/* Buttons: Back & Share */}
          <div className='flex justify-center gap-4 pt-4'>
            <Button
              variant='outline'
              size='icon'
              className='cursor-pointer'
              onClick={() => window.location.reload()}
            >
              <span className='sr-only'>Back</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </Button>

            <Button
              variant='default'
              size='icon'
              className='cursor-pointer'
              onClick={handleShare}
            >
              <span className='sr-only'>Share</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4v16m0-16l-6 6m6-6l6 6M4 20h16'
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-between bg-black overflow-hidden px-4'>
      {/* Background obelisk */}
      <Image
        src='/Obelisk.png'
        alt='Obelisk'
        width={500}
        height={500}
        className='absolute inset-0 w-full h-full object-contain opacity-10 blur-sm scale-125 animate-flicker pointer-events-none'
      ></Image>

      <div className='flex-grow flex items-center justify-center w-full z-10'>
        <div className='w-full max-w-md'>
          <Card className='bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl'>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <p className='mr-36 italic'>AUX&apos;s</p>
              <h2 className='text-2xl font-bold mb-2'>the obelisk</h2>
              <p className='mb-2 text-muted-foreground'>
                pick your favorite genres and i&apos;ll send you some
                underground songs weekly
              </p>

              <form
                onSubmit={handleSubmit}
                className='space-y-4 w-full max-w-sm'
              >
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

                <div>
                  <Label>Genres</Label>

                  {/* "Any" option centered on its own row */}
                  <div className='flex justify-center mt-2 mb-4'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='Any'
                        checked={selectedGenres.includes("Any")}
                        onCheckedChange={() => {
                          setSelectedGenres((prev) =>
                            prev.includes("Any") ? [] : ["Any"]
                          );
                        }}
                      />
                      <Label htmlFor='Any' className='text-sm'>
                        any
                      </Label>
                    </div>
                  </div>

                  {/* All other genres in 2-column grid */}
                  <div className='grid grid-cols-2 gap-2 gap-x-44'>
                    {GENRES.filter((g) => g !== "Any").map((genre) => (
                      <div key={genre} className='flex items-center space-x-2'>
                        <Checkbox
                          id={genre}
                          checked={selectedGenres.includes(genre)}
                          disabled={selectedGenres.includes("Any")}
                          onCheckedChange={() => {
                            setSelectedGenres((prev) =>
                              prev.includes(genre)
                                ? prev.filter((g) => g !== genre)
                                : [...prev, genre]
                            );
                          }}
                        />
                        <Label htmlFor={genre} className='text-sm'>
                          {genre}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    className='h-24 flex items-start mt-2'
                    placeholder='optional'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {/*<Label htmlFor={message} className='text-sm'>
                {message}
              </Label>*/}
                </div>

                <Button type='submit' className='w-full cursor-pointer'>
                  enter...
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className='z-10 mb-4 text-white text-sm flex gap-4 items-center justify-center w-full'>
        <a
          href='https://instagram.com/auxupnext'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Instagram
        </a>
        <a
          href='https://tiktok.com/@auxupnext'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          TikTok
        </a>
        <a
          href='https://mail.google.com/mail/?view=cm&to=contact@auxupnext.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Contact
        </a>
      </footer>
    </div>
  );
}
