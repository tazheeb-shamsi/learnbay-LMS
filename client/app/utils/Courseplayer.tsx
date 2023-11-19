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

  useEffect(() => {
    axios
      .post("https://learnbay-lms.onrender.com/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((response) => {
        setVideoData(response.data);
      });
  }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}
    >
      {videoData && videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=s5VbYVh8vMnDtUdG`}
          style={{
            width: "100%",
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
