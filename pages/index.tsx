import { useState } from "react";
import {
  Button,
  Container,
  Form,
  Col,
  Row,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import * as prismStyle from "react-syntax-highlighter/dist/cjs/styles/prism";
import CodeField from "../components/codeField";
import langs from "../utils/langs";
import { useRouter } from "next/router";
const styles = {
  ...prismStyle,
};

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState<string>(
    "function foo() {\n  return 4 <= 20 ? 'bar' : 'baz';\n}\n\nconsole.log(foo());"
  );
  const [codeStyle, setCodeStyle] = useState<string>("vscDarkPlus");
  const [language, setLanguage] = useState<string>("javascript");
  const [preview, setPreview] = useState<boolean>(true);
  const [title, setTitle] = useState("my code snippet");
  const newLines = input.split(/\r\n|\r|\n/).length;
  return (
    <Container className="mt-4">
      <FloatingLabel label="Title">
        <FormControl
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FloatingLabel>

      {!preview ? (
        <Form.Control
          className="mt-2 mb-2"
          as="textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={newLines}
          wrap="off"
        />
      ) : (
        <CodeField language={language} style={codeStyle} input={input} />
      )}
      <Row className="mb-2">
        <Col>
          <FloatingLabel label="Language">
            <Form.Control
              as="select"
              defaultValue="javascript"
              onChange={(e) => setLanguage(e.target.value)}
            >
              {langs.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </Form.Control>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="Theme">
            <Form.Control
              as="select"
              defaultValue="vscDarkPlus"
              onChange={(e) => {
                setCodeStyle(e.target.value);
              }}
            >
              {Object.keys(styles).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Form.Control>
          </FloatingLabel>
        </Col>
      </Row>
      <Button className="me-2" onClick={() => setPreview(!preview)}>
        {preview ? "Edit" : "Preview"}
      </Button>

      <Button
        onClick={() => {
          axios
            .post("/api", {
              title: title,
              language: language,
              theme: codeStyle,
              content: input,
            })
            .then((res) => {
              navigator.clipboard.writeText(
                `https://snips.eulentier.de/${res.data.hash}`
              );
              router.push(`/${res.data.hash}`);
            })
            .catch((e) => {
              console.error(e);
            });
        }}
      >
        Share
      </Button>
    </Container>
  );
}
