import React from "react";
import { Container} from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <div className="copyright">
          © {new Date().getFullYear()}
          <a> Land Registry</a>{" "}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
