import { keywordChain, sentimentChain, summarizeChain } from "./llmchains";

const text = `This has been quite a ride, a lot of you were with me from the start, many joined in between and I thank each and everyone of you for your support and motivation

Only a few knows why I started this in the first place, I was feeling a bit stagnant in my life, was not finding happiness in a lot of things and felt am just watching each day glide by me

I had been feeling like this for a while infact but never really tried to root cause it.

On a random evening while scrolling through twitter I saw many of you making cool stuff or upskilling in one form or another, I realized if I don't get back to learning I will become like those employees who don't have knowledge outside of what they learn at work. 

Frankly that's a fine lifestyle, people have various ways of spending their free time but for me I had to pick up something that makes me push my limits and learn, and that's how I just started solving DSA again and picked up system design properly`;

export async function analyzeData(text: string) {
    const [summary, sentiment, keywords] = await Promise.all([
        summarizeChain.invoke({ text }),
        sentimentChain.invoke({ text }),
        keywordChain.invoke({ text }),
    ]);

    return { summary, sentiment, keywords };
}
