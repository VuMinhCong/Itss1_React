import React, { useEffect, useState } from 'react';
import './Footer.scss';
function Footer(props) {
  const [text, setText] = useState('default');
  const [x, setX] = useState(0);

  useEffect(() => {});

  return (
    <div className={props.className}>
      <div className="footer--div1">
        <div className="footer--topic">
          <b className="test">ITSS 日本語 金２</b>
        </div>
        <div className="footer--topic">
          <b className="footer--font">グループ6</b>
        </div>
      </div>
      <div className="footer--div2">
        <div className="footer--topic">
          <b className="test">プロジェクトを作成する動機</b>
        </div>
        <div className="footer--topic">
          <b className="footer--font">面白い知識を学ぶこと</b>
        </div>
      </div>
    </div>
  );
}
export default Footer;
