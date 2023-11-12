import React, { useState, useEffect } from "react";

const TypingEffect = ({ text, onComplete }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        if (onComplete) {
          onComplete();
        }
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentIndex, text, onComplete]);

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{ __html: typedText.replace(/\n/g, "<br>") }}
      />
    </div>
  );
};

const TypingEffectExample = () => {
  const titleSentences = ["타자연습 Project-X '", "도도독", "'"];
  const mainSentences = [
    "도도..도도독..typing",
    " ",
    "> 네비게이션 바에 손을 올려보세요.",
  ];

  const [isTitleTypingFinished, setTitleTypingFinished] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40vh",
        transform: "translateY(-50%)",
      }}
    >
      <h1>
        {isTitleTypingFinished ? (
          "타자연습 Project-X '도도독'"
        ) : (
          <TypingEffect
            text={titleSentences.join("")}
            onComplete={() => setTitleTypingFinished(true)}
          />
        )}
      </h1>
      {isTitleTypingFinished && (
        <TypingEffect text={mainSentences.join("<br />")} />
      )}
    </div>
  );
};

export default TypingEffectExample;
