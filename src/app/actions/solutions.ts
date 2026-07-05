"use server";

import prisma from "@/lib/db/prisma";

export async function getSolutionsAction() {
  try {
    const solutions = await prisma.solution.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return { success: true, data: solutions };
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return { success: false, error: "Failed to fetch solutions", data: [] };
  }
}

export async function getSolutionBySlugAction(slug: string) {
  try {
    const solution = await prisma.solution.findUnique({
      where: { slug },
      include: { portfolios: true },
    });
    if (!solution) {
      return { success: false, error: "Solution not found" };
    }
    return { success: true, data: solution };
  } catch (error) {
    console.error(`Error fetching solution with slug ${slug}:`, error);
    return { success: false, error: "Failed to fetch solution details" };
  }
}
