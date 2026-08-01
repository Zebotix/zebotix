export interface SeoService {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  content: string;
}

export const SEO_SERVICES: SeoService[] = [
  {
    slug: "web-application-development",
    keyword: "Web Application Development",
    title: "Web Application Development Services | Zebotix",
    description:
      "Looking for top-tier web application development services? Zebotix builds scalable, high-performance web apps tailored for enterprise growth.",
    heroHeadline: "Custom Web Application Development",
    heroSubheadline:
      "We engineer scalable, secure, and high-performance web applications that power modern businesses and drive revenue.",
    content:
      "Our web application development services are designed for businesses that need more than just a website. We build complex, data-heavy, and highly interactive web platforms using cutting-edge technologies like Next.js, React, and Node.js. Whether you need a customer portal, an internal dashboard, or a full-scale SaaS product, our expert engineering team delivers robust solutions that scale with your users.",
  },
  {
    slug: "mobile-app-development",
    keyword: "Mobile App Development",
    title: "Mobile App Development Company | Zebotix",
    description:
      "Zebotix is a leading mobile app development company. We build native and cross-platform apps for iOS and Android that users love.",
    heroHeadline: "Award-Winning Mobile App Development",
    heroSubheadline:
      "Transform your ideas into stunning, high-performance mobile applications for iOS and Android platforms.",
    content:
      "In a mobile-first world, your app needs to be fast, intuitive, and engaging. We specialize in cross-platform and native mobile app development using frameworks like React Native and Expo. From consumer-facing applications to enterprise mobility solutions, we handle the entire lifecycle—from UI/UX design and architecture to App Store deployment and post-launch maintenance.",
  },
  {
    slug: "enterprise-ai-solutions",
    keyword: "Enterprise AI Solutions",
    title: "Enterprise AI Solutions & Machine Learning | Zebotix",
    description:
      "Automate workflows and unlock data insights with Zebotix's Enterprise AI Solutions and custom machine learning models.",
    heroHeadline: "Enterprise AI & Machine Learning Solutions",
    heroSubheadline:
      "Automate manual processes, enhance decision-making, and unlock explosive growth with custom Artificial Intelligence integrations.",
    content:
      "Artificial Intelligence is no longer a buzzword; it is a competitive necessity. We help enterprises integrate powerful AI models (like GPT-4, Llama, and custom ML algorithms) directly into their workflows. Whether you need an intelligent customer support chatbot, automated data extraction, or predictive analytics, our AI engineers can build and deploy production-ready solutions tailored to your business data.",
  },
  {
    slug: "it-consulting",
    keyword: "IT Consulting",
    title: "Strategic IT Consulting Services | Zebotix",
    description:
      "Partner with Zebotix for expert IT consulting. We help businesses modernize their tech stacks, improve security, and scale operations.",
    heroHeadline: "Strategic IT Consulting & Architecture",
    heroSubheadline:
      "Modernize your legacy systems, optimize your cloud infrastructure, and align your technology with your business goals.",
    content:
      "Technology moves fast, and making the wrong architectural choices can cost millions. Our IT consulting services provide you with a fractional CTO-level perspective. We audit your existing systems, identify performance bottlenecks, and create a comprehensive roadmap for digital transformation. From cloud migration strategies on AWS to microservices architecture, we ensure your tech stack is future-proof.",
  },
  {
    slug: "b2b-it-solutions",
    keyword: "B2B IT Solutions",
    title: "B2B IT Solutions & Enterprise Software | Zebotix",
    description:
      "Zebotix delivers secure, scalable B2B IT solutions designed to streamline operations and enhance collaboration between businesses.",
    heroHeadline: "Enterprise-Grade B2B IT Solutions",
    heroSubheadline:
      "Streamline operations, secure your supply chain, and enhance collaboration with our custom B2B software systems.",
    content:
      "B2B software requires entirely different paradigms than consumer apps—focusing heavily on RBAC (Role-Based Access Control), high-security compliance, and massive data throughput. We engineer custom B2B IT solutions including ERP systems, vendor management portals, and automated invoicing pipelines that help your enterprise operate at maximum efficiency.",
  },
  {
    slug: "e-commerce-solutions",
    keyword: "E-commerce Solutions",
    title: "Custom E-commerce Solutions & Development | Zebotix",
    description:
      "Launch high-converting digital storefronts with Zebotix's custom E-commerce solutions, Headless Commerce, and Shopify integrations.",
    heroHeadline: "High-Performance E-commerce Solutions",
    heroSubheadline:
      "Increase conversions and reduce cart abandonment with ultra-fast, custom headless e-commerce platforms.",
    content:
      "Off-the-shelf e-commerce platforms often fall short when your inventory and traffic scale. We build custom e-commerce solutions and headless storefronts (using Shopify Plus, MedusaJS, and Next.js) that load in milliseconds. By separating the frontend presentation from the backend logic, we deliver unparalleled shopping experiences that drive revenue and customer retention.",
  },
  {
    slug: "react-nextjs-development",
    keyword: "React Next.js Development",
    title: "React & Next.js Development Agency | Zebotix",
    description:
      "Hire expert React and Next.js developers. Zebotix builds SEO-optimized, blazing-fast web applications using the modern React ecosystem.",
    heroHeadline: "Expert React & Next.js Development",
    heroSubheadline:
      "Leverage the power of the modern web with server-side rendered, SEO-optimized React applications built on Next.js.",
    content:
      "As specialists in the React ecosystem, we heavily utilize Next.js for its superior performance, SEO benefits, and developer experience. If your current React application is suffering from slow load times (poor Core Web Vitals) or bad search engine rankings due to client-side rendering, our engineers can migrate and optimize your architecture using the latest Next.js App Router paradigms.",
  },
  {
    slug: "full-stack-development",
    keyword: "Full-Stack Development",
    title: "Full-Stack Software Development Services | Zebotix",
    description:
      "End-to-end full-stack development services. Zebotix handles frontend, backend, databases, and cloud deployment for your products.",
    heroHeadline: "End-to-End Full-Stack Development",
    heroSubheadline:
      "From database design to frontend UI—we handle the entire product lifecycle with our expert full-stack engineering teams.",
    content:
      "You don't need to hire five different agencies to build your product. Our full-stack engineering teams have deep expertise across the entire stack: PostgreSQL/Prisma for the database, Node.js/Go for the backend, and React/Next.js for the frontend. We take full ownership of your product's technical execution, delivering cohesive, well-tested, and highly maintainable codebases.",
  },
];
