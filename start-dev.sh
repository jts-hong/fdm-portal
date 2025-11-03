#!/bin/bash

# FDM Data Solution Portal - Development Server Starter
# Quick script to start the development server

echo "🚀 Starting FDM Data Solution Portal..."
echo ""

# Check if conda is available
if ! command -v conda &> /dev/null; then
    echo "❌ Conda not found. Please install Anaconda or Miniconda."
    exit 1
fi

# Source conda
source /opt/anaconda3/etc/profile.d/conda.sh

# Activate environment
echo "📦 Activating conda environment: fdm_dsp"
conda activate fdm_dsp

# Navigate to project directory
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Start development server
echo ""
echo "✅ Starting development server..."
echo "🌐 Open your browser to: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "─────────────────────────────────────────"
echo ""

npm run dev

