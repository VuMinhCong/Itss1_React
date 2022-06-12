import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import editIcon from './edit-icon.svg';
import trashIcon from './trash-icon.svg';

const UrlItem = ({ no, url }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [newUrl, setNewUrl] = useState(url.url);
  const [newCode, setNewCode] = useState(url.code);

  const { deleteUrl, updateUrl } = useStore();

  const onUpdateUrl = (cancel = true) => {
    setIsEdit(false);
    if (cancel) {
      setNewUrl(url.url);
      setNewCode(url.code);
      return;
    }

    updateUrl(url.code, { url: newUrl, code: newCode });
  };

  const onKeydown = (e) => {
    if (e.key === 'Enter') {
      onUpdateUrl(false);
    }
  };

  const inputForm = useRef(null);

  useEffect(() => {
    if (isEdit && inputForm) {
      inputForm.current.focus();
    }
  }, [isEdit]);

  return (
    <div
      className={
        'url-item ' + (isEdit ? 'edit ' : '') + (isDelete ? 'delete' : '')
      }
    >
      <div>{no}</div>
      <div className="url">
        <a href={url.url} target="_blank" className="text-blue-800">
          {url.url}
        </a>
        <input
          placeholder="URLを入力"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={onKeydown}
        />
      </div>
      <div className="code">
        <span>{url.code}</span>
        <input
          placeholder="コードを入力"
          value={newCode}
          ref={inputForm}
          onChange={(e) => setNewCode(e.target.value)}
          onKeyDown={onKeydown}
        />
      </div>
      <div>
        <a
          href={'http://nourl.ga/' + url.code}
          target="_blank"
          className="text-blue-800"
        >
          {'http://nourl.ga/' + url.code}
        </a>
      </div>
      <div className="custom-url flex">
        <div
          className="delete-url bg-red-500 hover:bg-red-600"
          onClick={() => setIsDelete(true)}
        >
          <img src={trashIcon} />
        </div>
        <div
          className="edit-url bg-yellow-500 hover:bg-yellow-600"
          onClick={() => setIsEdit(true)}
        >
          <img src={editIcon} />
        </div>
        <div className="confirm-edit">
          <div
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => onUpdateUrl(true)}
          >
            キャンセル
          </div>
          <div
            className="bg-red-500 hover:bg-red-600"
            onClick={() => onUpdateUrl(false)}
          >
            オーケー
          </div>
        </div>
        <div className="confirm-delete">
          <div
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => setIsDelete(false)}
          >
            キャンセル
          </div>
          <div
            className="bg-red-500 hover:bg-red-600"
            onClick={() => deleteUrl(url.code)}
          >
            オーケー
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlItem;
