const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/import \{([^}]+)\} from '@\/lib\/constants';/g, (match, imports) => {
    // Check which imports are in mockData
    const mockImports = ['PRICING_PLANS', 'FAQS', 'NAV_LINKS', 'FEATURES', 'PORTFOLIOS', 'SOLUTIONS', 'PLATFORMS'];
    const constantImports = ['COMPANY_NAME', 'SITE_URL', 'SHORT_DESC', 'CONTACT_PHONE', 'CONTACT_EMAIL', 'SOCIAL_LINKS'];
    
    const toMock = [];
    const toConst = [];
    
    imports.split(',').forEach(imp => {
      imp = imp.trim();
      if (mockImports.includes(imp)) toMock.push(imp);
      else if (constantImports.includes(imp)) toConst.push(imp);
      else toConst.push(imp); // fallback
    });
    
    let res = '';
    if (toConst.length) res += `import { ${toConst.join(', ')} } from '@/lib/constants';\n`;
    if (toMock.length) res += `import { ${toMock.join(', ')} } from '@/lib/mockData';\n`;
    
    return res.trim();
  });
  fs.writeFileSync(filePath, content);
}

const files = [
  'src/app/sitemap.ts',
  'src/app/work/[slug]/page.tsx',
  'src/components/PortfolioSection.tsx',
  'src/components/PricingSection.tsx',
  'src/components/ProductsCarousel.tsx',
  'src/components/FaqSection.tsx',
  'src/components/FeaturesSection.tsx',
  'src/components/Footer.tsx',
  'src/components/MobileMenu.tsx',
  'src/components/Navbar.tsx',
];

files.forEach(f => {
  const p = path.resolve(__dirname, '..', f);
  if (fs.existsSync(p)) { replaceInFile(p); console.log('Fixed', p); }
});
