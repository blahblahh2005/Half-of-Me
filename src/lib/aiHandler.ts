export async function handleEntryAndAI(text: string, mood: string): Promise<string> {
  const prompt = `User is feeling ${mood}. Continue this unfinished message in a tone matching the mood:\n\n"${text}"\n\nCompleted version:`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_OPENROUTER_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You complete unfinished thoughts with empathy.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('AI error:', error);
    return 'Error fetching AI response.';
  }
}
