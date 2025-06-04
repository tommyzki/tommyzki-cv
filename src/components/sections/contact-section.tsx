
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Users } from 'lucide-react';
import Link from 'next/link';

const formalContacts = [
  {
    href: 'mailto:miyazaki.tommy@gmail.com',
    icon: <Mail className="h-5 w-5 text-primary group-hover:animate-ping" />,
    label: 'miyazaki.tommy@gmail.com',
    ariaLabel: 'Email Tommy Miyazaki',
  },
  {
    href: 'tel:+628111478820',
    icon: <Phone className="h-5 w-5 text-primary group-hover:animate-ping" />,
    label: '+62 811 147 8820',
    ariaLabel: 'Call Tommy Miyazaki',
  },
  {
    href: 'https://linkedin.com/in/tommyzki',
    icon: <Linkedin className="h-5 w-5 text-primary group-hover:animate-ping" />,
    label: 'linkedin.com/in/tommyzki',
    ariaLabel: "Tommy Miyazaki's LinkedIn Profile",
    target: '_blank',
  },
  {
    href: 'https://github.com/tommyzki',
    icon: <Github className="h-5 w-5 text-primary group-hover:animate-ping" />,
    label: 'github.com/tommyzki',
    ariaLabel: "Tommy Miyazaki's GitHub Profile",
    target: '_blank',
  },
];

const socialMediaLinks = [
  {
    href: 'https://instagram.com/yourusername', // Placeholder
    icon: <Instagram className="h-5 w-5 text-primary group-hover:animate-ping" />,
    label: 'Instagram',
    ariaLabel: "Tommy Miyazaki's Instagram Profile",
    target: '_blank',
  },
  {
    href: 'https://facebook.com/yourusername', // Placeholder
    icon: <Facebook className="h-5 w-5 text-primary group-hover:animate-ping" />,
    label: 'Facebook',
    ariaLabel: "Tommy Miyazaki's Facebook Profile",
    target: '_blank',
  },
  {
    href: 'https://twitter.com/yourusername', // Placeholder
    icon: <Twitter className="h-5 w-5 text-primary group-hover:animate-ping" />,
    label: 'X (Twitter)',
    ariaLabel: "Tommy Miyazaki's X (Twitter) Profile",
    target: '_blank',
  },
  {
    href: 'https://tiktok.com/@yourusername', // Placeholder
    icon: <Users className="h-5 w-5 text-primary group-hover:animate-ping" />, // Using Users as a generic social icon
    label: 'TikTok',
    ariaLabel: "Tommy Miyazaki's TikTok Profile",
    target: '_blank',
  },
];


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
                  {formalContacts.map((contact) => (
                    <Link
                      key={contact.label}
                      href={contact.href}
                      target={contact.target || '_self'}
                      rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
                      aria-label={contact.ariaLabel}
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                    >
                      {contact.icon}
                      <span>{contact.label}</span>
                    </Link>
                  ))}
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
                  {socialMediaLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target={social.target || '_self'}
                      rel={social.target === '_blank' ? 'noopener noreferrer' : undefined}
                      aria-label={social.ariaLabel}
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                    >
                      {social.icon}
                      <span>{social.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
