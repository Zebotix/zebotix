import { prisma } from './src/lib/db/prisma';

async function main() {
  const solutions = await prisma.solution.findMany();
  
  for (const sol of solutions) {
    console.log(`Processing: ${sol.title}`);
    
    // Create some placeholder data if empty
    const benefits = Array.isArray(sol.benefits) && sol.benefits.length > 0 ? sol.benefits : [
      { title: `High Performance ${sol.title}`, desc: `Experience the best performance with our ${sol.title} solutions.` },
      { title: 'Scalable Architecture', desc: 'Our solutions are built to scale with your business needs.' },
      { title: 'Secure by Design', desc: 'Enterprise-grade security implemented at every layer.' },
      { title: 'Cost-Effective', desc: 'Optimized operations that reduce your overall cost of ownership.' }
    ];
    
    const process = Array.isArray(sol.process) && sol.process.length > 0 ? sol.process : [
      { title: 'Discovery & Planning', desc: 'We start by understanding your core business requirements and planning the optimal approach.' },
      { title: 'Design & Architecture', desc: 'Creating robust architectures that guarantee high availability and maintainability.' },
      { title: 'Development & Implementation', desc: 'Agile development process with regular check-ins and transparent progress.' },
      { title: 'Testing & QA', desc: 'Rigorous testing to ensure flawless execution before launch.' },
      { title: 'Deployment & Support', desc: 'Smooth deployment process followed by reliable ongoing support.' }
    ];
    
    const technologies = Array.isArray(sol.technologies) && sol.technologies.length > 0 ? sol.technologies : [
      { name: 'React', icon: 'react' },
      { name: 'Node.js', icon: 'node' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Docker', icon: 'docker' }
    ];
    
    await prisma.solution.update({
      where: { id: sol.id },
      data: {
        benefits,
        process,
        technologies
      }
    });
    
    console.log(`Updated: ${sol.title}`);
  }
}

main().catch(console.error).finally(() => process.exit(0));
