import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
  ],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on("console", (m) => console.log(`[console ${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
await page.goto("http://localhost:5420/?skipintro=1", { waitUntil: "load" });
console.log("Page loaded. Checking state every 1.5s...");
for (let i = 0; i < 25; i++) {
  await new Promise((r) => setTimeout(r, 1500));
  const s = await page.evaluate(() => {
    const ride = window.__ride;
    return {
      hasRide: typeof window !== "undefined" && Boolean(ride),
      ready: ride?.ready,
      waiting: ride?.waiting,
      exploreMode: ride?.explore?.state?.mode,
    };
  });
  console.log(`[t=${(i + 1) * 1.5}s]`, s);
  if (s.waiting) {
    console.log("Page is waiting for gesture! Clicking center...");
    await page.mouse.click(640, 360);
    await new Promise((r) => setTimeout(r, 1000));
  }
  if (s.ready) {
    await new Promise((r) => setTimeout(r, 1500));

    console.log("Capturing zombie on startup (shots/zombie_start.png)...");
    await page.screenshot({ path: "shots/zombie_start.png", timeout: 60000 });

    console.log("Orbiting camera to front view of zombie...");
    await page.evaluate(() => {
      window.__ride?.explore?.orbit(Math.PI * 0.9, 0.15, 2.4);
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: "shots/zombie_front.png", timeout: 60000 });

    console.log("Pressing W to walk forward...");
    await page.keyboard.down("KeyW");
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: "shots/zombie_walk.png", timeout: 60000 });
    await page.keyboard.up("KeyW");

    console.log("Done capturing all zombie verification shots!");
    break;
  }
}
await browser.close();
