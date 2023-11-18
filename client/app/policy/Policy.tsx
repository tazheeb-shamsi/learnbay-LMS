import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className=" mb-20 text-black dark:text-white">
      <div className="w-[95%] !800px:w-[82%] m-auto py-2 px-3 text-white my-10">
        <h1 className={`${styles.title} !text-center pt-2 800px:!text-[45px]`}>
          Policy Terms & <span className="text_animation">Conditions</span>
        </h1>
      </div>
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            One of our main priorities at the Becodemy website (learnbay.com) is
            the privacy of our user&apos;s information. This document contains
            detailed information about what information we collect from the
            Becodemy website and how we use it.
            <br />
            If you have any questions or need more information about our privacy
            policy, please do not hesitate to contact us.
            <br />
            This Privacy Policy applies only to our online activities and is
            valid for information shared by our website visitors and/or
            collected from the Becodemy website. This policy does not apply to
            any information collected offline or through channels other than
            this website.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">Consent</li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            By using our website, you are hereby deemed to be agreeing to our
            Privacy Policy and Terms.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">
            What information do we collect?
          </li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            When we ask you to provide your personal information on the Website,
            you will be made clear as to why you are being asked to provide it.
            <br />
            If you contact us directly, we may collect additional information
            about you such as your name, email address, phone number, content of
            the communication and/or any attachments or other information you
            send us. <br />
            When you open an account on our website, you are required to provide
            some personal information such as your name, email address, photo,
            mobile number, Discord username, address, etc. In addition, we may
            subsequently request additional information on an as-needed basis
            with your permission. We do not share your information with anyone
            without your permission and maintain the confidentiality of
            information.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">
            Confidentiality of personal passwords
          </li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            The password you are asked to enter to login when opening an account
            on our website is encrypted and stored securely in our database. As
            a result, we cannot see the original content of your password. So
            the privacy of your password is properly protected on our website.
            Also, to protect the privacy of your password, please never share
            your password with anyone. If you think your password has been
            compromised by someone else, change your password from the website
            immediately. If you somehow fail to change the password, contact our
            support.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">Cookies</li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Like all other websites, the Becodemy website and browser use
            cookies (&apos;cookies&apos;). These cookies are used to store information
            including visitor preferences and website pages that the visitor has
            accessed or visited. The information is used to optimize users&apos;
            experience by customizing the content of our web pages based on
            visitors&apos; browser type and/or other information.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
