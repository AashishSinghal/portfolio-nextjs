import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";

const WorkPage = () => {
  return (
    <Layout title="Work | Aashish - Portfolio">
      <h1>Work</h1>
      <p>This is the works page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default WorkPage;
