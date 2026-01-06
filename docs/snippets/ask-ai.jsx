import { useState } from 'react';

export const AskAI = () => {
  const [question, setQuestion] = useState('');

  const basePrompt = 'Search https://docs.bytez.com and answer: ';
  const encodedPrompt = encodeURIComponent(basePrompt + question);

  const links = [
    { name: 'ChatGPT', url: `https://chatgpt.com/?q=${encodedPrompt}` },
    { name: 'Claude', url: `https://claude.ai/new?q=${encodedPrompt}` },
    { name: 'Perplexity', url: `https://www.perplexity.ai/search?q=${encodedPrompt}` },
  ];
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && question) {
      window.open(`https://chatgpt.com/?q=${encodeURIComponent(basePrompt + question)}`, '_blank');
    }
  };

  return (
    <div
      style={{
        background: 'rgba(30, 32, 44, 0.6)',
        border: '1px solid rgba(96, 115, 191, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#D0BCFF' }}>
        Ask AI about Bytez
      </h3>
      <p style={{ margin: '0 0 16px 0', opacity: 0.7, fontSize: '0.9rem' }}>
        Get instant answers from our docs
      </p>

      <input
        type="text"
        placeholder="How do I run a model?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '1rem',
          marginTop: 8,
          border: '1px solid rgba(96, 115, 191, 0.3)',
          borderRadius: '8px',
          background: 'rgba(0,0,0,0.3)',
          color: 'inherit',
          marginBottom: '16px',
          boxSizing: 'border-box',
        }}
      />

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {links.map(({ name, url }) => (
          <a
            key={name}
            href={question ? url : '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !question && e.preventDefault()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: question ? '#E8DEF8' : 'rgba(96, 115, 191, 0.3)',
              color: question ? '#332D41' : 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              opacity: question ? 1 : 0.5,
              cursor: question ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  );
};
