# Cursor-CLI

An AI-powered command-line interface for building modern, responsive websites using Google Gemini.

## Overview

Cursor-CLI is an expert web development AI agent that transforms your website ideas into fully functional, responsive, and modern web projects through natural language conversations in your terminal.

## Features

- **AI-Powered Development**: Uses Google Gemini 2.5 Flash for intelligent code generation
- **Smart Workflow**: Follows best practices with structured development approach
- **File Operations**: Reads, writes, and creates folders/directories
- **Modern Websites**: Builds responsive HTML5 sites with Flexbox/CSS Grid
- **Complete Projects**: Delivers full codebases, not snippets or placeholders

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **AI Model**: Google Gemini 2.5 Flash
- **Dependencies**:
  - `@google/genai` - Google GenAI SDK
  - `dotenv` - Environment variable management
  - `readline-sync` - Synchronous user input

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cursor-cli

# Install dependencies
npm install
```

## Usage

1. **Configure Environment**
   Create a `.env` file with your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

2. **Run the CLI**
   ```bash
   node index.js
   ```

3. **Start Building**
   Simply describe what you want to build:
   ```
   Ask me anything --> Create a portfolio website
   Ask me anything --> Build an e-commerce landing page
   Ask me anything --> Make a weather app
   ```

4. **Exit**
   ```
   Ask me anything --> exit
   ```

## How It Works

Cursor-CLI follows a structured development workflow:

1. **Planning**: Analyzes requirements and plans file structure
2. **Directory Creation**: Creates necessary project folders
3. **Asset Development**: Writes CSS and JavaScript files first
4. **HTML Assembly**: Creates HTML files with proper resource linking
5. **Delivery**: Provides complete, ready-to-use projects

## 📁 Project Structure

```
cursor-cli/
├── index.js           # Main CLI application
├── package.json       # Project dependencies
├── calculator/        # Example project
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## Technical Guidelines

All generated projects follow these standards:

- **Semantic HTML5** for better accessibility and SEO
- **Flexbox & CSS Grid** for modern layouts
- **Responsive Design** for mobile-first experience
- **External Assets** via CDN (Google Fonts, FontAwesome, etc.)
- **Clean Code** with proper structure and comments

## Available Tools

The AI agent can perform these operations:

| Tool | Description |
|------|-------------|
| `read_file` | Read existing file contents |
| `write_file` | Create or modify files |
| `make_folder` | Create directories |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

ISC License


