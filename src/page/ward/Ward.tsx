import { useState } from "react";
import { HeaderFooter } from "../Header_Footer/HeaderFooter";
import "./Ward.scss";
import { Room } from "./Room/Room";
export const Ward = () => {
  const [roomVisible, setRoomVisible] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number>(0);

  const roomClick = (id: number) => {
    setRoomVisible(true);
    setRoomId(id);
  };

  return (
    <HeaderFooter>
      {roomVisible ? (
        <Room setRoomVisible={setRoomVisible} roomId={roomId} />
      ) : (
        <div className="main">
          <header className="ward-header">
            <h1>병동 테스트</h1>
          </header>
          <section className="ward-sections">
            <div className="room" onClick={() => roomClick(1)}>
              <h2>병실 1</h2>
              <p>테스트</p>
            </div>
            <div className="room" onClick={() => roomClick(2)}>
              <h2>병실 2</h2>
              <p>테스트</p>
            </div>
            <div className="waiting-room">
              <h2>대기실</h2>
              <p>테스트</p>
            </div>
            <div className="nurse-station">
              <h2>간호 스테이션</h2>
              <p>테스트 개발 진행예정</p>
            </div>
          </section>
        </div>
      )}
    </HeaderFooter>
  );
};
