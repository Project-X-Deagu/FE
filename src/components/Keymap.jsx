import React, { useState, useEffect } from "react";
import "../css/KeyboardLayout.css";

export const Keymap = () => {
  const [keyColor, setKeyColor] = useState("white");
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Shift") {
      setIsShiftPressed(true);
    } else if (event.key === "CapsLock") {
      // Caps Lock 키를 누를 때 대소문자 상태를 변경합니다.
      setIsCapsLockActive(!isCapsLockActive);
    } else if (isShiftPressed || isCapsLockActive) {
      handleShiftKeyPress(event.key);
    } else {
      setKeyColor("lightgray");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Shift") {
      setIsShiftPressed(false);
    } else {
      setKeyColor("white");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isShiftPressed, isCapsLockActive]);

  // Shift 또는 Caps Lock 상태에서 어떻게 키 값을 변경할지 처리하는 함수
  const handleShiftKeyPress = (key) => {
    if (key >= "a" && key <= "z") {
      const shiftedKey = isCapsLockActive ? key : key.toUpperCase();
      console.log(`Shifted key: ${shiftedKey}`);
    } else {
      // 다른 키의 변환 로직을 여기에 추가하세요.
    }
  };

  return (
    <div className="keyboard-layout">
      <div className="keyboard-row">
        <div className="keyboard-key">`</div>
        <div className="keyboard-key">1</div>
        <div className="keyboard-key">2</div>
        <div className="keyboard-key">3</div>
        <div className="keyboard-key">4</div>
        <div className="keyboard-key">5</div>
        <div className="keyboard-key">6</div>
        <div className="keyboard-key">7</div>
        <div className="keyboard-key">8</div>
        <div className="keyboard-key">9</div>
        <div className="keyboard-key">0</div>
        <div className="keyboard-key">-</div>
        <div className="keyboard-key">=</div>
        <div className="keyboard-key">Backspace</div>
      </div>
      <div className="keyboard-row">
        <div className="keyboard-key">TAB</div>
        <div className="keyboard-key">q</div>
        <div className="keyboard-key">w</div>
        <div className="keyboard-key">e</div>
        <div className="keyboard-key">r</div>
        <div className="keyboard-key">t</div>
        <div className="keyboard-key">y</div>
        <div className="keyboard-key">u</div>
        <div className="keyboard-key">i</div>
        <div className="keyboard-key">o</div>
        <div className="keyboard-key">p</div>
        <div className="keyboard-key">[</div>
        <div className="keyboard-key">]</div>
        <div className="keyboard-key">\</div>
      </div>
      <div className="keyboard-row">
        <div className="keyboard-key">Caps Lock</div>
        <div className="keyboard-key">a</div>
        <div className="keyboard-key">s</div>
        <div className="keyboard-key">d</div>
        <div className="keyboard-key">f</div>
        <div className="keyboard-key">g</div>
        <div className="keyboard-key">h</div>
        <div className="keyboard-key">j</div>
        <div className="keyboard-key">k</div>
        <div className="keyboard-key">l</div>
        <div className="keyboard-key">;</div>
        <div className="keyboard-key">'</div>
        <div className="keyboard-key">Enter</div>
      </div>
      <div className="keyboard-row">
        <div className="keyboard-key">Shift</div>
        <div className="keyboard-key">z</div>
        <div className="keyboard-key">x</div>
        <div className="keyboard-key">c</div>
        <div className="keyboard-key">v</div>
        <div className="keyboard-key">b</div>
        <div className="keyboard-key">n</div>
        <div className="keyboard-key">m</div>
        <div className="keyboard-key">,</div>
        <div className="keyboard-key">.</div>
        <div className="keyboard-key">/</div>
        <div className="keyboard-key">Shift</div>
      </div>
      <div className="keyboard-row">
        <div className="keyboard-key">Ctrl</div>
        <div className="keyboard-key">Alt</div>
        <div className="keyboard-key">Spacebar</div>
        <div className="keyboard-key">Alt</div>
        <div className="keyboard-key">Ctrl</div>
        <div className="keyboard-key">Shift</div>
      </div>
    </div>
  );
};
