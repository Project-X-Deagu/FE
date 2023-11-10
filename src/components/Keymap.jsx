import React, { useState, useEffect } from "react";
import "../css/KeyboardLayout.css";

export const Keymap = () => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  // 키 다운 이벤트 핸들러
  const handleKeyDown = (event) => {
    const pressedKey = event.key;
    setPressedKeys((prevKeys) => new Set(prevKeys).add(pressedKey));
  };

  // 키 업 이벤트 핸들러
  const handleKeyUp = (event) => {
    const releasedKey = event.key;
    setPressedKeys((prevKeys) => {
      const updatedKeys = new Set(prevKeys);
      updatedKeys.delete(releasedKey);
      return updatedKeys;
    });
  };

  // 컴포넌트가 마운트될 때 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
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
          `
        </div>
        <div className={`keyboard-key ${pressedKeys.has("1") && "pressed"}`}>
          1
        </div>
        <div className={`keyboard-key ${pressedKeys.has("2") && "pressed"}`}>
          2
        </div>
        <div className={`keyboard-key ${pressedKeys.has("3") && "pressed"}`}>
          3
        </div>
        <div className={`keyboard-key ${pressedKeys.has("4") && "pressed"}`}>
          4
        </div>
        <div className={`keyboard-key ${pressedKeys.has("5") && "pressed"}`}>
          5
        </div>
        <div className={`keyboard-key ${pressedKeys.has("6") && "pressed"}`}>
          6
        </div>
        <div className={`keyboard-key ${pressedKeys.has("7") && "pressed"}`}>
          7
        </div>
        <div className={`keyboard-key ${pressedKeys.has("8") && "pressed"}`}>
          8
        </div>
        <div className={`keyboard-key ${pressedKeys.has("9") && "pressed"}`}>
          9
        </div>
        <div className={`keyboard-key ${pressedKeys.has("0") && "pressed"}`}>
          0
        </div>
        <div className={`keyboard-key ${pressedKeys.has("-") && "pressed"}`}>
          -
        </div>
        <div className={`keyboard-key ${pressedKeys.has("=") && "pressed"}`}>
          =
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
        <div className={`keyboard-key ${pressedKeys.has("q") && "pressed"}`}>
          q
        </div>
        <div className={`keyboard-key ${pressedKeys.has("w") && "pressed"}`}>
          w
        </div>
        <div className={`keyboard-key ${pressedKeys.has("e") && "pressed"}`}>
          e
        </div>
        <div className={`keyboard-key ${pressedKeys.has("r") && "pressed"}`}>
          r
        </div>
        <div className={`keyboard-key ${pressedKeys.has("t") && "pressed"}`}>
          t
        </div>
        <div className={`keyboard-key ${pressedKeys.has("y") && "pressed"}`}>
          y
        </div>
        <div className={`keyboard-key ${pressedKeys.has("u") && "pressed"}`}>
          u
        </div>
        <div className={`keyboard-key ${pressedKeys.has("i") && "pressed"}`}>
          i
        </div>
        <div className={`keyboard-key ${pressedKeys.has("o") && "pressed"}`}>
          o
        </div>
        <div className={`keyboard-key ${pressedKeys.has("p") && "pressed"}`}>
          p
        </div>
        <div className={`keyboard-key ${pressedKeys.has("[") && "pressed"}`}>
          [
        </div>
        <div className={`keyboard-key ${pressedKeys.has("]") && "pressed"}`}>
          ]
        </div>
        <div className={`keyboard-key ${pressedKeys.has("\\") && "pressed"}`}>
          \
        </div>
      </div>
      <div className="keyboard-row">
        <div
          className={`keyboard-key ${
            pressedKeys.has("Caps Lock") && "pressed"
          }`}
        >
          Caps Lock
        </div>
        <div className={`keyboard-key ${pressedKeys.has("a") && "pressed"}`}>
          a
        </div>
        <div className={`keyboard-key ${pressedKeys.has("s") && "pressed"}`}>
          s
        </div>
        <div className={`keyboard-key ${pressedKeys.has("d") && "pressed"}`}>
          d
        </div>
        <div className={`keyboard-key ${pressedKeys.has("f") && "pressed"}`}>
          f
        </div>
        <div className={`keyboard-key ${pressedKeys.has("g") && "pressed"}`}>
          g
        </div>
        <div className={`keyboard-key ${pressedKeys.has("h") && "pressed"}`}>
          h
        </div>
        <div className={`keyboard-key ${pressedKeys.has("j") && "pressed"}`}>
          j
        </div>
        <div className={`keyboard-key ${pressedKeys.has("k") && "pressed"}`}>
          k
        </div>
        <div className={`keyboard-key ${pressedKeys.has("l") && "pressed"}`}>
          l
        </div>
        <div className={`keyboard-key ${pressedKeys.has(";") && "pressed"}`}>
          ;
        </div>
        <div className={`keyboard-key ${pressedKeys.has("'") && "pressed"}`}>
          '
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
        <div className={`keyboard-key ${pressedKeys.has("z") && "pressed"}`}>
          z
        </div>
        <div className={`keyboard-key ${pressedKeys.has("x") && "pressed"}`}>
          x
        </div>
        <div className={`keyboard-key ${pressedKeys.has("c") && "pressed"}`}>
          c
        </div>
        <div className={`keyboard-key ${pressedKeys.has("v") && "pressed"}`}>
          v
        </div>
        <div className={`keyboard-key ${pressedKeys.has("b") && "pressed"}`}>
          b
        </div>
        <div className={`keyboard-key ${pressedKeys.has("n") && "pressed"}`}>
          n
        </div>
        <div className={`keyboard-key ${pressedKeys.has("m") && "pressed"}`}>
          m
        </div>
        <div className={`keyboard-key ${pressedKeys.has(",") && "pressed"}`}>
          ,
        </div>
        <div className={`keyboard-key ${pressedKeys.has(".") && "pressed"}`}>
          .
        </div>
        <div className={`keyboard-key ${pressedKeys.has("/") && "pressed"}`}>
          /
        </div>
        <div
          className={`keyboard-key ${pressedKeys.has("Shift") && "pressed"}`}
        >
          Shift
        </div>
      </div>
      <div className="keyboard-row">
        <div className={`keyboard-key ${pressedKeys.has("Ctrl") && "pressed"}`}>
          Ctrl
        </div>
        <div className={`keyboard-key ${pressedKeys.has("Alt") && "pressed"}`}>
          Alt
        </div>
        <div
          className={`keyboard-key ${pressedKeys.has("Spacebar") && "pressed"}`}
        >
          Spacebar
        </div>
        <div className={`keyboard-key ${pressedKeys.has("Alt") && "pressed"}`}>
          Alt
        </div>
        <div className={`keyboard-key ${pressedKeys.has("Ctrl") && "pressed"}`}>
          Ctrl
        </div>
      </div>
    </div>
  );
};
