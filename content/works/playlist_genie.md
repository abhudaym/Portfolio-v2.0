---
title: "PlaylistGenie: AI-Powered Playlists from Just One Prompt"
description: "How I built an AI Spotify wrapper in a weekend that turns \"late-night road trip vibes\" into the perfect playlist in seconds"
thumbnail: "/images/works/pg_2.png"
date: "2025-08-09"
image: "/images/works/pg_2.png"
---
## The Problem: 20 Minutes to Find the Right Song

You open Spotify thinking *"I want some upbeat gym tracks"* and end up in playlist purgatory—jumping between auto-generated lists, skipping songs that don't match your vibe, wondering why Spotify thinks you want death metal for your morning jog.

**The personal trigger:** I'm a huge fan of Jeremy Zucker and Lauv. I had tons of their songs scattered across my library, but I didn't want to spend 30 minutes manually hunting through my 2000+ saved tracks to create the perfect Jeremy + Lauv playlist.

I just wanted to say *"Give me a chill Jeremy Zucker and Lauv vibe"* and have AI automatically pull the best tracks from my library. Why should I do the boring work when AI could understand exactly what I meant?

**The bigger pain:** We have thousands of playlists but never the one we want *right now*. Manual playlist creation is tedious, and Spotify's search gives us random songs outside our taste.

## The Solution: One Prompt, Perfect Playlist

I built **PlaylistGenie** in a weekend—an AI-powered Spotify wrapper that transforms a single text prompt into a curated playlist in seconds.

**How it works:**
- Describe your vibe: *"late-night road trip"*, *"Bollywood disco era"*, *"focus beats for coding"*
- Choose playlist size (10, 20, 50 songs)
- Pick **Library Mode** (only your saved tracks) or **Discovery Mode** (global catalog)

**The magic:** It feels like telling a friend what you're in the mood for and getting the perfect playlist instantly.

### Live Demo
![PlaylistGenie Screenshot](/images/works/pg_1.png)
![PlaylistGenie Screenshot](/images/works/pg_3.png)

## How It Works

Simple concept: Type what you're feeling, get the perfect playlist instantly.

**The Experience:**
- Enter a vibe: *"chill Jeremy Zucker and Lauv vibes"*, *"late-night road trip"*, *"focus beats for coding"*
- Choose playlist size and whether to stick to your library or explore new music
- AI analyzes your prompt, understands the mood, and curates the perfect mix
- Playlist appears in your Spotify account, ready to play

**The magic:** It feels like having a friend who knows your music taste perfectly and can instantly create exactly what you need.

## Technical Implementation

**Frontend (React):**
- Minimal interface: prompt input, mode toggle, size selector
- Real-time playlist preview with Spotify embed
- One-click save to user's Spotify account

**Backend (FastAPI):**
- Spotify OAuth integration for secure API access
- Async processing for fast playlist generation
- RESTful endpoints for playlist operations

**AI Layer:**
- Natural language processing for mood analysis
- Semantic matching between prompts and song metadata
- Smart curation algorithms for playlist flow

## Technical Implementation

**Frontend (React):**
- Clean, minimal interface with prompt input and playlist preview
- Mode toggle for Library vs Discovery selection
- Spotify embed integration for immediate playback

**Backend (FastAPI):**
- Spotify OAuth 2.0 integration for secure API access
- Async processing for real-time playlist generation
- RESTful endpoints for playlist management

**AI Processing:**
- Gemini API for natural language understanding and mood analysis
- Smart filtering algorithms for track selection based on AI insights
- Semantic matching between user prompts and song metadata

**Core Technologies:** React, Python FastAPI, Spotify Web API, Gemini API, Docker

*Note: Currently in development mode - requires Spotify developer approval for public access.*

**Want early access?** If you're interested in trying PlaylistGenie, shoot me an email at [abhuday.mishra@hotmail.com](mailto:abhuday.mishra@hotmail.com) and I can add you to the beta list!

---

## 🚀 Explore More Projects

This AI-Spotify integration showcases my approach to combining APIs with intelligent processing. 

[**See All Projects →**](https://abhudaym.in)

---

**Tech Stack:** React, Python FastAPI, Spotify API, AI/NLP, Docker  
**Source:** [https://github.com/abhudaym/playlist_genie](https://github.com/abhudaym/playlist_genie)

**Hosted here:** [https://playlist-genie-beta.vercel.app/](https://playlist-genie-beta.vercel.app/)
