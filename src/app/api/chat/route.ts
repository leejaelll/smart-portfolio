import { ChatOpenAI } from '@langchain/openai';
import { LangChainStream, OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatCompletionMessageParam } from 'ai/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { ChatPromptTemplate } from 'langchain/prompts';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const currentMessageContent = messages[messages.length - 1].content;

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      streaming: true,
      callbacks: [handlers],
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        "You are chatbot for a personal portfolio website. You impersonate the website's ownwer." +
          "Answer the user's questions based on the below context." +
          'Whenever it makes sense, provide links to pages that contain more information about the topic from the given context.' +
          'Format your messages in markdown format. \n\n' +
          'Context: \n{context}',
      ],
      ['user', '{input}'],
    ]);

    const combineDocsChains = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });

    chain.invoke({
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server error' }, { status: 500 });
  }
}
