import React, { useState, useEffect } from "react";
import "../css/KeyboardLayout.css";

export const Keymap = () => {
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [showCapsLock, setShowCapsLock] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [capsLockPressed, setCapsLockPressed] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const isAlphabetic = (char) => /^[a-zA-Z]$/.test(char);

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

  const determineKeyToDisplay = (pressedKey) => {
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

  const handleToggleKey = (key, currentKey) => {
    if (currentKey === key && !pressedKeys.has(key)) {
      handleKeyUpdate(true, key);
    } else if (currentKey !== key && pressedKeys.has(key)) {
      handleRemoveKey(key);
    }
    currentKey = "";
  };

  const handleKeyUpdate = (isKeyDown, key) => {
    if (isKeyDown) {
      handleSetPressedKeys(key);
      // handleSetPressedKeys(determineKeyToDisplay(key));
    } else {
      handleRemoveKey(key);
      // handleRemoveKey(determineKeyToDisplay(key));
    }
    // 캡스락 키를 눌렀을 때도 pressedKeys에 추가되어 있는 경우를 처리
    if (capsLockActive || capsLockPressed) {
      handleRemoveKey(determineKeyToDisplay(key));
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
    if (pressedKey !== isAlphabetic()) {
      const keyToDisplay = determineKeyToDisplay(pressedKey);
      handleKeyUpdate(true, keyToDisplay);
      if (capsLockActive || isShiftPressed) {
        handleKeyUpdate(true, keyToDisplay);
      }
    }
  };

  const handleKeyUp = (event) => {
    const releasedKey = event.key;

    // 캡스락 키 및 탭 키에 대한 처리
    handleCapsLock(releasedKey, false);
    handleToggleKey("Tab", releasedKey);

    // 나머지 키 처리
    if (releasedKey !== isAlphabetic) {
      handleKeyUpdate(false, determineKeyToDisplay(releasedKey));
    }

    setIsShiftPressed(event.shiftKey);
  };

  const handleSetPressedKeys = (key) => {
    setPressedKeys((prevKeys) =>
      new Set(prevKeys).add(determineKeyToDisplay(key))
    );
  };

  const handleRemoveKey = (key) => {
    setPressedKeys((prevKeys) => {
      const updatedKeys = new Set(prevKeys);
      updatedKeys.delete(determineKeyToDisplay(key));
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
        <div
          className={`keyboard-key ${
            (pressedKeys.has("~") || pressedKeys.has("`")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("`")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("!") || pressedKeys.has("1")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("1")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("@") || pressedKeys.has("2")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("2")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("#") || pressedKeys.has("3")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("3")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("$") || pressedKeys.has("4")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("4")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("%") || pressedKeys.has("5")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("5")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("^") || pressedKeys.has("6")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("6")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("&") || pressedKeys.has("7")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("7")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("*") || pressedKeys.has("8")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("8")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("(") || pressedKeys.has("9")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("9")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has(")") || pressedKeys.has("0")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("0")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("_") || pressedKeys.has("-")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("-")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("+") || pressedKeys.has("=")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("=")}
        </div>
        <div
          className={`tabnback-key ${
            pressedKeys.has("Backspace") && "pressed"
          }`}
        >
          Backspace
        </div>
      </div>
      <div className="keyboard-row">
        <div className={`tabnback-key ${pressedKeys.has("Tab") && "pressed"}`}>
          TAB
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("Q") || pressedKeys.has("q")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("q")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("W") || pressedKeys.has("w")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("w")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("E") || pressedKeys.has("e")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("e")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("R") || pressedKeys.has("r")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("r")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("T") || pressedKeys.has("t")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("t")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("Y") || pressedKeys.has("y")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("y")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("U") || pressedKeys.has("u")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("u")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("I") || pressedKeys.has("i")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("i")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("O") || pressedKeys.has("o")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("o")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("P") || pressedKeys.has("p")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("p")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("{") || pressedKeys.has("[")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("[")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("}") || pressedKeys.has("]")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("]")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("|") || pressedKeys.has("\\")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("\\")}
        </div>
      </div>
      <div className="keyboard-row">
        <div
          className={`capsenter-key ${
            capsLockPressed || capsLockActive ? "pressed" : ""
          }`}
        >
          Caps Lock
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("A") || pressedKeys.has("a")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("a")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("S") || pressedKeys.has("s")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("s")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("D") || pressedKeys.has("d")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("d")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("F") || pressedKeys.has("f")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("f")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("G") || pressedKeys.has("g")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("g")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("H") || pressedKeys.has("h")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("h")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("J") || pressedKeys.has("j")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("j")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("K") || pressedKeys.has("k")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("k")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("L") || pressedKeys.has("l")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("l")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has(":") || pressedKeys.has(";")) && "pressed"
          }`}
        >
          {determineKeyToDisplay(";")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has('"') || pressedKeys.has("'")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("'")}
        </div>
        <div
          className={`capsenter-key ${pressedKeys.has("Enter") && "pressed"}`}
        >
          Enter
        </div>
      </div>
      <div className="keyboard-row">
        <div className={`shift-key ${pressedKeys.has("Shift") && "pressed"}`}>
          Shift
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("Z") || pressedKeys.has("z")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("z")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("X") || pressedKeys.has("x")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("x")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("C") || pressedKeys.has("c")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("c")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("V") || pressedKeys.has("v")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("v")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("B") || pressedKeys.has("b")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("b")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("N") || pressedKeys.has("n")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("n")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("M") || pressedKeys.has("m")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("m")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("<") || pressedKeys.has(",")) && "pressed"
          }`}
        >
          {determineKeyToDisplay(",")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has(">") || pressedKeys.has(".")) && "pressed"
          }`}
        >
          {determineKeyToDisplay(".")}
        </div>
        <div
          className={`keyboard-key ${
            (pressedKeys.has("?") || pressedKeys.has("/")) && "pressed"
          }`}
        >
          {determineKeyToDisplay("/")}
        </div>
        <div className={`shift-key ${pressedKeys.has("Shift") && "pressed"}`}>
          Shift
        </div>
      </div>
      <div className="keyboard-row">
        <div
          className={`ctrlalt-key ${pressedKeys.has("Control") && "pressed"}`}
        >
          Ctrl
        </div>
        <div className={`ctrlalt-key ${pressedKeys.has("Alt") && "pressed"}`}>
          Alt
        </div>
        <div className={`space-key ${pressedKeys.has(" ") && "pressed"}`}>
          Space
        </div>
        <div className={`ctrlalt-key ${pressedKeys.has("Alt") && "pressed"}`}>
          Alt
        </div>
        <div
          className={`ctrlalt-key ${pressedKeys.has("Control") && "pressed"}`}
        >
          Ctrl
        </div>
      </div>
    </div>
  );
};
