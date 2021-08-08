import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";

const ToolsPage = () => {
  return (
    <Layout title="Tools | Aashish - Portfolio">
      <h1>Tools</h1>
      <p>This is the tools page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default ToolsPage;
