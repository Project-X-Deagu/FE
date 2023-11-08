import { Logo } from "../components/Logo";
import { TextBox } from "../components/TextBox";
import { KeyLayout } from "../components/KeyLayout";
import { Keymap } from "../components/Keymap";
import { LogoArea, TextBoxArea, KeymapContainer } from "../css/style.js";

export const Main = () => {
  return (
    <div>
      {/* 상단 로고 */}
      <LogoArea>
        <Logo></Logo>
      </LogoArea>
      {/* 인풋 창 */}
      <TextBoxArea>
        <TextBox></TextBox>
      </TextBoxArea>
      {/* 키보드 레이아웃 */}
      <KeymapContainer>
        <Keymap></Keymap>
      </KeymapContainer>
      {/* <KeymapContainer>
          <KeyLayout></KeyLayout>
        </KeymapContainer> */}
    </div>
  );
};
