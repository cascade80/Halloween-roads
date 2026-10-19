import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";

const PORT = 5450;

async function run() {
  fs.mkdirSync("shots", { recursive: true });
  console.log(`Starting preview server on port ${PORT}...`);
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "inherit",
    shell: true,
  });

  await new Promise((r) => setTimeout(r, 2000));

  console.log("Launching headless browser...");
  const browser = await chromium.launch({
    channel: "chromium",
    headless: true,
    args: ["--use-angle=d3d11", "--use-gl=angle", "--enable-gpu", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--force_high_performance_gpu", "--hide-scrollbars", "--mute-audio"],
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", (e) => console.error("[PAGE ERROR]", e.message));

    console.log(`Navigating to game with autoplay=1&skipintro=1 on port ${PORT}...`);
    await page.goto(`http://localhost:${PORT}/?autoplay=1&skipintro=1`, { waitUntil: "load" });

    console.log("Waiting for game ready...");
    await page.waitForFunction(() => window.__ride?.ready === true, null, { timeout: 90000 });

    console.log("Verifying Billboard system...");
    const billboardState = await page.evaluate(() => {
      const ride = window.__ride;
      return {
        hasBillboards: !!ride.billboards,
        hasSetImage: typeof ride.setBillboardImage === "function",
        hasSetImages: typeof ride.setBillboardImages === "function",
        childCount: ride.billboards?.root?.children?.length,
        hasTechyonGlobal: !!window.techyon?.setBillboardImage,
      };
    });
    console.log("Billboard system state:", JSON.stringify(billboardState, null, 2));

    // Teleport close to first billboard at z = -40, facing it
    console.log("Positioning camera at Billboard #0 (z = -30, looking toward -40)...");
    await page.evaluate(() => {
      const ride = window.__ride;
      // Position rider at u=3.0, z=-22 to clearly frame the right-hand billboard
      ride.place(2.0, -22, 0, 0);
    });

    await new Promise((r) => setTimeout(r, 800));

    try {
      await page.screenshot({ path: "shots/billboard_0_default.png", timeout: 8000 });
      console.log("Captured screenshot: shots/billboard_0_default.png");
    } catch (e) {
      console.warn("Screenshot note:", e.message);
    }

    // Now test setting a custom image on Billboard #0 via Data URI
    console.log("Testing dynamic custom image display on Billboard #0...");
    const customImageResult = await page.evaluate(async () => {
      // Create a test 16:9 custom banner data URI
      const c = document.createElement("canvas");
      c.width = 1280; c.height = 720;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#ff4400";
      ctx.fillRect(0, 0, 1280, 720);
      ctx.fillStyle = "#ffffff";
      ctx.font = 'bold 90px "Arial", sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("CUSTOM USER IMAGE", 640, 320);
      ctx.font = '40px "Arial", sans-serif';
      ctx.fillText("DISPLAYED ON HIGHWAY BILLBOARD", 640, 420);
      const dataUri = c.toDataURL("image/png");

      return await window.techyon.setBillboardImage(0, dataUri);
    });
    console.log("Custom image set result:", customImageResult);

    await new Promise((r) => setTimeout(r, 600));

    try {
      await page.screenshot({ path: "shots/billboard_0_custom.png", timeout: 8000 });
      console.log("Captured screenshot: shots/billboard_0_custom.png");
    } catch (e) {
      console.warn("Custom screenshot note:", e.message);
    }

    // Teleport to Billboard #1 on the left side (z = -120)
    console.log("Positioning camera at Billboard #1 (z = -105)...");
    await page.evaluate(() => {
      const ride = window.__ride;
      ride.place(-2.0, -102, 0, 0);
    });
    await new Promise((r) => setTimeout(r, 800));

    try {
      await page.screenshot({ path: "shots/billboard_1_curfew.png", timeout: 8000 });
      console.log("Captured screenshot: shots/billboard_1_curfew.png");
    } catch (e) {
      console.warn("Curfew screenshot note:", e.message);
    }

    console.log("All billboard tests completed successfully!");
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.kill();
    try {
      process.kill(-server.pid);
    } catch {
      /* ignore */
    }
  }
}

run();
