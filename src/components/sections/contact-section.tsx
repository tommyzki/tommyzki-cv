
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

export default function ContactSection() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert('Message sent! (This is a placeholder)');
    (event.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold">Get In Touch</CardTitle>
            <CardDescription className="text-base md:text-lg">
              Have a project in mind or just want to say hi? Feel free to reach out!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input type="text" id="name" name="name" placeholder="Your Name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input type="email" id="email" name="email" placeholder="your@email.com" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message..." required rows={5} className="mt-1" />
                </div>
                <Button type="submit" className="w-full md:w-auto bg-primary text-primary-foreground border-primary-foreground shadow-[2px_2px_0px_hsl(var(--primary-foreground))] hover:shadow-[3px_3px_0px_hsl(var(--primary-foreground))] active:shadow-[1px_1px_0px_hsl(var(--primary-foreground))]">
                  Send Message
                </Button>
              </form>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Contact Information</h3>
                  <p className="text-muted-foreground">
                    You can also reach me directly through the following channels:
                  </p>
                </div>
                <div className="space-y-3">
                  <Link href="mailto:tommy.miyazaki@example.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
                    <Mail className="h-5 w-5 text-primary group-hover:animate-ping" />
                    <span>tommy.miyazaki@example.com</span>
                  </Link>
                  <Link href="tel:+1234567890" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
                    <Phone className="h-5 w-5 text-primary group-hover:animate-ping" />
                    <span>+1 (234) 567-890</span>
                  </Link>
                  <Link href="https://linkedin.com/in/tommymiyazaki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
                    <Linkedin className="h-5 w-5 text-primary group-hover:animate-ping" />
                    <span>linkedin.com/in/tommymiyazaki</span>
                  </Link>
                  <Link href="https://github.com/tommymiyazaki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
                    <Github className="h-5 w-5 text-primary group-hover:animate-ping" />
                    <span>github.com/tommymiyazaki</span>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
