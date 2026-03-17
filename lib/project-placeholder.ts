function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
      case "'":
        return '&apos;';
      default:
        return char;
    }
  });
}

function wrapText(value: string, maxChars: number) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';

  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) {
      line = next;
      return;
    }
    if (line) lines.push(line);
    line = word;
  });

  if (line) lines.push(line);
  return lines;
}

function truncateLine(value: string, maxChars: number) {
  if (value.length <= maxChars) return value;
  return `${value.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}

export function projectPlaceholderDataUrl(title: string, locale: 'fr' | 'en', width = 1200, height = 675) {
  const rawTitle = title.trim();
  const subtitle = locale === 'fr' ? 'Pas de capture' : 'No screenshot';
  const maxChars = rawTitle.length > 42 ? 20 : 26;
  const lines = wrapText(rawTitle, maxChars);
  const titleLines = lines.slice(0, 2);
  if (lines.length > 2) {
    titleLines[1] = truncateLine(lines.slice(1).join(' '), maxChars);
  }

  const baseTitleSize = Math.round(Math.max(40, Math.min(72, Math.min(width * 0.06, height * 0.12))));
  const titleSize = titleLines.length > 1 ? Math.round(baseTitleSize * 0.82) : baseTitleSize;
  const lineHeight = Math.round(titleSize * 1.2);
  const titleY = Math.round(height * 0.5);
  const firstDy = titleLines.length > 1 ? -Math.round(lineHeight / 2) : 0;
  const titleTspans = titleLines
    .map((line, index) => `<tspan x='50%' dy='${index === 0 ? firstDy : lineHeight}'>${escapeXml(line)}</tspan>`)
    .join('');
  const subtitleSize = Math.round(Math.max(16, Math.min(30, Math.min(width * 0.03, height * 0.06))));
  const subtitleY = Math.round(titleY + (titleLines.length > 1 ? lineHeight : lineHeight * 0.9));

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#1a1b26'/>
        <stop offset='100%' stop-color='#16161e'/>
      </linearGradient>
      <radialGradient id='glow1' cx='85%' cy='10%' r='60%'>
        <stop offset='0%' stop-color='#7dcfff' stop-opacity='0.25'/>
        <stop offset='100%' stop-color='#7dcfff' stop-opacity='0'/>
      </radialGradient>
      <radialGradient id='glow2' cx='15%' cy='90%' r='55%'>
        <stop offset='0%' stop-color='#bb9af7' stop-opacity='0.2'/>
        <stop offset='100%' stop-color='#bb9af7' stop-opacity='0'/>
      </radialGradient>
      <pattern id='grid' width='64' height='64' patternUnits='userSpaceOnUse'>
        <path d='M 64 0 L 0 0 0 64' fill='none' stroke='#3b4261' stroke-width='1' opacity='0.35'/>
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#bg)'/>
    <rect width='100%' height='100%' fill='url(#grid)'/>
    <rect width='100%' height='100%' fill='url(#glow1)'/>
    <rect width='100%' height='100%' fill='url(#glow2)'/>
    <rect x='72' y='72' width='${width - 144}' height='${height - 144}' rx='28' fill='#24283b' fill-opacity='0.6' stroke='#3b4261'/>
    <text x='50%' y='${titleY}' text-anchor='middle' dominant-baseline='middle' fill='#c0caf5' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${titleSize}' font-weight='600'>${titleTspans}</text>
    <text x='50%' y='${subtitleY}' text-anchor='middle' dominant-baseline='middle' fill='#a9b1d6' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${subtitleSize}'>${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
