# DAYFLOW

Design your day. Live your rhythm.

DAYFLOW is an interactive React daily planning form where user input dynamically transforms an animated environment from sunrise to night.

## Project Concept

The project turns a simple five-step everyday-life form into a visual story. A user's wake time, mission, energy, three planned moments, and wind-down time become React state that controls an animated sky, landscape, timeline, and short day simulation.

## Features

- Five-step controlled React form
- Wake-up and wind-down sliders that move the sun, moon, stars, and landscape lighting
- Live mission note and category selection
- Three intentional daily moments with chronological validation
- 10-15 second cinematic day simulation
- Final manual time scrubber
- Saved completed plan using `localStorage`
- Responsive layout and accessible form controls

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Motion for React
- SVG
- localStorage

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## How The Form Works

User Input  
↓  
DayPlan React State  
↓  
Environment Engine  
↓  
Animated Sky  
↓  
Day Simulation
