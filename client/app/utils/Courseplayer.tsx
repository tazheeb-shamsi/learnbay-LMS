import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const Courseplayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  const url = process.env.NEXT_PUBLIC_SERVER_URI;
  console.log("====>", url);
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((response) => {
        setVideoData(response.data);
      });
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData && videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=s5VbYVh8vMnDtUdG`}
          style={{
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            border: 0,
          }}
          allow="encrypted-media"
          allowFullScreen={true}
        ></iframe>
      )}
    </div>
  );
};

export default Courseplayer;
