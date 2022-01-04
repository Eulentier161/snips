import CodeField from "../components/codeField";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
  const router = useRouter();
  const { posthash } = router.query;
  const [apiResponse, setApiResponse] = useState({
    title: "",
    language: "",
    content: "",
    theme: "",
    hash: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posthash !== undefined) {
      axios
        .get(`/api?hash=${posthash}`)
        .then((res) => {
          setApiResponse(res.data);
          setLoading(false);
        })
        .catch((e) => console.error(e));
    }
  }, [posthash]);
  if (loading) {
    return <></>;
  } else if (apiResponse.content === undefined) {
    return (
      <Container>
        <h1 className="text-center">404</h1>
        <CodeField
          style="vscDarkPlus"
          language="javascript"
          input='console.log("Page not Found!")'
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <h1 className="text-center">{apiResponse.title}</h1>
        <CodeField
          style={apiResponse.theme}
          language={apiResponse.language}
          input={apiResponse.content}
        />
      </Container>
    );
  }
}
