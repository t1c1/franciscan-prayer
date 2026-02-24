// Generate shareable prayer achievement cards using Canvas API

export interface ShareCardData {
  title: string;
  subtitle: string;
  stat?: string;
  footer?: string;
}

export async function generateShareCard(data: ShareCardData): Promise<Blob | null> {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background gradient — Franciscan brown to warm
    const gradient = ctx.createLinearGradient(0, 0, 600, 400);
    gradient.addColorStop(0, "#6B3A2A");
    gradient.addColorStop(1, "#8B5E3C");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 400);

    // Subtle pattern overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let i = 0; i < 600; i += 20) {
      for (let j = 0; j < 400; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10);
        }
      }
    }

    // Tau cross watermark
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(250, 50, 100, 20); // horizontal bar
    ctx.fillRect(280, 50, 40, 120); // vertical bar

    // Title
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.title, 300, 200);

    // Subtitle
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.subtitle, 300, 240);

    // Stat (big number)
    if (data.stat) {
      ctx.fillStyle = "#F5DEB3";
      ctx.font = "bold 48px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(data.stat, 300, 310);
    }

    // Footer
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "italic 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.footer || "franciscan-prayer.pages.dev", 300, 370);

    // App name
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("FRANCISCAN PRAYER", 300, 390);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  } catch {
    return null;
  }
}

export async function shareCard(data: ShareCardData): Promise<void> {
  const blob = await generateShareCard(data);
  if (!blob) return;

  const file = new File([blob], "franciscan-prayer.png", { type: "image/png" });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: data.title,
      text: data.subtitle,
      files: [file],
    });
  } else {
    // Fallback: download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "franciscan-prayer.png";
    a.click();
    URL.revokeObjectURL(url);
  }
}
