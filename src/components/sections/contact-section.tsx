
'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Users } from 'lucide-react';
import Link from 'next/link';
import contactData from '@/json/contact-data.json';

const iconMap: Record<string, React.ElementType> = {
  Mail,
  Phone,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Twitter,
  Users, // For TikTok placeholder
  MapPin,
};

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold">Get In Touch</CardTitle>
            <CardDescription className="text-base md:text-lg">
              Feel free to reach out through any of the channels below!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Formal Contact Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 border-b-2 border-primary pb-2">Formal Contact</h3>
                  <p className="text-muted-foreground mt-1">
                    For professional inquiries or collaborations.
                  </p>
                </div>
                <div className="space-y-4">
                  {contactData.formalContacts.map((contact) => {
                    const IconComponent = contact.iconName ? iconMap[contact.iconName] : Mail;
                    return (
                      <Link
                        key={contact.label}
                        href={contact.href}
                        target={contact.target || '_self'}
                        rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
                        aria-label={contact.ariaLabel}
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                      >
                        <IconComponent className="h-5 w-5 text-primary group-hover:animate-ping" />
                        <span>{contact.label}</span>
                      </Link>
                    );
                  })}
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Tangerang, Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 border-b-2 border-primary pb-2">Social Media</h3>
                   <p className="text-muted-foreground mt-1">
                    Connect with me on social platforms. (Update placeholder links!)
                  </p>
                </div>
                <div className="space-y-4">
                  {contactData.socialMediaLinks.map((social) => {
                    const IconComponent = social.iconName ? iconMap[social.iconName] : Users; // Default
                    return (
                      <Link
                        key={social.label}
                        href={social.href}
                        target={social.target || '_self'}
                        rel={social.target === '_blank' ? 'noopener noreferrer' : undefined}
                        aria-label={social.ariaLabel}
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                      >
                        <IconComponent className="h-5 w-5 text-primary group-hover:animate-ping" />
                        <span>{social.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
