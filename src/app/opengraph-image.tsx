import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Annadaata Agro Industries — Premium Rice Manufacturers, West Bengal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  const logoData = readFileSync(join(process.cwd(), 'src/assets/logo.png'));
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F9F7F3',
          padding: '64px 80px',
          position: 'relative',
        }}
      >
        {/* Subtle radial glows */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46,125,50,0.07) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Outer border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            border: '1px solid rgba(212,175,55,0.30)',
            borderRadius: '20px',
            display: 'flex',
          }}
        />

        {/* Top gold accent bar */}
        <div
          style={{
            position: 'absolute',
            top: '36px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '56px',
            height: '3px',
            backgroundColor: '#D4AF37',
            borderRadius: '2px',
            display: 'flex',
          }}
        />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={100}
          height={100}
          style={{ objectFit: 'contain', marginBottom: '28px' }}
          alt=""
        />

        {/* Company name */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#1C2B1C',
            lineHeight: 1.1,
            textAlign: 'center',
            letterSpacing: '-0.5px',
            marginBottom: '20px',
            display: 'flex',
          }}
        >
          Annadaata Agro Industries
        </div>

        {/* Green divider */}
        <div
          style={{
            width: '56px',
            height: '3px',
            backgroundColor: '#2E7D32',
            borderRadius: '2px',
            marginBottom: '24px',
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: '22px',
            color: '#4A6741',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'flex',
          }}
        >
          Premium Rice Manufacturers · West Bengal, India
        </div>

        {/* Bottom badge row */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: '13px',
              color: '#8A9A88',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            ISO 22000:2018 Certified · Food Safety Management
          </div>
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
