import React from 'react';

const EXAMPLES = [
  {
    name: 'JSONPlaceholder',
    url: 'https://jsonplaceholder.typicode.com/todos/1'
  },
  {
    name: 'DummyJSON (Products)',
    url: 'https://dummyjson.com/products/1'
  },
  {
    name: 'Open-Meteo (Weather)',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m'
  }
];

export default function QuickPresets({ onSelectPreset }) {
  return (
    <div className="examples-bar">
      <span className="examples-label">Examples:</span>
      <div className="examples-list">
        {EXAMPLES.map((example) => (
          <button
            key={example.name}
            className="example-chip"
            onClick={() => onSelectPreset(example.url)}
            type="button"
          >
            {example.name}
          </button>
        ))}
      </div>
    </div>
  );
}
