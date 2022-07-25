import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../../component/navbar/Navbar";
import Connect from "../../component/modal/Connect";
import Footer from "../../component/footer/Footer";

export default class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toogleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>NFT PRINT</title>
          <meta name="title" content="NFT PRINT" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="NFT PRINT" />
        </Helmet>

        <div className="overflow-hidden bg__black min-height-100 position-relative">
          <img
            src={"../../images/sdasdasd.png"}
            className="path__15 d-none d-sm-block"
            alt=""
          />
          <img
            src={"../../images/Group 19308.png"}
            className="path__19 d-sm-none d-block"
            alt=""
          />
          <img src={"../../images/safsdfsd.png"} className="path__16" alt="" />
          <img
            src={"../../images/smoothcorner.png"}
            className="path__17"
            alt=""
          />
          <img src={"../../images/gnfhgjk.png"} className="path__18" alt="" />
          <Connect toogleModal={this.toogleModal} modal={this.state.modal} />
          <Navbar toogleModal={this.toogleModal} type="home" />
          <section className="mt__5 position-relative z-2">
            <div className="container">
              <div className="text-center">
                <h1 className="extra-bold font__size--60 text__60-1024 text__60-sm wrapper__title-nft m-0">
                  Terms of Conditions
                </h1>
                <h5 className="font__size--20 text__20-1024 text__20-sm normal color__white opacity__6 mt-4 lh-2">
                  Last updated on January 01, 2021
                </h5>
              </div>
            </div>
          </section>
          <section className="pt-0">
            <div className="container">
              <div className="wrapper__content">
                <h4 className="bold font__size--32 text__32-1024 color__white mb-3">
                  Licensing Policy
                </h4>
                <p className="normal lh-2 font__size--16 text__16-1024 color__white opacity__6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <h5 className="semi-bold font__size--24 text__24-1024 color__white mt-5 mb-3">
                  Here are term lorem ipsum dolor sit amet
                </h5>
                <ul className="list__content normal lh-2 font__size--16 text__16-1024 color__white opacity__6">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </li>
                  <li>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur
                  </li>
                  <li>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet
                  </li>
                </ul>
                <h5 className="semi-bold font__size--24 text__24-1024 color__white mt-5 mb-3">
                  Here are term lorem ipsum dolor sit amet
                </h5>
                <p className="normal lh-2 font__size--16 text__16-1024 color__white opacity__6">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful. Nor again
                  is there anyone who loves or pursues or desires to obtain pain
                  of itself, because it is pain, but because occasionally
                  circumstances occur in which toil and pain can procure him
                  some great pleasure. To take a trivial example, which of us
                  ever undertakes laborious physical exercise, except to obtain
                  some advantage from it? But who has any right to find fault
                  with a man who chooses to enjoy a pleasure that has no
                  annoying consequences,
                </p>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </Fragment>
    );
  }
}
