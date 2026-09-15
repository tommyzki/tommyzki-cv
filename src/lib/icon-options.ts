// Allowed `iconName` values per section, mirroring each component's hardcoded
// lucide-react `iconMap`. Used both by admin Server Actions (validation) and
// by admin form <Select> options. Keep in sync with:
//   - src/components/sections/contact-section.tsx (iconMap)
//   - src/components/sections/education-section.tsx (iconMap)
//   - src/components/sections/experience-section.tsx (iconMap)
//   - src/components/sections/skills-section.tsx (iconMap)

export const CONTACT_ICON_NAMES = [
  'Mail',
  'Phone',
  'Linkedin',
  'Github',
  'Instagram',
  'Facebook',
  'Twitter',
  'Users',
  'MapPin',
] as const;

export const EDUCATION_ICON_NAMES = ['GraduationCap', 'Languages'] as const;

export const EXPERIENCE_ICON_NAMES = ['Briefcase', 'Smartphone', 'GraduationCap'] as const;

export const SKILL_ICON_NAMES = [
  'CodeXml',
  'Braces',
  'Palette',
  'Cog',
  'Terminal',
  'Database',
  'GitFork',
  'Users2',
  'Languages',
  'Globe2',
] as const;

export const SKILL_CATEGORY_ICON_NAMES = SKILL_ICON_NAMES;

export type ContactIconName = (typeof CONTACT_ICON_NAMES)[number];
export type EducationIconName = (typeof EDUCATION_ICON_NAMES)[number];
export type ExperienceIconName = (typeof EXPERIENCE_ICON_NAMES)[number];
export type SkillIconName = (typeof SKILL_ICON_NAMES)[number];
