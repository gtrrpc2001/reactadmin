import { useState } from "react";
import { HeaderFooter } from "../Header_Footer/HeaderFooter";
import "./Ward.scss";
import { Room } from "./Room/Room";
export const Ward = () => {
    const [roomVisible, setRoomVisible] = useState<boolean>(false);

    const roomClick = () => {
        setRoomVisible(true)
    }

  return (
    <HeaderFooter>
       { roomVisible ?
        (<Room setRoomVisible = {setRoomVisible}/>)
        :
        (<div className="main">
        <header className="ward-header">
          <h1>병동 테스트</h1>
        </header>
        <section className="ward-sections">
          <div className="room" onClick={roomClick}>
            <h2>병실 1</h2>
            <p>침대 1, 침대 2</p>
          </div>
          <div className="room">
            <h2>병실 2</h2>
            <p>침대 1, 침대 2</p>
          </div>
          <div className="nurse-station">
            <h2>간호 스테이션</h2>
          </div>
          <div className="waiting-room">
            <h2>대기실</h2>
          </div>
        </section>
        </div>)
       }      
    </HeaderFooter>
  );
};
