# Grareco Editor

Grareco Editor is a web-based HTML editor with a live preview feature. It allows users to write HTML code and see the rendered output in real-time. Additionally, it supports basic direct editing of text content within the preview pane, with changes synchronized back to the HTML source code.

This project is built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **HTML Editor**: Utilizes CodeMirror for a rich editing experience, including syntax highlighting and auto-tag closing.
- **Live Preview**: Instantly renders the HTML code as it's being written.
- **Preview-to-Editor Sync**: Basic text content (in elements like `<p>`, `<h1>-<h6>`, `<li>`) can be edited directly in the live preview, and these changes will update the source HTML in the editor.
- **Styling**: Uses Tailwind CSS for a clean and modern interface.

## Project Structure

The project is contained within the `grareco-editor` directory.

```
grareco-editor/
├── public/                     # Static assets (currently minimal)
├── src/                        # Source files
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── globals.css         # Global styles and Tailwind directives
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Main editor page component
│   └── components/             # Reusable React components
│       ├── HtmlEditor.tsx      # CodeMirror based HTML editor component
│       └── LivePreview.tsx     # Live preview component with edit-in-preview logic
├── .gitignore
├── eslint.config.mjs           # ESLint configuration
├── next-env.d.ts               # Next.js TypeScript environment declarations
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration (for Tailwind)
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- npm or yarn

### Setup

1.  **Clone the repository (or ensure you are in the `grareco-editor` directory if it's part of a larger repo).**

2.  **Navigate to the project directory:**
    ```bash
    cd grareco-editor
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

Once dependencies are installed, you can start the development server:

```bash
npm run dev
# or
# yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Known Limitations

- The preview-to-editor synchronization is basic. Complex structural changes (e.g., adding or deleting elements, modifying attributes) directly in the preview might not be robustly handled or could lead to unexpected HTML.
- `<script>` tags included in the HTML will execute in the live preview. Be cautious if pasting untrusted HTML.
- The application is not yet optimized for responsiveness on smaller screens.
```
