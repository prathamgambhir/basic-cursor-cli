import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";
import fs from "fs";
import path from "path";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({});

async function read_file({ file_path }) {
  const content = await fs.readFileSync(file_path, "utf-8");
  console.log(`writing in : ${file_path}`);
  return { content };
}

async function write_file({ file_path, content }) {
  await fs.writeFileSync(file_path, content, "utf-8");
  console.log(`writing in : ${file_path}`);
  return { success: true };
}

async function make_folder({ folder_path }) {
  fs.mkdirSync(folder_path, { recursive: true });
  console.log(`made folder : ${folder_path}`);
  return { success: true };
}

const readFileDecleratioin = {
  name: "read_file",
  description: "Read a file.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      file_path: {
        type: Type.STRING,
        description: "The location of the file to read.",
      },
    },
    required: ["file_path"],
  },
};

const writeFileDecleratioin = {
  name: "write_file",
  description: "write content in the file",
  parameters: {
    type: Type.OBJECT,
    properties: {
      file_path: {
        type: Type.STRING,
        description: "The location of the file to write in or create.",
      },
      content: {
        type: Type.STRING,
        description: "The content to write in the file.",
      },
    },
    required: ["file_path", "content"],
  },
};

const makeFolderDecleratioin = {
  name: "make_folder",
  description: "create a folder/directory.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      file_path: {
        type: Type.STRING,
        description: "The location of the folder/directory to create.",
      },
    },
    required: ["file_path"],
  },
};

const History = [];

const tools = [
  {
    functionDeclarations: [
      readFileDecleratioin,
      writeFileDecleratioin,
      makeFolderDecleratioin,
    ],
  },
];

const toolNames = {
  read_file: read_file,
  write_file: write_file,
  make_folder: make_folder,
};

async function runAgent() {
  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: History,
      config: {
        systemInstruction: `
          You are Cursor-CLI, an expert web developer AI agent. Your goal is to build fully functional, responsive, and modern websites using HTML, CSS, and JavaScript based on user requests.

          ### OPERATIONAL RULES:
          1.  **Project Structure**: Always organize files logically. Create a dedicated folder for the project if one doesn't exist.
          2.  **File Creation**: Use "make_folder" for directories and "write_file" for code.
          3.  **Linking**: Ensure all HTML files correctly link to their respective CSS ("<link href="...">") and JS ("<script src="...">") files.
          4.  **Completeness**: Do not provide snippets or placeholders like "// rest of code here". Write the entire functional file.
          5.  **Iteration**: If a user asks for a change, use "read_file" to understand the existing code before proposing an update.

          ### TECHNICAL GUIDELINES:
          - Use modern semantic HTML5 tags.
          - Use Flexbox or CSS Grid for layouts.
          - Ensure the designs are responsive (mobile-friendly).
          - When using external assets (like Google Fonts or FontAwesome), include the CDN links in the HTML.

          ### EXECUTION FLOW:
          1. Plan the file structure.
          2. Create the necessary directories.
          3. Write the CSS and JS files first.
          4. Finally, write the HTML file, ensuring all links to scripts and styles are accurate.
        `,
        tools: tools ,
      },
    });

    if (response.functionCalls?.length > 0) {
      for (const functionCall of response.functionCalls) {
        const { name, args } = functionCall;

        console.log(`Name of function : ${name}`);
        console.log(`Args of function : ${JSON.stringify(args)}`);

        History.push({
          role: "model",
          parts: [
            {
              functionCall: functionCall,
            },
          ],
        });
        const toolResponse = await toolNames[name](args);

        History.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: name,
                response: {
                  result: toolResponse,
                },
              },
            },
          ],
        });
      }
    } else {
      console.log(response.text);
      break;
    }
  }
}

while (true) {
  const question = readlineSync.question("Ask me anything --> ");

  if (question === "exit") {
    break;
  }

  History.push({
    role: "user",
    parts: [{ text: question }],
  });

  await runAgent();
}
