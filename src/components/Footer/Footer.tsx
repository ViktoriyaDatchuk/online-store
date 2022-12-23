import "./Footer.css";
import githubImg from "../../assets/img/github.svg";
import rsschoolImg from "../../assets/img/rs_school_js_white.svg";
import { Icon } from "../Icon/Icon";

export function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <ul className="footerList">
          <Icon
            link="https://github.com/ViktoriyaDatchuk"
            image={githubImg}
            className="iconGithub"
          />
          <Icon
            link="https://rs.school/js/"
            image={rsschoolImg}
            className="iconRsschool"
          />
        </ul>
        <p className="footerInfo">Orliner © 2022</p>
      </div>
    </footer>
  );
}
