import { PropsWithChildren, useEffect, useState } from "react";
import { Footer } from "../home/footer/footer";
import { Header } from "../home/header/header";
import "../home/home.scss";

export const HeaderFooter = ({ children }: PropsWithChildren) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newScale = 1; // 기본 스케일 값

      // 1090에서 660까지 10px씩 감소하면서 스케일 값을 조정
      for (let i = 1090; i > 200; i -= 10) {
        if (width < i && width >= i - 10) {
          newScale = 1 - (1090 - i) / 1200; // 1090에서 시작하여 0.01씩 감소
          break; // 조건이 맞는 경우 반복 종료
        }
      }

      setScale(newScale);
    };

    // 초기 크기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home">
      <div className="header">
        <Header />
      </div>
      <div
        className="body"
        style={{ transformOrigin: "top left", transform: `scale(${scale})` }}
      >
        {children}
      </div>
      <div className="footer">
        <Footer language={true} />
      </div>
    </div>
  );
};
