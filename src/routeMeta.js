/**
 * SEO metadata for every indexable route. Shared by the useSEO hook (client
 * navigation) and scripts/prerender-routes.mjs (static HTML, sitemap,
 * serve.json), so keep it plain JS with no JSX or browser-only imports.
 * /editor/:templateId and /verify/:certificateId are per-user and not listed.
 */

import { tools } from './data/toolsData.js'
import { blogPosts } from './data/blogPosts.js'

export const SITE = {
  name: 'DoAide Certificate',
  baseUrl: 'https://certificate.doaide.com',
  ogImage: 'https://certificate.doaide.com/og-certificate.png',
}

const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

// Home-page structured data (moved here from index.html, where it was
// stamped on every URL).
const HOME_GRAPH = [
  {
    "@type": "WebApplication",
    "name": "DoAide Certificate",
    "url": "https://certificate.doaide.com",
    "description": "Create beautiful certificates, awards, experience letters, and diplomas for free. No login required. AI-powered experience letter generator. 15+ templates. Bulk generation. Download as PDF or PNG.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "author": {
      "@type": "Organization",
      "name": "DoAide",
      "url": "https://doaide.com"
    },
    "featureList": [
      "15+ certificate templates",
      "Certificate of Appreciation generator",
      "Course Completion Certificate maker",
      "Award Certificate generator",
      "AI-powered Experience Letter generator",
      "Bulk certificate generation from CSV",
      "QR code verification",
      "PDF and PNG export",
      "WhatsApp and LinkedIn sharing"
    ]
  },
  {
    "@type": "HowTo",
    "name": "How to Create a Certificate Online",
    "description": "Create professional certificates for free in 3 simple steps using DoAide Certificate.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose a Template",
        "text": "Browse 15+ professionally designed certificate templates and pick one that fits your needs."
      },
      {
        "@type": "HowToStep",
        "name": "Customize",
        "text": "Add recipient name, organization, dates, logo, and signature. Change colors and text to match your brand."
      },
      {
        "@type": "HowToStep",
        "name": "Download & Share",
        "text": "Export as high-resolution PNG or print-ready PDF. Share on WhatsApp, LinkedIn, or embed on your website."
      }
    ]
  },
  {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is DoAide Certificate really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, DoAide Certificate is completely free. No login required, no watermarks, and unlimited downloads. Create certificates, awards, and experience letters at no cost."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No account or login is needed. Simply visit the tool, customize your certificate, and download it instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create bulk certificates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Upload a CSV file with recipient names and generate hundreds of personalized certificates at once, downloaded as a ZIP file."
        }
      },
      {
        "@type": "Question",
        "name": "What is the AI Experience Letter Generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI-powered tool generates professional experience letters (employment certificates) instantly. Enter employee details and the AI creates a polished, ready-to-use letter you can download as PDF."
        }
      }
    ]
  }
]

const EXPERIENCE_LETTER_FAQS = [
  {
    q: 'What is an experience letter?',
    a: 'An experience letter is a formal document issued by an employer confirming an employee\'s tenure, designation, and responsibilities during their employment period.',
  },
  {
    q: 'How does the AI experience letter generator work?',
    a: 'Enter the employee details (name, designation, company, dates, responsibilities) and our AI generates a professionally worded experience letter that you can download as PDF or copy.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. All processing happens in your browser. We do not store any of the information you enter. The AI generates the letter on-the-fly and nothing is saved on our servers.',
  },
]

// Fit "<title> | <suffix>" into ~70 chars; long titles go without the suffix.
const withSuffix = (title, suffix) => (`${title} | ${suffix}`.length <= 70 ? `${title} | ${suffix}` : title)

const faqLd = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    // tools use { q, a }, blog posts use { question, answer }
    name: f.q ?? f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.a ?? f.answer },
  })),
})

export const routes = [
  {
    path: '/',
    kind: 'home',
    h1: 'Create Beautiful Certificates — Free, No Login',
    title: 'DoAide Certificate — Free Certificate, Award & Experience Letter Maker',
    description:
      'Create certificates of appreciation, course completion and award certificates, plus AI experience letters. Free, no login, download PDF or PNG.',
  },
  ...tools.map((t) => ({
    path: `/tools/${t.slug}`,
    kind: 'tool',
    h1: t.title,
    title: withSuffix(t.title, 'DoAide Certificate'),
    description: t.description,
    faqs: t.faqs,
  })),
  {
    path: '/tools/experience-letter-generator',
    kind: 'tool',
    h1: 'Free Experience Letter Generator',
    title: 'Free Experience Letter Generator (AI-Powered) | DoAide Certificate',
    description:
      'Generate professional experience letters instantly with AI. Enter employee details and get a ready-to-use experience certificate. Free, no login required.',
    faqs: EXPERIENCE_LETTER_FAQS,
  },
  {
    path: '/blog',
    kind: 'blog',
    h1: 'Blog',
    title: 'Blog — Certificate Design Tips & Guides | DoAide Certificate',
    description:
      'Tips, guides, and best practices for creating professional certificates, awards, and experience letters. Free templates and tools.',
  },
  ...blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    kind: 'post',
    h1: p.title,
    title: withSuffix(p.title, 'DoAide Certificate Blog'),
    description: p.description,
    published: p.date,
    keywords: p.keywords,
    faqs: p.faqs,
  })),
]

export const canonicalFor = (path) => `${SITE.baseUrl}${path}`

export const metaForPath = (path) => routes.find((r) => r.path === path)

export function jsonLdFor(route) {
  const url = canonicalFor(route.path)
  let main
  switch (route.kind) {
    case 'home':
      return { '@context': 'https://schema.org', '@graph': HOME_GRAPH }
    case 'tool':
      main = {
        '@type': 'WebApplication',
        name: route.h1,
        url,
        description: route.description,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        author: ORG,
      }
      break
    case 'post':
      main = {
        '@type': 'BlogPosting',
        headline: route.h1,
        description: route.description,
        url,
        mainEntityOfPage: url,
        datePublished: route.published,
        dateModified: route.published,
        keywords: route.keywords,
        author: ORG,
        publisher: ORG,
      }
      break
    default:
      main = { '@type': 'Blog', name: `${SITE.name} Blog`, url, description: route.description }
  }
  const graph = route.faqs?.length ? [main, faqLd(route.faqs)] : [main]
  return { '@context': 'https://schema.org', '@graph': graph }
}
