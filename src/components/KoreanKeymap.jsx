import React, { useState, useEffect } from "react";
import "../css/KeyboardLayout.css";

export const KoreanKeymap = () => {
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [showCapsLock, setShowCapsLock] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [capsLockPressed, setCapsLockPressed] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const isAlphabetic = (char) => /^[ㄱ-ㅎㅏ-ㅣ]$/.test(char);

  const shiftedhangul = {
    ㅂ: "ㅃ",
    ㅈ: "ㅉ",
    ㄷ: "ㄸ",
    ㄱ: "ㄲ",
    ㅅ: "ㅆ",
    ㅐ: "ㅒ",
    ㅔ: "ㅖ",
  };

  const shiftedSpecialChars = {
    1: "!",
    2: "@",
    3: "#",
    4: "$",
    5: "%",
    6: "^",
    7: "&",
    8: "*",
    9: "(",
    0: ")",
    "-": "_",
    "=": "+",
    "`": "~",
    "[": "{",
    "]": "}",
    "\\": "|",
    ";": ":",
    "'": '"',
    ",": "<",
    ".": ">",
    "/": "?",
  };

  const determineKeyToDisplay = (pressedKey, event) => {
    if (capsLockActive || capsLockPressed) {
      if (isShiftPressed) {
        return shiftedSpecialChars[pressedKey] || pressedKey.toLowerCase();
      } else {
        return pressedKey.toUpperCase();
      }
    } else {
      if (isShiftPressed) {
        return shiftedSpecialChars[pressedKey] || pressedKey.toUpperCase();
      }
      return pressedKey;
    }
  };

  const handleCapsLock = (key, isKeyDown) => {
    if (key === "CapsLock") {
      setCapsLockActive((prev) => (isKeyDown ? !prev : prev));
      setCapsLockPressed((prev) => (isKeyDown ? !prev : prev));
      setShowCapsLock(isKeyDown);
      handleKeyUpdate(isKeyDown, "Caps Lock");
    }
  };

  const handleToggleKey = (key, currentKey, event) => {
    if (currentKey === key && !pressedKeys.has(key)) {
      handleKeyUpdate(true, key);
    } else if (currentKey !== key && pressedKeys.has(key)) {
      handleRemoveKey(key);
    }
    currentKey = "";
  };

  const handleKeyUpdate = (isKeyDown, key) => {
    if (isKeyDown && isAlphabetic(key)) {
      handleSetPressedKeys(key);
    } else {
      handleRemoveKey(key);
      // 캡스락 키를 눌렀을 때도 pressedKeys에 추가되어 있는 경우를 처리
      if (capsLockActive || capsLockPressed) {
        handleRemoveKey(determineKeyToDisplay(key));
      }
    }
  };

  const handleKeyDown = (event) => {
    const pressedKey = event.key;

    setIsShiftPressed(event.shiftKey);

    // 캡스락 대소문자 변환
    handleCapsLock(pressedKey, true);

    // 탭 키에 대한 토글 처리
    handleToggleKey("Tab", pressedKey, event);

    // 나머지 키 처리
    if (pressedKey !== "Tab") {
      const keyToDisplay = determineKeyToDisplay(pressedKey);
      handleKeyUpdate(true, keyToDisplay);
      if ((capsLockActive || event.shiftKey) && isAlphabetic(pressedKey)) {
        handleKeyUpdate(true, pressedKey.toUpperCase());
      }
    }
  };

  const handleKeyUp = (event) => {
    const releasedKey = event.key;

    // 캡스락 키 및 탭 키에 대한 처리
    handleCapsLock(releasedKey, false);
    handleToggleKey("Tab", releasedKey);

    // 나머지 키 처리
    if (releasedKey !== "Tab") {
      handleKeyUpdate(false, determineKeyToDisplay(releasedKey));
    }

    setIsShiftPressed(event.shiftKey);
  };

  const handleSetPressedKeys = (key) => {
    setPressedKeys((prevKeys) => new Set(prevKeys).add(key));
  };

  const handleRemoveKey = (key) => {
    setPressedKeys((prevKeys) => {
      const updatedKeys = new Set(prevKeys);
      updatedKeys.delete(key);
      return updatedKeys;
    });
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 키보드 레이아웃 컴포넌트 렌더링
  return (
    <div className="keyboard-layout">
      <div className="keyboard-row">
        <div className={`keyboard-key ${pressedKeys.has("`") && "pressed"}`}>
          {determineKeyToDisplay("`")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("1") && "pressed"}`}>
          {determineKeyToDisplay("1")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("2") && "pressed"}`}>
          {determineKeyToDisplay("2")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("3") && "pressed"}`}>
          {determineKeyToDisplay("3")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("4") && "pressed"}`}>
          {determineKeyToDisplay("4")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("5") && "pressed"}`}>
          {determineKeyToDisplay("5")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("6") && "pressed"}`}>
          {determineKeyToDisplay("6")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("7") && "pressed"}`}>
          {determineKeyToDisplay("7")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("8") && "pressed"}`}>
          {determineKeyToDisplay("8")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("9") && "pressed"}`}>
          {determineKeyToDisplay("9")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("0") && "pressed"}`}>
          {determineKeyToDisplay("0")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("-") && "pressed"}`}>
          {determineKeyToDisplay("-")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("=") && "pressed"}`}>
          {determineKeyToDisplay("=")}
        </div>
        <div
          className={`keyboard-key ${
            pressedKeys.has("Backspace") && "pressed"
          }`}
        >
          Backspace
        </div>
      </div>
      <div className="keyboard-row">
        <div className={`keyboard-key ${pressedKeys.has("Tab") && "pressed"}`}>
          TAB
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅂ") && "pressed"}`}>
          {determineKeyToDisplay("ㅂ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅈ") && "pressed"}`}>
          {determineKeyToDisplay("ㅈ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㄷ") && "pressed"}`}>
          {determineKeyToDisplay("ㄷ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㄱ") && "pressed"}`}>
          {determineKeyToDisplay("ㄱ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅅ") && "pressed"}`}>
          {determineKeyToDisplay("ㅅ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅛ") && "pressed"}`}>
          {determineKeyToDisplay("ㅛ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅕ") && "pressed"}`}>
          {determineKeyToDisplay("ㅕ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅑ") && "pressed"}`}>
          {determineKeyToDisplay("ㅑ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅐ") && "pressed"}`}>
          {determineKeyToDisplay("ㅐ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅔ") && "pressed"}`}>
          {determineKeyToDisplay("ㅔ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("[") && "pressed"}`}>
          {determineKeyToDisplay("[")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("]") && "pressed"}`}>
          {determineKeyToDisplay("]")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("\\") && "pressed"}`}>
          {determineKeyToDisplay("\\")}
        </div>
      </div>
      <div className="keyboard-row">
        <div
          className={`keyboard-key ${
            capsLockPressed || capsLockActive ? "pressed" : ""
          }`}
        >
          Caps Lock
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅁ") && "pressed"}`}>
          {determineKeyToDisplay("ㅁ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㄴ") && "pressed"}`}>
          {determineKeyToDisplay("ㄴ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅇ") && "pressed"}`}>
          {determineKeyToDisplay("ㅇ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㄹ") && "pressed"}`}>
          {determineKeyToDisplay("ㄹ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅎ") && "pressed"}`}>
          {determineKeyToDisplay("ㅎ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅗ") && "pressed"}`}>
          {determineKeyToDisplay("ㅗ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅓ") && "pressed"}`}>
          {determineKeyToDisplay("ㅓ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅏ") && "pressed"}`}>
          {determineKeyToDisplay("ㅏ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅣ") && "pressed"}`}>
          {determineKeyToDisplay("ㅣ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has(";") && "pressed"}`}>
          {determineKeyToDisplay(";")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("'") && "pressed"}`}>
          {determineKeyToDisplay("'")}
        </div>
        <div
          className={`keyboard-key ${pressedKeys.has("Enter") && "pressed"}`}
        >
          Enter
        </div>
      </div>
      <div className="keyboard-row">
        <div
          className={`keyboard-key ${pressedKeys.has("Shift") && "pressed"}`}
        >
          Shift
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅋ") && "pressed"}`}>
          {determineKeyToDisplay("ㅋ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅌ") && "pressed"}`}>
          {determineKeyToDisplay("ㅌ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅊ") && "pressed"}`}>
          {determineKeyToDisplay("ㅊ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅍ") && "pressed"}`}>
          {determineKeyToDisplay("ㅍ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅠ") && "pressed"}`}>
          {determineKeyToDisplay("ㅠ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅜ") && "pressed"}`}>
          {determineKeyToDisplay("ㅜ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("ㅡ") && "pressed"}`}>
          {determineKeyToDisplay("ㅡ")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has(",") && "pressed"}`}>
          {determineKeyToDisplay(",")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has(".") && "pressed"}`}>
          {determineKeyToDisplay(".")}
        </div>
        <div className={`keyboard-key ${pressedKeys.has("/") && "pressed"}`}>
          {determineKeyToDisplay("/")}
        </div>
        <div
          className={`keyboard-key ${pressedKeys.has("Shift") && "pressed"}`}
        >
          Shift
        </div>
      </div>
      <div className="keyboard-row">
        <div
          className={`keyboard-key ${pressedKeys.has("Control") && "pressed"}`}
        >
          Ctrl
        </div>
        <div className={`keyboard-key ${pressedKeys.has("Alt") && "pressed"}`}>
          Alt
        </div>
        <div className={`keyboard-key ${pressedKeys.has(" ") && "pressed"}`}>
          Space
        </div>
        <div className={`keyboard-key ${pressedKeys.has("Alt") && "pressed"}`}>
          Alt
        </div>
        <div
          className={`keyboard-key ${pressedKeys.has("Control") && "pressed"}`}
        >
          Ctrl
        </div>
      </div>
    </div>
  );
};
