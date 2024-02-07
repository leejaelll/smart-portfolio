import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { DocumentInterface } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function generateEmbeddings() {
  const loader = new DirectoryLoader(
    'src/app/',
    {
      '.tsx': (path) => new TextLoader(path),
    },
    true
  );

  const docs = (await loader.load())
    .filter((doc) => doc.metadata.source.endsWith('page.tsx'))
    .map((doc): DocumentInterface => {
      const url =
        doc.metadata.source
          .replace(/\\/g, '/')
          .split('/src/app')[1]
          .split('/page.')[0] || '/';

      /**
       * Trimmed page content without import statements, class names, and leading whitespace.
       */
      const pageContentTrimmed = doc.pageContent
        .replace(/^import.*$/gm, '')
        .replace(/ className=([""]).*?\1| className={.*?}/g, '')
        .replace(/^\s*[\r]/gm, '')
        .trim();
      return {
        pageContent: doc.pageContent,
        metadata: { url },
      };
    });

  const splitter = RecursiveCharacterTextSplitter.fromLanguage('html');
  const splitDocs = await splitter.splitDocuments(docs);
  console.log(splitDocs);
}

generateEmbeddings();
