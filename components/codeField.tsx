import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prismStyle from "react-syntax-highlighter/dist/cjs/styles/prism";
const styles = {
  ...prismStyle,
};

export default function CodeField({
  language,
  style,
  input,
}: {
  language: string;
  style: string;
  input: string;
}) {
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      language={language}
      //@ts-ignore
      style={styles[style]}
      codeTagProps={{ style: { fontFamily: "Fira Code" } }}
    >
      {input}
    </SyntaxHighlighter>
  );
}
