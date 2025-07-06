"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const GENRES = [
  "Indie Rock",
  "Hip-Hop",
  "Electronic",
  "Jazz",
  "Alternative",
  "R&B",
  "Metal",
  "Folk",
  "Experimental",
  "House",
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedGenres.length === 0) {
      alert("Please enter your email and select at least one genre.");
      return;
    }

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        genres: selectedGenres,
      }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className='max-w-md mx-auto mt-10 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Thanks for signing up!</h2>
        <p>
          We&apos;ll send you some underrated songs from your favorite genres
          soon.
        </p>
        <Button className='w-full'>Back</Button>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-10'>
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>Aux&apos;s the obelisk</h2>
          <p className='mb-4 text-muted-foreground'>
            Pick your favorite genres and get hidden gems sent to your inbox.
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Genres</Label>
              <div className='grid grid-cols-2 gap-2 mt-2'>
                {GENRES.map((genre) => (
                  <div key={genre} className='flex items-center space-x-2'>
                    <Checkbox
                      id={genre}
                      checked={selectedGenres.includes(genre)}
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
            </div>

            <Button type='submit' className='w-full'>
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
