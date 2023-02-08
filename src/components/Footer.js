import React from "react";
import { instaImg } from "./image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <div className="footer-content">
          <h3
            style={{
              fontSize: "2.3em",
              color: "rgb(231, 62, 118)",
            }}
          >
            friend ferry
          </h3>
          {/* <p>friend ferry is a registered company</p> */}
          <div className="sub" style={{ fontFamily: "Cantarell" }}>
            <div>
              <b>Company</b>
              <p>About</p>
              <p>Blog</p>
            </div>
            <div>
              <b>For Customers</b>
              <p>Code of conduct</p>
              <p>Community</p>
            </div>
            <div>
              <b>For friend ferry</b>

              <p>Business</p>
            </div>
            <div>
              <b>For You</b>
              <p>Privacy</p>
              <p>Security</p>
              <p>Terms</p>
            </div>
            <div>
              <b>Social links</b>

              <div>
                <FontAwesomeIcon icon={faInstagram} size="2x" padding="10px" />
                <FontAwesomeIcon icon={faYoutube} size="2x" />
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
