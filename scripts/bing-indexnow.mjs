import fetch from "node-fetch";

const HOST = "zebotix.com";
const KEY = "1e9e03d3c8834c0fb383c38b25121b6d";

async function submitToIndexNow() {
  console.log(`🌐 Fetching sitemap from https://${HOST}/sitemap.xml...`);

  const urlList = [];
  try {
    const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.status} ${sitemapRes.statusText}`);
    }
    const sitemapText = await sitemapRes.text();

    // Extract URLs from sitemap XML
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = regex.exec(sitemapText)) !== null) {
      urlList.push(match[1]);
    }

    console.log(`✅ Found ${urlList.length} URLs in the sitemap.`);
  } catch (error) {
    console.error("❌ Error fetching sitemap:", error);
    return;
  }

  if (urlList.length === 0) {
    console.log("⚠️ No URLs found to submit.");
    return;
  }

  const url = `https://api.indexnow.org/indexnow`;
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  };

  try {
    console.log(`🚀 Submitting ${urlList.length} URLs to Bing IndexNow...`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log("✅ Successfully submitted URLs to IndexNow for Bing!");
    } else {
      console.error("❌ Failed to submit to IndexNow:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("❌ Error submitting to IndexNow:", error);
  }
}

await submitToIndexNow();
