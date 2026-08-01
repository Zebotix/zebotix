/**
 * JSON-LD Schema Generators for SEO
 * Sanitizes dangerous characters and provides typed schema generation
 */
import {
  COMPANY_NAME,
  SITE_URL,
  SHORT_DESC,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SOCIAL_LINKS,
} from "./constants";

/**
 * Sanitizes JSON-LD content to prevent XSS attacks
 */
function sanitizeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replaceAll(/</g, "\\u003c").replaceAll(/>/g, "\\u003e");
}

/**
 * Organization schema - place on root layout or homepage
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/Zebotix.png`,
    description: SHORT_DESC,
    sameAs: [
      SOCIAL_LINKS.twitter,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.github,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      areaServed: "PK",
      availableLanguage: "en",
    },
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
  };
}

/**
 * Service schema - for service pages
 */
export function generateServiceSchema(
  name: string,
  description: string,
  price?: string,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    ...(image && { image }),
    ...(price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "PKR",
        price,
      },
    }),
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
  };
}

/**
 * BlogPosting schema - for blog pages
 */
export function generateBlogPostingSchema(
  title: string,
  description: string,
  image: string,
  datePublished: Date,
  dateModified?: Date,
  slug?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified || datePublished).toISOString(),
    author: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Zebotix.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": slug ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/blog`,
    },
  };
}

/**
 * Product/CreativeWork schema - for portfolio items
 */
export function generateCreativeWorkSchema(
  title: string,
  description: string,
  image: string,
  datePublished: Date,
  url?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    image,
    datePublished: datePublished.toISOString(),
    creator: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    ...(url && { url }),
  };
}

/**
 * BreadcrumbList schema - for nested routes
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQPage schema - for FAQ pages
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * WebSite schema with SearchAction - for homepage
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_NAME,
    url: SITE_URL,
  };
}

/**
 * ProfessionalService schema - for contact/location information and SEO context
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: COMPANY_NAME,
    image: `${SITE_URL}/Zebotix.png`,
    description: SHORT_DESC,
    url: SITE_URL,
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    priceRange: "$$",
    sameAs: [SOCIAL_LINKS.twitter, SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
    knowsAbout: [
      "IT Services",
      "Custom Software Development",
      "Artificial Intelligence",
      "Web Application Development",
      "Mobile App Development",
      "B2B Enterprise Solutions",
    ],
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressLocality: "Karachi",
    },
  };
}

/**
 * JobPosting schema - for career job postings
 */
export function generateJobPostingSchema(
  title: string,
  description: string,
  datePosted: Date,
  location?: string,
  employmentType?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted: datePosted.toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: COMPANY_NAME,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/Zebotix.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: location || "Karachi",
        addressCountry: "PK",
      },
    },
    employmentType: employmentType || "FULL_TIME",
  };
}

/**
 * Export sanitized schema for use in dangerouslySetInnerHTML
 */
export function getSanitizedSchema(schema: unknown): string {
  return sanitizeJsonLd(schema);
}
