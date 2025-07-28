import { useState } from 'react';
import { handleEntryAndAI } from '../lib/aiHandler.ts';

export default function SubmitEntry() {
  const [input, setInput] = useState<string>('');
  const [mood, setMood] = useState<string>('hopeful');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async () => {
    const result = await handleEntryAndAI(input, mood);
    setResponse(result);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Write Your Unfinished Thought</h2>
      <textarea
        className="w-full p-2 border rounded"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write half of something..."
      />
      <div className="flex justify-between items-center my-4">
        <label>Select Mood: </label>
        <select
          className="border rounded p-1"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="hopeful">Hopeful</option>
          <option value="confused">Confused</option>
          <option value="proud">Proud</option>
          <option value="frustrated">Frustrated</option>
        </select>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Complete It
      </button>

      {response && (
        <div className="mt-6">
          <h3 className="font-semibold">AI Response:</h3>
          <p className="whitespace-pre-wrap bg-gray-100 p-3 rounded">{response}</p>
        </div>
      )}
    </div>
  );
}
