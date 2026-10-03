import { forwardRef } from 'react';

const W = 1056;
const H = 748;

function BorderSVG({ style, color, secondary }) {
  const p = 20;
  const iw = W - p * 2;
  const ih = H - p * 2;

  if (style === 'ornate') {
    return (
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={p} y={p} width={iw} height={ih} rx="2" fill="none" stroke={color} strokeWidth="3" />
        <rect x={p + 8} y={p + 8} width={iw - 16} height={ih - 16} rx="2" fill="none" stroke={color} strokeWidth="1" />
        <rect x={p + 12} y={p + 12} width={iw - 24} height={ih - 24} rx="2" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        {/* Corner flourishes */}
        {[[p, p, 0], [W - p, p, 90], [W - p, H - p, 180], [p, H - p, 270]].map(([cx, cy, r], i) => (
          <g key={i} transform={`translate(${cx},${cy}) rotate(${r})`}>
            <path d="M0,0 C15,0 20,5 25,15 C20,12 15,12 10,15 C12,10 12,5 0,0Z" fill={color} opacity="0.6" />
            <path d="M0,0 Q30,2 35,30" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M0,5 Q25,7 30,30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            <circle cx="35" cy="30" r="2" fill={color} opacity="0.6" />
          </g>
        ))}
        {/* Edge ornaments */}
        <circle cx={W / 2} cy={p} r="4" fill={color} opacity="0.5" />
        <circle cx={W / 2} cy={H - p} r="4" fill={color} opacity="0.5" />
        <line x1={W / 2 - 30} y1={p} x2={W / 2 + 30} y2={p} stroke={color} strokeWidth="2" opacity="0.4" />
        <line x1={W / 2 - 30} y1={H - p} x2={W / 2 + 30} y2={H - p} stroke={color} strokeWidth="2" opacity="0.4" />
      </svg>
    );
  }

  if (style === 'classic') {
    return (
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={p} y={p} width={iw} height={ih} fill="none" stroke={color} strokeWidth="3" />
        <rect x={p + 6} y={p + 6} width={iw - 12} height={ih - 12} fill="none" stroke={color} strokeWidth="1" />
        {/* Corner L-shapes */}
        {[[p - 2, p - 2], [W - p + 2, p - 2], [W - p + 2, H - p + 2], [p - 2, H - p + 2]].map(([cx, cy], i) => {
          const dx = i === 0 || i === 3 ? 1 : -1;
          const dy = i === 0 || i === 1 ? 1 : -1;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={cx + dx * 30} y2={cy} stroke={color} strokeWidth="4" />
              <line x1={cx} y1={cy} x2={cx} y2={cy + dy * 30} stroke={color} strokeWidth="4" />
            </g>
          );
        })}
      </svg>
    );
  }

  if (style === 'modern') {
    return (
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={p} y={p} width={iw} height={ih} rx="8" fill="none" stroke={color} strokeWidth="2" />
        {/* Corner dots */}
        {[[p + 6, p + 6], [W - p - 6, p + 6], [W - p - 6, H - p - 6], [p + 6, H - p - 6]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={color} opacity="0.5" />
        ))}
        {/* Top center accent line */}
        <line x1={W / 2 - 60} y1={p} x2={W / 2 + 60} y2={p} stroke={secondary || color} strokeWidth="3" />
      </svg>
    );
  }

  if (style === 'elegant') {
    return (
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={p} y={p} width={iw} height={ih} fill="none" stroke={color} strokeWidth="1.5" />
        {/* Art-deco corner triangles */}
        {[[p, p, '0,0 25,0 0,25'], [W - p, p, '0,0 -25,0 0,25'], [W - p, H - p, '0,0 -25,0 0,-25'], [p, H - p, '0,0 25,0 0,-25']].map(([cx, cy, pts], i) => (
          <polygon key={i} points={pts} transform={`translate(${cx},${cy})`} fill={color} opacity="0.15" />
        ))}
        {[[p, p, '0,0 15,0 0,15'], [W - p, p, '0,0 -15,0 0,15'], [W - p, H - p, '0,0 -15,0 0,-15'], [p, H - p, '0,0 15,0 0,-15']].map(([cx, cy, pts], i) => (
          <polygon key={`s${i}`} points={pts} transform={`translate(${cx},${cy})`} fill={color} opacity="0.3" />
        ))}
      </svg>
    );
  }

  if (style === 'formal') {
    return (
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={p - 2} y={p - 2} width={iw + 4} height={ih + 4} fill="none" stroke={color} strokeWidth="5" />
        <rect x={p + 8} y={p + 8} width={iw - 16} height={ih - 16} fill="none" stroke={color} strokeWidth="1" />
      </svg>
    );
  }

  // minimal
  return (
    <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <rect x={p} y={p} width={iw} height={ih} fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function SealSVG({ style, color, x, y }) {
  if (style === 'none' || !style) return null;

  if (style === 'gold-seal') {
    return (
      <svg className="absolute pointer-events-none" style={{ left: x, top: y }} width="100" height="110" viewBox="0 0 100 110">
        {/* Ribbon tails */}
        <path d="M35,70 L25,105 L38,90 L50,105 L42,70Z" fill={color} opacity="0.7" />
        <path d="M58,70 L50,105 L62,90 L75,105 L65,70Z" fill={color} opacity="0.7" />
        {/* Outer starburst */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const r = i % 2 === 0 ? 38 : 30;
          const cx = 50 + r * Math.cos(angle);
          const cy = 45 + r * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="3" fill={color} opacity="0.3" />;
        })}
        <circle cx="50" cy="45" r="32" fill={color} />
        <circle cx="50" cy="45" r="28" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
        <circle cx="50" cy="45" r="22" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        {/* Star */}
        <polygon
          points="50,25 55,38 68,38 57,47 61,60 50,52 39,60 43,47 32,38 45,38"
          fill="#fff"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (style === 'shield') {
    return (
      <svg className="absolute pointer-events-none" style={{ left: x, top: y }} width="80" height="95" viewBox="0 0 80 95">
        <path d="M40,5 L72,18 L72,50 C72,72 55,85 40,92 C25,85 8,72 8,50 L8,18 Z" fill={color} />
        <path d="M40,12 L65,23 L65,50 C65,68 51,79 40,85 C29,79 15,68 15,50 L15,23 Z" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
        <polygon points="40,30 44,40 55,40 46,47 49,57 40,51 31,57 34,47 25,40 36,40" fill="#fff" opacity="0.8" />
      </svg>
    );
  }

  if (style === 'laurel') {
    return (
      <svg className="absolute pointer-events-none" style={{ left: x, top: y }} width="90" height="90" viewBox="0 0 90 90">
        {/* Left branch */}
        <g opacity="0.8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={`l${i}`}
              cx={20 + i * 2}
              cy={70 - i * 10}
              rx="8"
              ry="5"
              fill={color}
              transform={`rotate(${-30 + i * 5}, ${20 + i * 2}, ${70 - i * 10})`}
            />
          ))}
        </g>
        {/* Right branch */}
        <g opacity="0.8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={`r${i}`}
              cx={70 - i * 2}
              cy={70 - i * 10}
              rx="8"
              ry="5"
              fill={color}
              transform={`rotate(${30 - i * 5}, ${70 - i * 2}, ${70 - i * 10})`}
            />
          ))}
        </g>
        {/* Stems */}
        <path d="M30,75 Q35,45 45,15" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
        <path d="M60,75 Q55,45 45,15" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
        {/* Center circle */}
        <circle cx="45" cy="50" r="12" fill={color} opacity="0.15" />
      </svg>
    );
  }

  if (style === 'star-badge') {
    return (
      <svg className="absolute pointer-events-none" style={{ left: x, top: y }} width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="35" fill={color} opacity="0.15" />
        <circle cx="40" cy="40" r="28" fill={color} />
        <circle cx="40" cy="40" r="24" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
        <polygon
          points="40,15 46,30 62,30 49,40 53,55 40,46 27,55 31,40 18,30 34,30"
          fill="#fff"
          opacity="0.85"
        />
      </svg>
    );
  }

  if (style === 'ribbon-badge') {
    return (
      <svg className="absolute pointer-events-none" style={{ left: x, top: y }} width="80" height="100" viewBox="0 0 80 100">
        {/* Ribbon tails */}
        <path d="M25,60 L15,95 L30,80 L40,95 L35,60Z" fill={color} opacity="0.6" />
        <path d="M45,60 L40,95 L50,80 L65,95 L55,60Z" fill={color} opacity="0.6" />
        {/* Medal circle */}
        <circle cx="40" cy="38" r="30" fill={color} />
        <circle cx="40" cy="38" r="25" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
        <circle cx="40" cy="38" r="18" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <text x="40" y="44" textAnchor="middle" fill="#fff" fontSize="18" fontFamily="serif" fontWeight="bold" opacity="0.9">&#9733;</text>
      </svg>
    );
  }

  return null;
}

const CertificateRenderer = forwardRef(function CertificateRenderer(
  { template, data, scale = 1, className = '' },
  ref
) {
  if (!template || !data) return null;

  const pc = data.primaryColor || template.colors.primary;
  const sc = template.colors.secondary;
  const bg = template.colors.background;
  const tc = template.colors.text;
  const bc = template.colors.border;

  const titleParts = template.name.toUpperCase().split(/\s*(?:OF|THE|FOR)\s*/i);
  const line1 = template.titleLine1 || 'CERTIFICATE';
  const line2 = template.titleLine2 || '';

  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: W,
        height: H,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: bg,
        fontFamily: '"Montserrat", sans-serif',
      }}
      ref={ref}
    >
      <BorderSVG style={template.borderStyle} color={bc} secondary={sc} />

      <div
        style={{
          position: 'absolute',
          inset: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        {data.logoImage && (
          <img
            src={data.logoImage}
            alt="Logo"
            style={{ height: 56, maxWidth: 200, objectFit: 'contain', marginBottom: 8 }}
            crossOrigin="anonymous"
          />
        )}

        {/* Title line 1 */}
        <h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: line2 ? 36 : 40,
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: pc,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {line1}
        </h1>

        {/* Title line 2 */}
        {line2 && (
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 20,
              fontWeight: 400,
              letterSpacing: '0.2em',
              color: pc,
              margin: '2px 0 0',
              lineHeight: 1.3,
            }}
          >
            {line2}
          </h2>
        )}

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 1,
            background: `linear-gradient(to right, transparent, ${bc}, transparent)`,
            margin: '14px 0',
          }}
        />

        {/* Preamble */}
        <p
          style={{
            fontSize: 12,
            color: tc,
            opacity: 0.7,
            margin: '0 0 6px',
            letterSpacing: '0.05em',
          }}
        >
          This certificate is proudly presented to
        </p>

        {/* Recipient name */}
        <h3
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 52,
            color: pc,
            margin: '0 0 6px',
            lineHeight: 1.1,
            maxWidth: 700,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {data.recipientName || 'Recipient Name'}
        </h3>

        {/* Description */}
        {data.description && (
          <p
            style={{
              fontSize: 13,
              color: tc,
              margin: '0 0 2px',
              maxWidth: 600,
              lineHeight: 1.5,
            }}
          >
            {data.description}
          </p>
        )}

        {/* Title / Course name */}
        {data.title && (
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: pc,
              margin: '4px 0 0',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {data.title}
          </p>
        )}

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: 20 }} />

        {/* Bottom section: date, signature, org */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            maxWidth: 700,
            gap: 40,
          }}
        >
          {/* Date & ID */}
          <div style={{ textAlign: 'left', minWidth: 160 }}>
            {data.date && (
              <p style={{ fontSize: 12, color: tc, margin: '0 0 4px' }}>
                <span style={{ opacity: 0.6 }}>Date: </span>
                {data.date}
              </p>
            )}
            {data.certificateId && (
              <p style={{ fontSize: 10, color: tc, opacity: 0.5, margin: 0 }}>
                ID: {data.certificateId}
              </p>
            )}
          </div>

          {/* Signature */}
          <div style={{ textAlign: 'center', minWidth: 180 }}>
            {data.signatureImage ? (
              <img
                src={data.signatureImage}
                alt="Signature"
                style={{ height: 40, maxWidth: 160, objectFit: 'contain', marginBottom: 4 }}
                crossOrigin="anonymous"
              />
            ) : data.signatureName ? (
              <p
                style={{
                  fontFamily: '"Dancing Script", cursive',
                  fontSize: 24,
                  color: tc,
                  margin: '0 0 4px',
                }}
              >
                {data.signatureName}
              </p>
            ) : null}
            <div
              style={{
                width: 160,
                height: 1,
                backgroundColor: tc,
                opacity: 0.3,
                margin: '0 auto 4px',
              }}
            />
            <p style={{ fontSize: 11, color: tc, opacity: 0.7, margin: 0 }}>
              {data.organization || 'Organization'}
            </p>
          </div>

          {/* QR Code */}
          <div style={{ minWidth: 80, textAlign: 'right' }}>
            {data.qrCodeUrl && (
              <img
                src={data.qrCodeUrl}
                alt="QR"
                style={{ width: 64, height: 64 }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Seal */}
      <SealSVG style={template.sealStyle} color={sc} x={W - 130} y={H - 140} />

      {/* Branding watermark */}
      <p
        style={{
          position: 'absolute',
          bottom: 6,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 8,
          color: tc,
          opacity: 0.3,
          margin: 0,
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        Generated with DoAide Certificate &mdash; cert.doaide.com
      </p>
    </div>
  );
});

export default CertificateRenderer;
