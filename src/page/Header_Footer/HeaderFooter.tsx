import { PropsWithChildren } from "react";
import { Footer } from "../home/footer/footer";
import { Header } from "../home/header/header";
import "../home/home.scss";

export const HeaderFooter = ({children}:PropsWithChildren) => {
    return (
        <div className="home">
          <div className="header">
            <Header />
          </div>
          <div className="body">
            {children}
          </div>
          <div className="footer">
            <Footer language={true} />
          </div>
        </div>
    );
}