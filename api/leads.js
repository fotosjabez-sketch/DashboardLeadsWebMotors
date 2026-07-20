// api/leads.js
// Função serverless do Vercel. O navegador chama /api/leads (mesmo domínio,
// sem CORS). Aqui no servidor a gente busca os dados no n8n (que por sua vez
// lê a tabela do Excel via Microsoft Excel 365) e devolve pro navegador.

export default async function handler(req, res) {
  const N8N_WEBHOOK_URL = 'https://fergrwe13123.app.n8n.cloud/webhook/leads';
  try {
    const resp = await fetch(N8N_WEBHOOK_URL, { redirect: 'follow' });
    if (!resp.ok) {
      throw new Error('n8n respondeu com status ' + resp.status);
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
