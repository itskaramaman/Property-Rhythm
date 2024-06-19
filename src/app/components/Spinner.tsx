"use client";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div>
      <ClipLoader
        color="#E2725B"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Loading;
