import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ふみびと｜AIがあなたの話を覚えて、毎月手紙を書いてくれる';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: 64, height: 64, background: '#e8d5b7', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#1a1a2e">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <span style={{ color: '#e8d5b7', fontSize: 28, fontWeight: 700 }}>ふみびと</span>
        </div>
        <div style={{ color: 'white', fontSize: 44, fontWeight: 900, textAlign: 'center', lineHeight: 1.3, maxWidth: 900 }}>
          AIがあなたの話を覚えて、
          <br />
          毎月手紙を書いてくれる
        </div>
        <div style={{ color: '#a0b4c8', fontSize: 22, marginTop: 24, textAlign: 'center' }}>
          世界にひとつのペンフレンド体験 | 初月無料
        </div>
      </div>
    ),
    { ...size }
  );
}
