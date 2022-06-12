import React, { useRef } from 'react';

function Filter(props) {
  const setter = props.setter;

  const no = useRef();
  const url = useRef();
  const code = useRef();
  const surl = useRef();

  function processKeyDown(e, choice) {
    switch (choice) {
      case 0:
        no.current.value = e.target.value;
        break;
      case 1:
        url.current.value = e.target.value;
        break;
      case 2:
        code.current.value = e.target.value;
        break;
      case 3:
        surl.current.value = e.target.value;
        break;
    }

    setter({
      no: no.current.value,
      url: url.current.value,
      code: code.current.value,
      surl: surl.current.value,
    });
  }

  return (
    <div className="filter-item url-item bg-red-200">
      <input
        className="bg-blue-100"
        placeholder="番号"
        onChange={(e) => processKeyDown(e, 0)}
        ref={no}
      />
      <input
        className="bg-blue-100"
        placeholder="URL"
        onChange={(e) => processKeyDown(e, 1)}
        ref={url}
      />
      <input
        className="bg-blue-100"
        placeholder="コード"
        onChange={(e) => processKeyDown(e, 2)}
        ref={code}
      />
      <input
        className="bg-blue-100"
        disabled
        hidden
        placeholder="省略URL"
        onChange={(e) => processKeyDown(e, 3)}
        ref={surl}
      />
    </div>
  );
}

export default Filter;
