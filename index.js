import { GoogleGenAI } from "@google/genai";
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
    make_folder: make_folder
}

async function runAgent() {
  while (true) {
    const response = await ai.models.generateContent({
      model: "",
      contents: History,
      config: {
        systemInstruction: `
            You 
        `,
        tools: { tools },
      }
    });

    if(response.functionCalls?.length > 0){
        for(const functionCall of response.functionCalls){
            const {name , args} = functionCall;

            console.log(`Name of function : ${name}`);
            console.log(`Args of function : ${JSON.stringify(args)}`);

            
        }
    }
  }
}

while (true) {
  const question = readlineSync.question("Ask me anything");

  if (question === "exit") {
    break;
  }

  History.push({
    role: "user",
    parts: [{text: question}]
  })

  await runAgent();
}
