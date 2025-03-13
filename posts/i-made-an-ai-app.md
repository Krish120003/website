---
title: "Can we catch plagarism in hackathons?"
date: "2024-05-19"
description: "My rollercoaster journey making a hackathon project to detect plagiarism in hackathon submissions."
hidden: false
---

## How did we get here?

I love hackathons, have been to many hackathons, and even help run a big one called [DeltaHacks](https://deltahacks.com).

This weekend, I went to [HawkHacks](https://hawkhacks.ca/) to hack on something. Usually my team and I spend hours brainstorming ideas, but this time was different. We knew what we wanted to do.

After the end of the last DeltaHacks, we realized a big mistake in our judging process - we had given prizes to several teams who were gaming the system. Hackathons are supposed to be a fun way for people to network and build something cool with the incentive of prizes, but these incentives invite bad actors that want to farm the awards. Bad actors that recycle the same project with a different name across hackathons to win prizes. This was a tragedy and we needed a solution.

## Well what do we do now?

To deal with this, team and I quickly decided to make [Integrity](https://github.com/Shivermist/integrity), a tool that scans Devpost project galleries and flags projects suspected for foul play. There two general markers that generally indicated foul play in a submission:

1. The team submitting the project has previous project with the same/very similar idea.
2. Suspicious GitHub activity, such as:
   - only 2-3 commits over the entire weekend
   - many commits before the hackathon start date
   - over 4 contributors on the repository

Checking for the GitHub markers is easy. We just used [GitPython](https://gitpython.readthedocs.io/en/stable/intro.html) and ran some checks on their submitted repo. But you're here to read about the "AI", so here we go.

## Embeddings are weird

To check if a project is the same as some previous submission, we scraped all the team member's previous projects. The goal was to compare the two to somehow figure out if they are the same and an indicator of foul play.

My first idea was to use something like [sentence similarity](https://huggingface.co/tasks/sentence-similarity) over two project descriptions, find the cosine distance between the embeddings, and find a threshold to denote if they are similar. I tried two models for this:

- [sentence-transformers/all-mpnet-base-v2](https://huggingface.co/sentence-transformers/all-mpnet-base-v2)
- [sentence-transformers/all-roberta-large-v1](https://huggingface.co/sentence-transformers/all-roberta-large-v1)

First, I found that the distance magnitude was relatively the same between all comparisons. After some investigation, the problem was clear; Devpost has a template for project submissions, each of which usually lists "Things we used", "Challenges we faced" etc. To no surprise, most of the projects from the same people have the same tech stack and same challenges over multiple projects. To solve this, I trimmed the descriptions to just focus on the "Inspiration" and "What it does" section so we can really focus on the _idea_ of the project.

Unfortunately, the results were still inconsistent. We couldn't get 25% accuracy on classifying projects as the same idea or not. I needed something larger.

## LLMs Suck

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">this is so real why can&#39;t you give me a simple yes/no answer <a href="https://t.co/KMD6rYnA2d">https://t.co/KMD6rYnA2d</a></p>&mdash; Krish (@n0tkr1sh) <a href="https://twitter.com/n0tkr1sh/status/1792038716732555456?ref_src=twsrc%5Etfw">May 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I wanted this to be free project, so I did not use OpenAI models. [Ollama](https://ollama.com/) is an amazing tool to run LLMs locally on my Macbook. Overall, I experimented with 3 models:

- Mistral 7b (On Ollama)
- Llama3 7b Instruct (On Ollama)
- Gemini Flash

Initially, I started with a basic prompt like so:

```
Project 1: (description)

Project 2: (description)

Respond with yes/no whether these projects are the same idea.
```

This... did not work well. Each LLM would continue talking with some reasoning and not give me a clear yes/no answer. Eventually, I got it to output a yes/no, but the outputs were _always_ yes. So I adjusted the prompt.

```
Project 1: (description)

Project 2: (description)

First, summarize both these projects in 3-4 sentences. Then, tell me if they are similar with your reasoning.

I need to find out if I need to investigate these projects due to plagarism. Are the ideas similar enough to investigate project 1 to be plagiarizing project 2? Respond with yes/no at the end, indicating need for investigation.
```

This worked... sometimes. Gemini output was usually good, but often off. Mistral was unusable and just blabbering. And Llama3 was... confused? Here's an example of the best Llama3 output after trying hundreds of different prompt variations.

![Llama3 confusing output](/assets/i-made-an-ai-app/llama3_is_confused.png)

So.... I gave up on the open-source LLMs. Maybe the 70b models are better, but my laptop doesn't have enough RAM to run those.

## Gemini is awesome

The new Gemini 1.5 Flash model is [free of charge](https://ai.google.dev/pricing). I can use a fast, accurate model to test and run prompts without burning a hole in my wallet, which was awesome. Google's new [AI Studio](https://aistudio.google.com/) is a really nice way to test prompts with the new models. I enjoyed this dev experience, especially the quick API key creation / samples that made it easy to get running in my code.

While this model was better, it still wasn't accurate enough. So after being tired of prompt engineering, I hooked up a basic [DSPy](https://github.com/stanfordnlp/dspy) setup to create a prompt for me. DSPy is mostly for RAG stuff, but it worked surprisingly well. With a new pipeline in DSPy, our accuracy for whether to investigate projects for plagiarism increased significantly.

> **Gemini might be awesome, but GCP is still annoying**
>
> While the model is free, the rate limit on it made it really slow to compare hundreds of projects quickly. I was satisfied with the quality, so I tried linking it to a paid billing account to get a higher quota.... but it was much more complicated than that and in the end I didn't have enough time to actually get the increased quota.

## Putting it all together

So, by the end, I had the ability to:

- Scrape project/hackathon data from Devpost
- Get GitHub repo stats (commit count/num contributors/commit times)
- Get a yes/no answer if there is a very similar / same project that could have been plagiarized

Using all these, my team and I put together a simple [streamlit](https://streamlit.io/) app to show each project and any red flags about them.

![Integrity App](/assets/i-made-an-ai-app/integrity_final_app.jpeg)

## Final thoughts

This was a pretty fun hackathon project, where we built something that works decently well and solves a major problem in hosting hackathons. I learned a lot about embeddings, prompts, DSPy, and the general ecosystem around AI apps. I will probably keep working on improving this project to use it at DeltaHacks next year.

If you want to check out the project, it's open-source on [GitHub](https://github.com/Shivermist/integrity). Feel free to contribute or use it for your own hackathons!
