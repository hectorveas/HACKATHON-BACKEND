import model from "./code.schema";
import { Code } from "@models/code.model";


async function getCodes(): Promise<Code[]>{
  return model.find();
}

async function getCode(id: string): Promise<Code | null>{
  return model.findOne({ _id: id });
}

async function addCode(code: Code): Promise<Code>{
  return model.create<Code>(code);
}

async function updateCode(id: string, code: Partial<Code>): Promise<Code | null>{
  return model.findOneAndUpdate({ _id: id }, code);
}

async function deleteCode(id: string): Promise<Code | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getCodes, getCode, addCode, updateCode, deleteCode }
