/* eslint-disable no-console */

import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedCMS(prisma: PrismaClient) {
  console.log("Seeding CMS (Legal Pages, FAQs, Site Settings)...");

  // Legal Pages
  const legalPages = [
    {
      title: "Privacy Policy",
      slug: "privacy",
      content: `
        <nav class="not-prose mb-6">
          <h2 class="text-sm font-semibold text-zinc-500 mb-2">On this page</h2>
          <ul class="flex flex-wrap gap-3 text-sm list-none p-0 m-0">
            <li><a class="text-blue-500 hover:underline" href="#overview">Overview</a></li>
            <li><a class="text-blue-500 hover:underline" href="#information-we-collect">Information We Collect</a></li>
            <li><a class="text-blue-500 hover:underline" href="#how-we-use-information">How We Use Information</a></li>
            <li><a class="text-blue-500 hover:underline" href="#data-protection">Data Protection</a></li>
            <li><a class="text-blue-500 hover:underline" href="#sharing-information">Sharing Information</a></li>
            <li><a class="text-blue-500 hover:underline" href="#your-rights">Your Rights</a></li>
          </ul>
        </nav>

        <section id="overview" class="mb-8">
          <h2 class="text-2xl font-black text-white mb-3">1. Overview</h2>
          <p>
            Zebotix values your privacy. This policy explains how we collect, use, and protect your
            information when you visit our website or use our services.
          </p>
        </section>

        <section id="information-we-collect" class="mb-8">
          <h2 class="text-2xl font-black text-white mb-3">2. Information We Collect</h2>
          <ul class="list-disc ml-6 space-y-2">
            <li>Contact details (name, email, phone)</li>
            <li>Business information (company name, project details)</li>
            <li>Technical data (cookies, IP address, browser type)</li>
            <li>
              Payment details (processed securely via Stripe, PayPal, or other PCI-compliant
              providers — we do not store card numbers)
            </li>
          </ul>
        </section>

        <section id="how-we-use-information" class="mb-8">
          <h2 class="text-2xl font-black text-white mb-3">3. How We Use Information</h2>
          <ul class="list-disc ml-6 space-y-2">
            <li>To communicate and deliver requested services</li>
            <li>To process payments and issue invoices</li>
            <li>To improve user experience and site performance</li>
            <li>To comply with legal or tax obligations</li>
          </ul>
        </section>

        <section id="data-protection" class="mb-8">
          <h2 class="text-2xl font-black text-white mb-3">4. Data Protection</h2>
          <p>
            We apply secure hosting, HTTPS encryption, and limited access control. Personal data is
            stored only as long as necessary and deleted upon written request.
          </p>
        </section>

        <section id="sharing-information" class="mb-8">
          <h2 class="text-2xl font-black text-white mb-3">5. Sharing Information</h2>
          <p>
            We do not sell or trade personal data. Data may be shared only with trusted vendors or
            sub-processors (hosting, email, analytics) under strict confidentiality, or with legal
            authorities when required by law.
          </p>
        </section>

        <section id="your-rights" class="mb-8">
          <h2 class="text-2xl font-black text-white mb-3">6. Your Rights (GDPR/EU Clients)</h2>
          <p>
            You may request access, correction, or deletion of your personal data by contacting us
            at <a href="mailto:zebotix@gmail.com" class="underline text-blue-500">zebotix@gmail.com</a>. We respond within 30 days.
          </p>
        </section>

        <footer class="mt-8 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
          <p>
            Questions about these Privacy Polices? Contact us at <a href="mailto:zebotix@gmail.com" class="text-blue-500 hover:underline">zebotix@gmail.com</a>.
          </p>
        </footer>
      `,
      isPublished: true,
    },
    {
      title: "Terms & Conditions",
      slug: "terms",
      content: `
        <nav class="not-prose mb-6">
          <h2 class="text-sm font-semibold text-zinc-500 mb-2">On this page</h2>
          <ul class="flex flex-wrap gap-3 text-sm list-none p-0 m-0">
            <li><a class="text-blue-500 hover:underline" href="#introduction">Introduction</a></li>
            <li><a class="text-blue-500 hover:underline" href="#services">Services &amp; Deliverables</a></li>
            <li><a class="text-blue-500 hover:underline" href="#payment">Payment &amp; Pricing</a></li>
            <li><a class="text-blue-500 hover:underline" href="#ip">Intellectual Property</a></li>
            <li><a class="text-blue-500 hover:underline" href="#revisions">Revisions</a></li>
            <li><a class="text-blue-500 hover:underline" href="#confidentiality">Confidentiality</a></li>
            <li><a class="text-blue-500 hover:underline" href="#liability">Liability &amp; Warranty</a></li>
            <li><a class="text-blue-500 hover:underline" href="#cancellation">Cancellation &amp; Disputes</a></li>
            <li><a class="text-blue-500 hover:underline" href="#force-majeure">Force Majeure</a></li>
          </ul>
        </nav>

        <section id="introduction" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">1. Introduction</h2>
          <p>
            These Terms and Conditions (“<strong>Terms</strong>”) govern the use of all services,
            products, and digital assets provided by <strong>Zebotix</strong> (“Supplier”, “we”,
            “our”, “us”) to its clients (“Client”, “you”). By engaging our services or accessing our
            website, you agree to these Terms.
          </p>
        </section>

        <section id="services" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">2. Services &amp; Deliverables</h2>
          <p>
            All project scopes, deliverables, and timelines will be outlined in the proposal or
            Statement of Work (SOW). Any change in scope after approval will require a formal Change
            Request and may affect pricing and timelines.
          </p>
          <ul class="list-disc ml-6 space-y-2">
            <li>
              Deliverables will be accepted in the form agreed in the SOW (staging URL, repository
              access, or build artifacts).
            </li>
            <li>
              Delivery dates are estimated and depend on timely client feedback and provision of
              assets.
            </li>
          </ul>
        </section>

        <section id="payment" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">3. Payment &amp; Pricing</h2>
          <p>
            <strong>Payment Schedule:</strong> 50% upfront, 40% upon staging/design approval, 10%
            upon final acceptance.
          </p>
          <p>
            <strong>Currency:</strong> All payments in PKR (Pakistani Rupees) unless otherwise
            stated.
          </p>
          <p>
            <strong>Late Fees:</strong> 2% monthly interest applies on overdue invoices after 15
            days.
          </p>
          <p>
            <strong>Refunds:</strong> See Refund Policy section.
          </p>
          <p>
            <strong>Invoices:</strong> Prices exclude applicable taxes; invoices are issued
            electronically.
          </p>
        </section>

        <section id="ip" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">4. Intellectual Property (IP)</h2>
          <p>
            Upon full payment, all rights and ownership of deliverables created specifically for the
            Client transfer to the Client. Zebotix retains ownership of any pre-existing tools,
            frameworks, or libraries used. Zebotix may display completed work in its portfolio
            unless an NDA restricts it.
          </p>
          <p>
            <strong>Third-party components:</strong> Any third-party or open-source components used
            are subject to their respective licenses. Client is responsible for any paid third-party
            license fees.
          </p>
        </section>

        <section id="revisions" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">5. Revisions &amp; Change Requests</h2>
          <p>
            Projects include limited revisions as agreed. Additional requests altering scope or
            functionality are billed at standard hourly or fixed rates. Revision rounds for UI/copy
            adjustments are defined in each proposal.
          </p>
        </section>

        <section id="confidentiality" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">6. Confidentiality &amp; NDA</h2>
          <p>
            Zebotix treats all client information as confidential. If required, a separate NDA can
            be signed before work begins. Data is stored securely and shared only with authorized
            personnel.
          </p>
        </section>

        <section id="liability" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">7. Liability &amp; Warranty</h2>
          <p>
            Zebotix provides a 30-day bug-fix warranty after launch for defects reported in writing.
            Our total liability is capped at the total fees paid for the specific project. We are
            not liable for indirect losses, third-party failures, or content provided by the Client.
          </p>
        </section>

        <section id="cancellation" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">8. Cancellation &amp; Disputes</h2>
          <p>
            Either party may terminate with written notice. Refunds are issued per the Refund
            Policy. Any disputes shall first go through mediation. Governing law is
            <strong>Pakistan</strong>, with jurisdiction in <strong>Karachi courts</strong>.
          </p>
        </section>

        <section id="force-majeure" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">9. Force Majeure</h2>
          <p>
            Neither party is liable for delays caused by events beyond reasonable control (natural
            disasters, cyberattacks, government restrictions, etc.). In such cases, affected
            timelines will be extended commensurately and parties will cooperate to minimize
            disruption.
          </p>
        </section>

        <footer class="mt-8 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
          <p>
            Questions about these Terms? Contact us at <a href="mailto:zebotix@gmail.com" class="text-blue-500 hover:underline">zebotix@gmail.com</a>.
          </p>
        </footer>
      `,
      isPublished: true,
    },
    {
      title: "Cookie Policy",
      slug: "cookie-policy",
      content: `
        <nav class="not-prose mb-6">
          <h2 class="text-sm font-semibold text-zinc-500 mb-2">On this page</h2>
          <ul class="flex flex-wrap gap-3 text-sm list-none p-0 m-0">
            <li><a class="text-blue-500 hover:underline" href="#what-are-cookies">What are Cookies?</a></li>
            <li><a class="text-blue-500 hover:underline" href="#how-we-use">How We Use Cookies</a></li>
            <li><a class="text-blue-500 hover:underline" href="#managing">Managing Cookies</a></li>
            <li><a class="text-blue-500 hover:underline" href="#third-party">Third-Party Cookies</a></li>
          </ul>
        </nav>

        <section id="what-are-cookies" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device by websites you visit. They help the
            site remember your preferences, support essential functionality, and provide analytics
            about how the site is used.
          </p>
        </section>

        <section id="how-we-use" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">2. How We Use Cookies</h2>
          <p>We use cookies for several purposes, including:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li>
              <strong>Essential cookies:</strong> Required for core site functionality (sessions,
              security, load balancing). These cookies cannot be disabled if you want to use
              essential features.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used to understand visitor behaviour and improve
              performance. We typically use tools such as Google Analytics or similar services
              operating as our processors.
            </li>
            <li>
              <strong>Preference cookies:</strong> Remember your choices such as language, theme
              (including your dark/black theme preference), and other UI settings.
            </li>
          </ul>
        </section>

        <section id="managing" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">3. Managing Cookies</h2>
          <p>
            When you first visit our site, you'll see a cookie banner that allows you to accept or
            reject non-essential cookies. You can change your preferences at any time via that
            banner or through your browser settings.
          </p>
          <p>
            Disabling cookies may limit some functionality — for example, your saved theme or
            language preferences might not persist between visits.
          </p>
          <p class="text-sm text-zinc-400 mt-4">
            Useful links for managing cookies in popular browsers:
          </p>
          <ul class="text-sm text-zinc-400 list-disc ml-6 space-y-1">
            <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
            <li>Firefox: Preferences → Privacy & Security → Cookies and Site Data</li>
            <li>Safari: Preferences → Privacy → Manage Website Data</li>
          </ul>
        </section>

        <section id="third-party" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">4. Third-Party Cookies</h2>
          <p>
            Some cookies used on our site are set by third-party services (for example, embedded
            videos, analytics providers, or social widgets). These cookies are governed by the third
            party's own privacy policies and controls, which we do not control. We recommend
            reviewing those providers' policies if you have concerns about their cookies.
          </p>
        </section>

        <footer class="mt-8 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
          <p>
            Questions about cookies? Contact us at <a href="mailto:zebotix@gmail.com" class="text-blue-500 hover:underline">zebotix@gmail.com</a>.
          </p>
        </footer>
      `,
      isPublished: true,
    },
    {
      title: "GDPR Compliance Statement",
      slug: "gdpr",
      content: `
        <nav class="not-prose mb-6">
          <h2 class="text-sm font-semibold text-zinc-500 mb-2">On this page</h2>
          <ul class="flex flex-wrap gap-3 text-sm list-none p-0 m-0">
            <li><a class="text-blue-500 hover:underline" href="#purpose">Purpose</a></li>
            <li><a class="text-blue-500 hover:underline" href="#scope">Data Processing Scope</a></li>
            <li><a class="text-blue-500 hover:underline" href="#processor-resp">Processor Responsibilities</a></li>
            <li><a class="text-blue-500 hover:underline" href="#sub-processors">Sub-processors</a></li>
            <li><a class="text-blue-500 hover:underline" href="#transfers">Data Transfers</a></li>
            <li><a class="text-blue-500 hover:underline" href="#termination">Termination</a></li>
          </ul>
        </nav>

        <section id="purpose" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">1. Purpose</h2>
          <p>
            This Data Processing Agreement (“<strong>DPA</strong>”) outlines how <strong>Zebotix</strong>, acting as a data processor, handles personal data on behalf of
            the Client (data controller) in compliance with the EU General Data Protection
            Regulation (<strong>GDPR</strong>).
          </p>
        </section>

        <section id="scope" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">2. Data Processing Scope</h2>
          <p>
            <strong>Data types:</strong> Client names, email addresses, usage data, website content,
            and any other personal data provided in the course of the Services.
          </p>
          <p>
            <strong>Purpose:</strong> Processing is carried out to provide digital, design, and
            development services as described in the applicable contract or SOW.
          </p>
          <p>
            <strong>Duration:</strong> Personal data will be processed for the term of the
            engagement and until termination or until a lawful deletion request is fulfilled,
            subject to any legal retention obligations.
          </p>
        </section>

        <section id="processor-resp" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">3. Processor Responsibilities</h2>
          <p>Zebotix will:</p>
          <ul class="list-disc ml-6 space-y-2">
            <li>Process personal data only under the Client’s documented instructions.</li>
            <li>
              Maintain appropriate technical and organizational security measures to protect
              personal data.
            </li>
            <li>Ensure confidentiality and restrict access to authorised personnel only.</li>
            <li>
              Assist the Client with data subject requests and compliance obligations where
              reasonable and feasible.
            </li>
            <li>
              Notify the Client of any personal data breach affecting the Client's data within <strong>72 hours</strong> of discovery.
            </li>
          </ul>
        </section>

        <section id="sub-processors" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">4. Sub-processors</h2>
          <p>
            Zebotix may engage trusted sub-processors (for example, hosting providers, email
            services, or cloud storage vendors) to assist in providing services. Zebotix will ensure
            that any sub-processor is bound by obligations at least as protective as those in this
            DPA.
          </p>
        </section>

        <section id="transfers" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">5. Data Transfers</h2>
          <p>
            If personal data is transferred outside the EU/EEA, Zebotix will implement appropriate
            safeguards such as Standard Contractual Clauses (SCCs) or other lawful transfer
            mechanisms to ensure an adequate level of protection for the data.
          </p>
        </section>

        <section id="termination" class="mb-6">
          <h2 class="text-2xl font-black text-white mb-3">6. Termination</h2>
          <p>
            Upon termination of the contract, Zebotix will, at the Client's choice, return or
            securely delete all personal data processed on behalf of the Client, unless retention is
            required by law.
          </p>
        </section>

        <footer class="mt-8 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
          <p>
            For questions about this DPA or GDPR compliance, contact us at <a href="mailto:privacy@zebotix.com" class="text-blue-500 hover:underline">privacy@zebotix.com</a>.
          </p>
        </footer>
      `,
      isPublished: true,
    },
  ];

  for (const page of legalPages) {
    await prisma.legalPage.upsert({
      where: { slug: page.slug },
      update: { title: page.title, content: page.content, isPublished: page.isPublished },
      create: page,
    });
  }

  // FAQs
  const faqs = [
    {
      question: "How does Zebotix approach custom software development?",
      answer:
        "We engineer systems from the ground up to avoid typical layout builder bloat. Every project is planned, structured in a type-safe format, and optimized for performance using modern technologies like Next.js and serverless architectures.",
      category: "general",
      order: 1,
      isPublished: true,
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "A standard enterprise-grade project takes between 6 to 12 weeks. We split progress into bi-weekly sprints, meaning you see working updates constantly throughout the implementation cycle.",
      category: "general",
      order: 2,
      isPublished: true,
    },
    {
      question: "Do you offer post-launch support and maintenance?",
      answer:
        "Yes, we provide ongoing maintenance, scaling support, security patches, and direct developer communication channels to keep your system performing at its peak.",
      category: "general",
      order: 3,
      isPublished: true,
    },
    {
      question: "Can you integrate AI capabilities into our existing systems?",
      answer:
        "Absolutely. We specialize in retrofitting legacy backends with semantic vector search, custom LLM integration, and automated pipeline scripts.",
      category: "general",
      order: 4,
      isPublished: true,
    },
    {
      question: "How do you ensure data security and compliance?",
      answer:
        "We enforce strict encryption at rest and in transit, implement role-based access control, follow GDPR privacy-by-design standards, and run continuous dependency audits.",
      category: "general",
      order: 5,
      isPublished: true,
    },
  ];

  for (const f of faqs) {
    const exists = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (!exists) {
      await prisma.fAQ.create({ data: f });
    }
  }

  // Site Settings
  const settingExists = await prisma.siteSetting.findUnique({ where: { key: "brand_colors" } });
  if (!settingExists) {
    await prisma.siteSetting.create({
      data: {
        key: "brand_colors",
        group: "theme",
        value: { primary: "#1d4ed8", background: "#09090b", text: "#ffffff" },
      },
    });
  }



  // Manifest Config
  const manifestExists = await prisma.siteSetting.findUnique({ where: { key: "manifest_config" } });
  if (!manifestExists) {
    await prisma.siteSetting.create({
      data: {
        key: "manifest_config",
        group: "general",
        value: {
          name: "Zebotix Software Engineering",
          shortName: "Zebotix",
          description: "Empowering innovation with scalable software architecture, AI automation, and bespoke cloud infrastructure.",
          backgroundColor: "#09090b",
          themeColor: "#1d4ed8"
        },
      },
    });
  }

  console.log("CMS seeded successfully.");
}
