'use client';

import { useState } from 'react';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export default function ApiTester() {
  // フォーム状態
  const [endpoint, setEndpoint] = useState<string>('/api/openai');
  const [method, setMethod] = useState<Method>('GET');
  const [body, setBody] = useState<string>('{}');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 実行ボタンハンドラ
  const runTest = async () => {
    setError('');
    setResult('Loading...');
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method === 'GET' ? undefined : body,
      });
      const text = await res.json()
      setResult(text.result.content[0].text);
    } catch (e: any) {
      setError(e.message);
      setResult('');
    }
  };

  // 開発モード以外では何も表示しない
  if (process.env.NODE_ENV !== 'development') {
    return <p>Page not found.</p>;
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#2563eb', marginBottom: 24, letterSpacing: 1 }}>API Tester</h1>

      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#334155' }}>
          Endpoint:{' '}
          <input
            type="text"
            value={endpoint}
            onChange={e => setEndpoint(e.target.value)}
            style={{ width: '60%', padding: 8, border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 16, background: '#fff', color: '#0f172a', marginLeft: 8 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#334155' }}>
          Method:{' '}
          <select value={method} onChange={e => setMethod(e.target.value as Method)} style={{ padding: 8, border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 16, background: '#fff', color: '#0f172a', marginLeft: 8 }}>
            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 18 }}>
        <pre style={{ background: '#e0e7ef', padding: 12, borderRadius: 6, color: '#475569', fontSize: 15, margin: 0 }}>
          {`exampleJson: {"input": "1+1"}`}
        </pre>
      </div>

      {method !== 'GET' && (
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, color: '#334155' }}>
            Body:{' '}
            <textarea
              rows={6}
              value={body}
              onChange={e => setBody(e.target.value)}
              style={{ width: '80%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 15, background: '#fff', color: '#0f172a', marginLeft: 8, resize: 'vertical' }}
            />
          </label>
        </div>
      )}

      <button onClick={runTest} style={{ padding: '10px 28px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px #dbeafe', transition: 'background 0.2s' }}
        onMouseOver={e => (e.currentTarget.style.background = '#1d4ed8')}
        onMouseOut={e => (e.currentTarget.style.background = '#2563eb')}
      >
        Run
      </button>

      {error && (
        <pre style={{ marginTop: 24, color: 'crimson', background: '#fee2e2', padding: 12, borderRadius: 6, fontWeight: 600, fontSize: 15, whiteSpace: 'pre-wrap' }}>{error}</pre>
      )}
      <div style={{ marginTop: 24, minHeight: 80, display: result ? 'block' : 'none' }}>
        <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 6, color: '#0f172a', fontSize: 15, whiteSpace: 'pre-wrap', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px #e0e7ef' }}>
          {result}
        </pre>
      </div>
    </div>
  );
}
