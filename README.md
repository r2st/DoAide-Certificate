# DoAide Certificate

Free certificate and award maker at [cert.doaide.com](https://cert.doaide.com).

## Features

- 15+ beautiful certificate templates
- Live preview editor with instant customization
- Bulk generation from CSV
- Export as high-res PNG or print-ready PDF
- Share on WhatsApp, LinkedIn, or embed
- QR code verification
- No login required

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
sudo cp doaide-certificate.service /etc/systemd/system/
sudo systemctl enable --now doaide-certificate
```

## Tech Stack

- React + Vite
- Tailwind CSS 3.4
- html2canvas + jsPDF for exports
- Google Fonts (Playfair Display, Great Vibes, Montserrat, Dancing Script)
