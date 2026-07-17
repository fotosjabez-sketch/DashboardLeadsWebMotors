// api/leads.js
// Função serverless do Vercel. O navegador chama /api/leads (mesmo domínio,
// sem CORS). Aqui no servidor a gente busca os dados no Apps Script e
// devolve pro navegador.

export default async function handler(req, res) {
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx-I42Rg66nQe-IteQlW3KRkZgHFV5YV5_hvTsetKba9lb030d_xDAU69Io5Ey4l4w2YQ/exec';
  try {
    const resp = await fetch(APPS_SCRIPT_URL, { redirect: 'follow' });
    if (!resp.ok) {
      throw new Error('Apps Script respondeu com status ' + resp.status);
    }
    const data = await resp.json();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: 'Falha ao buscar dados da planilha: ' + String(err),
      rows: []
    });
  }
}
