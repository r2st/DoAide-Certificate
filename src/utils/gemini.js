const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.8-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export async function generateExperienceLetter({
  employeeName,
  designation,
  companyName,
  joiningDate,
  leavingDate,
  responsibilities,
}) {
  const prompt = `Write a professional experience letter / employment certificate with the following details:

Employee Name: ${employeeName}
Designation: ${designation}
Company Name: ${companyName}
Date of Joining: ${joiningDate}
Date of Leaving: ${leavingDate}
Key Responsibilities: ${responsibilities}

Requirements:
- Use a formal, professional tone
- Include the standard "To Whom It May Concern" header
- Mention the employee's role, duration, and key contributions
- Include a recommendation line
- End with the HR/Manager signature block with company name
- Today's date for the letter date
- Keep it to one page (around 250-350 words)
- Do NOT include any markdown formatting, just plain text`;

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} — ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
